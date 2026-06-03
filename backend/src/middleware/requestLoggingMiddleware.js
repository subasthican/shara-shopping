import { randomUUID } from 'crypto';

export function requestContext(req, res, next) {
  const requestId = req.get('x-request-id') || randomUUID();

  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
}

export function productionRequestLogger(req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    next();
    return;
  }

  const startedAt = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    console.info(JSON.stringify({
      type: 'http_request',
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Math.round(durationMs),
    }));
  });

  next();
}
