import rateLimit from 'express-rate-limit';
import type { RequestHandler } from 'express';

/**
 * Middleware to limit the number of requests per IP.
 * Allows up to 100 requests per 15-minute window.
 *
 * @param {number} windowMs - Time window in milliseconds.
 * @param {number} max - Maximum number of requests allowed per IP.
 * @returns {function} Rate limiting middleware.
 */

export const rateLimiter: RequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please try again later.',
  },
});
