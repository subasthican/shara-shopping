export function sanitizeRequest(req, _res, next) {
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  next();
}

function sanitizeObject(value) {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    value.forEach(sanitizeObject);
    return value;
  }

  Object.keys(value).forEach((key) => {
    if (isUnsafeKey(key)) {
      delete value[key];
      return;
    }

    sanitizeObject(value[key]);
  });

  return value;
}

function isUnsafeKey(key) {
  return key.startsWith('$') || key.includes('.');
}
