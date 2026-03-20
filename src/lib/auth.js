const {
  createHash,
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} = require('crypto');

const { OAuth2Client } = require('google-auth-library');

const { normalizeLevel } = require('../constants/levels');
const { ENV } = require('../env');
const { readStore, updateStore } = require('./data-store');
const { createHttpError } = require('./http');

const googleClient = new OAuth2Client(ENV.googleClientId || undefined);

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function validateEmail(email) {
  const normalized = normalizeEmail(email);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
  if (!isValid) {
    throw createHttpError(400, 'Provide a valid email address.');
  }
  return normalized;
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8) {
    throw createHttpError(400, 'Password must have at least 8 characters.');
  }

  return password;
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    return null;
  }

  const trimmed = name.trim();
  return trimmed ? trimmed.slice(0, 80) : null;
}

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, expectedHash) {
  if (!salt || !expectedHash) {
    return false;
  }

  const calculated = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, 'hex');

  if (calculated.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(calculated, expected);
}

function buildSessionToken() {
  return randomBytes(48).toString('hex');
}

function hashSessionToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

function sessionMaxAgeMs() {
  return ENV.sessionTtlDays * 24 * 60 * 60 * 1000;
}

function cleanupExpiredSessions(store) {
  const now = Date.now();
  store.sessions = store.sessions.filter(
    (session) => new Date(session.expiresAt).getTime() > now,
  );
}

function createSession(userId, meta = {}) {
  const now = new Date();
  const token = buildSessionToken();
  const session = {
    id: randomUUID(),
    userId,
    tokenHash: hashSessionToken(token),
    createdAt: now.toISOString(),
    lastSeenAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + sessionMaxAgeMs()).toISOString(),
    ip: meta.ip || null,
    userAgent: meta.userAgent || null,
  };

  return { token, session };
}

function toPublicUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    emailVerified: Boolean(user.emailVerified),
    name: user.name || null,
    avatarUrl: user.avatarUrl || null,
    level: user.level,
    providers: Array.isArray(user.providers) ? user.providers : [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt || null,
  };
}

function getSessionCookieOptions() {
  const secure =
    ENV.nodeEnv === 'production' ||
    (typeof ENV.appUrl === 'string' && ENV.appUrl.startsWith('https://'));

  return {
    httpOnly: true,
    sameSite: secure ? 'none' : 'lax',
    secure,
    path: '/',
    maxAge: sessionMaxAgeMs(),
  };
}

function setSessionCookie(res, token) {
  res.cookie(ENV.sessionCookieName, token, getSessionCookieOptions());
}

function clearSessionCookie(res) {
  res.clearCookie(ENV.sessionCookieName, {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
}

function getCookieValue(req, cookieName) {
  const header = req.headers.cookie;
  if (!header) {
    return null;
  }

  const pairs = header.split(';');
  for (const pair of pairs) {
    const [name, ...rest] = pair.trim().split('=');
    if (name === cookieName) {
      return decodeURIComponent(rest.join('='));
    }
  }

  return null;
}

function getRequestToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }

  return getCookieValue(req, ENV.sessionCookieName);
}

async function registerWithEmail(input, meta) {
  const email = validateEmail(input.email);
  const password = validatePassword(input.password);
  const name = normalizeName(input.name);
  const level = normalizeLevel(input.level, 'A2');

  return updateStore((store) => {
    cleanupExpiredSessions(store);

    if (store.users.some((user) => user.emailLower === email)) {
      throw createHttpError(409, 'An account with this email already exists.');
    }

    const now = new Date().toISOString();
    const { salt, hash } = hashPassword(password);
    const user = {
      id: randomUUID(),
      email,
      emailLower: email,
      emailVerified: true,
      passwordHash: hash,
      passwordSalt: salt,
      googleId: null,
      name,
      avatarUrl: null,
      level,
      providers: ['email'],
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    };

    store.users.push(user);

    const { token, session } = createSession(user.id, meta);
    store.sessions.push(session);

    return {
      user: toPublicUser(user),
      token,
    };
  });
}

async function loginWithEmail(input, meta) {
  const email = validateEmail(input.email);
  const password = validatePassword(input.password);

  return updateStore((store) => {
    cleanupExpiredSessions(store);

    const user = store.users.find((candidate) => candidate.emailLower === email);
    if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
      throw createHttpError(401, 'Invalid email or password.');
    }

    user.lastLoginAt = new Date().toISOString();
    user.updatedAt = user.lastLoginAt;

    const { token, session } = createSession(user.id, meta);
    store.sessions.push(session);

    return {
      user: toPublicUser(user),
      token,
    };
  });
}

async function loginWithGoogleIdToken(input, meta) {
  if (!ENV.googleClientId) {
    throw createHttpError(
      503,
      'Google login is not configured yet. Set GOOGLE_CLIENT_ID in the environment.',
    );
  }

  if (!input || typeof input.idToken !== 'string' || !input.idToken.trim()) {
    throw createHttpError(400, 'Field "idToken" is required for Google login.');
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: input.idToken,
      audience: ENV.googleClientId,
    });
    payload = ticket.getPayload();
  } catch (error) {
    throw createHttpError(401, 'Could not validate the Google login token.', error.message);
  }

  if (!payload || !payload.sub || !payload.email) {
    throw createHttpError(401, 'Google token did not return the required profile data.');
  }

  const email = validateEmail(payload.email);
  const level = normalizeLevel(input.level, 'A2');
  const displayName = normalizeName(input.name) || normalizeName(payload.name) || null;
  const avatarUrl =
    typeof payload.picture === 'string' && payload.picture.trim()
      ? payload.picture.trim()
      : null;

  return updateStore((store) => {
    cleanupExpiredSessions(store);

    let user =
      store.users.find((candidate) => candidate.googleId === payload.sub) ||
      store.users.find((candidate) => candidate.emailLower === email);

    const now = new Date().toISOString();

    if (!user) {
      user = {
        id: randomUUID(),
        email,
        emailLower: email,
        emailVerified: true,
        passwordHash: null,
        passwordSalt: null,
        googleId: payload.sub,
        name: displayName,
        avatarUrl,
        level,
        providers: ['google'],
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
      };
      store.users.push(user);
    } else {
      user.googleId = payload.sub;
      user.email = email;
      user.emailLower = email;
      user.emailVerified = true;
      user.name = displayName || user.name || null;
      user.avatarUrl = avatarUrl || user.avatarUrl || null;
      user.level = user.level || level;
      user.providers = Array.from(new Set([...(user.providers || []), 'google']));
      user.updatedAt = now;
      user.lastLoginAt = now;
    }

    const { token, session } = createSession(user.id, meta);
    store.sessions.push(session);

    return {
      user: toPublicUser(user),
      token,
    };
  });
}

async function getAuthenticatedSession(req) {
  const token = getRequestToken(req);
  if (!token) {
    return null;
  }

  const store = await readStore();
  const tokenHash = hashSessionToken(token);
  const now = Date.now();

  const session = store.sessions.find(
    (candidate) =>
      candidate.tokenHash === tokenHash &&
      new Date(candidate.expiresAt).getTime() > now,
  );

  if (!session) {
    return null;
  }

  const user = store.users.find((candidate) => candidate.id === session.userId);
  if (!user) {
    return null;
  }

  return {
    token,
    session,
    user: toPublicUser(user),
  };
}

async function requireAuthenticatedSession(req) {
  const auth = await getAuthenticatedSession(req);
  if (!auth) {
    throw createHttpError(401, 'Authentication required.');
  }
  return auth;
}

async function logout(req) {
  const token = getRequestToken(req);
  if (!token) {
    return false;
  }

  const tokenHash = hashSessionToken(token);

  return updateStore((store) => {
    const before = store.sessions.length;
    store.sessions = store.sessions.filter((session) => session.tokenHash !== tokenHash);
    return store.sessions.length !== before;
  });
}

async function updateUserProfile(userId, updates) {
  return updateStore((store) => {
    const user = store.users.find((candidate) => candidate.id === userId);
    if (!user) {
      throw createHttpError(404, 'User not found.');
    }

    if (updates.name !== undefined) {
      user.name = normalizeName(updates.name);
    }

    if (updates.level !== undefined) {
      user.level = normalizeLevel(updates.level, user.level);
    }

    user.updatedAt = new Date().toISOString();
    return toPublicUser(user);
  });
}

module.exports = {
  clearSessionCookie,
  getAuthenticatedSession,
  loginWithEmail,
  loginWithGoogleIdToken,
  logout,
  registerWithEmail,
  requireAuthenticatedSession,
  setSessionCookie,
  updateUserProfile,
};
