function createHttpError(statusCode, message, details) {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (details !== undefined) {
    error.details = details;
  }
  return error;
}

function sendError(res, error) {
  const statusCode = error && Number.isInteger(error.statusCode) ? error.statusCode : 500;
  const payload = {
    error: error && error.message ? error.message : 'Internal server error.',
  };

  if (error && error.details !== undefined) {
    payload.details = error.details;
  }

  if (statusCode >= 500) {
    console.error('[server]', error);
  }

  res.status(statusCode).json(payload);
}

function asyncRoute(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

function getRequestMeta(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip =
    typeof forwardedFor === 'string'
      ? forwardedFor.split(',')[0].trim()
      : req.socket.remoteAddress || null;

  return {
    ip,
    userAgent: req.headers['user-agent'] || null,
  };
}

module.exports = {
  asyncRoute,
  createHttpError,
  getRequestMeta,
  sendError,
};
