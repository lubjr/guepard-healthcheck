import type { RequestHandler, ErrorRequestHandler } from 'express';

export const handleNotFound: RequestHandler = (req, res) => {
  res.status(404).json({
    error: `Route '${req.method}' not found`,
  });
};

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Unexpected error:', err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: 'Internal server error',
  });
};
