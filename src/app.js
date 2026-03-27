const express = require('express');
const path = require('path');

const { ENV } = require('./env');
const { sendError } = require('./lib/http');
const { authRouter } = require('./routes/auth-routes');
const { tutorRouter } = require('./routes/tutor-routes');

function createApp() {
  const app = express();

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const originAllowed =
      !origin ||
      ENV.allowedOrigins.length === 0 ||
      ENV.allowedOrigins.includes(origin);

    if (origin && originAllowed) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Vary', 'Origin');
    }

    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(originAllowed ? 204 : 403);
    }

    if (!originAllowed) {
      return res.status(403).json({ error: 'Origin not allowed by CORS policy.' });
    }

    return next();
  });

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));
  app.use('/playground', express.static(path.join(process.cwd(), 'public')));

  app.get('/', (req, res) => {
    const accepts = String(req.headers.accept || '');
    if (accepts.includes('text/html')) {
      return res.redirect('/playground/');
    }

    return res.json({
      name: 'ProfEng API',
      status: 'online',
      auth: {
        email: true,
        google: Boolean(ENV.googleClientId),
      },
      endpoints: [
        'GET /health',
        'GET /meta/options',
        'POST /chat',
        'POST /feedback',
        'POST /voice/transcribe',
        'POST /voice/respond',
        'POST /voice/speak',
        'POST /progress/activity',
        'GET /progress/state',
        'PUT /progress/state',
        'POST /exercises/generate',
        'POST /exercises/check',
        'POST /levels/assess',
        'POST /auth/register',
        'POST /auth/login',
        'POST /auth/google',
        'GET /auth/me',
        'PATCH /auth/profile',
        'POST /auth/logout',
      ],
    });
  });

  app.use('/auth', authRouter);
  app.use('/', tutorRouter);

  app.use((req, res) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
  });

  app.use((error, _req, res, _next) => {
    sendError(res, error);
  });

  return app;
}

module.exports = {
  createApp,
};
