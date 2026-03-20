const express = require('express');

const { ENV } = require('../env');
const {
  clearSessionCookie,
  getAuthenticatedSession,
  loginWithEmail,
  loginWithGoogleIdToken,
  logout,
  registerWithEmail,
  requireAuthenticatedSession,
  setSessionCookie,
  updateUserProfile,
} = require('../lib/auth');
const { asyncRoute, getRequestMeta } = require('../lib/http');
const { getUserStats } = require('../lib/progress');

const authRouter = express.Router();

function sendSessionResponse(res, result) {
  setSessionCookie(res, result.token);
  res.json({
    user: result.user,
    token: result.token,
  });
}

authRouter.get(
  '/providers',
  asyncRoute(async (_req, res) => {
    res.json({
      email: true,
      googleConfigured: Boolean(ENV.googleClientId),
    });
  }),
);

authRouter.post(
  '/register',
  asyncRoute(async (req, res) => {
    const result = await registerWithEmail(req.body || {}, getRequestMeta(req));
    sendSessionResponse(res, result);
  }),
);

authRouter.post(
  '/login',
  asyncRoute(async (req, res) => {
    const result = await loginWithEmail(req.body || {}, getRequestMeta(req));
    sendSessionResponse(res, result);
  }),
);

authRouter.post(
  '/google',
  asyncRoute(async (req, res) => {
    const result = await loginWithGoogleIdToken(req.body || {}, getRequestMeta(req));
    sendSessionResponse(res, result);
  }),
);

authRouter.get(
  '/me',
  asyncRoute(async (req, res) => {
    const auth = await getAuthenticatedSession(req);
    if (!auth) {
      clearSessionCookie(res);
      return res.status(401).json({ error: 'Not authenticated.', user: null });
    }

    const stats = await getUserStats(auth.user.id);
    return res.json({
      user: auth.user,
      stats,
    });
  }),
);

authRouter.patch(
  '/profile',
  asyncRoute(async (req, res) => {
    const auth = await requireAuthenticatedSession(req);
    const user = await updateUserProfile(auth.user.id, req.body || {});
    res.json({ user });
  }),
);

authRouter.post(
  '/logout',
  asyncRoute(async (req, res) => {
    await logout(req);
    clearSessionCookie(res);
    res.json({ success: true });
  }),
);

module.exports = {
  authRouter,
};
