export function notFound(req, res, next) {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const duplicateKeyError = getDuplicateKeyError(error);
  const statusCode = duplicateKeyError
    ? 409
    : res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: duplicateKeyError || error.message || 'Server error',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
}

function getDuplicateKeyError(error) {
  if (error?.code !== 11000) {
    return '';
  }

  const fields = Object.keys(error.keyPattern || error.keyValue || {});

  if (!fields.length) {
    return 'A record with the same unique value already exists.';
  }

  return `A record with this ${fields.join(', ')} already exists.`;
}
