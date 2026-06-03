import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { requestContext } from './requestLoggingMiddleware.js';

describe('requestContext', () => {
  it('uses an incoming request id when available', () => {
    const req = {
      get: () => 'request-123',
    };
    const headers = {};
    const res = {
      setHeader(key, value) {
        headers[key] = value;
      },
    };

    requestContext(req, res, () => {});

    assert.equal(req.requestId, 'request-123');
    assert.equal(headers['X-Request-Id'], 'request-123');
  });

  it('creates a request id when one is missing', () => {
    const req = {
      get: () => '',
    };
    const res = {
      setHeader(_key, value) {
        this.value = value;
      },
    };

    requestContext(req, res, () => {});

    assert.match(req.requestId, /^[0-9a-f-]{36}$/);
    assert.equal(res.value, req.requestId);
  });
});
