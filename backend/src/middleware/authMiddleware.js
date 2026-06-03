import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = getBearerToken(authHeader);

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.admin = await Admin.findById(decoded.id).select('-password');

  if (!req.admin) {
    res.status(401);
    throw new Error('Not authorized, admin not found');
  }

  next();
});

function getBearerToken(authHeader) {
  const [scheme, token] = String(authHeader).trim().split(/\s+/);

  if (scheme?.toLowerCase() !== 'bearer') {
    return null;
  }

  return token || null;
}
