import rateLimit from 'express-rate-limit';

const commonOptions = {
  standardHeaders: true,
  legacyHeaders: false,
};

export const authLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: 'Too many login attempts. Please try again later.' },
});

export const publicWriteLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: { message: 'Too many requests. Please try again later.' },
});

export const orderTrackingLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 60,
  message: { message: 'Too many tracking requests. Please try again later.' },
});
