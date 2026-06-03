import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { errorHandler } from './errorMiddleware.js';

const originalNodeEnv = process.env.NODE_ENV;
const originalConsoleError = console.error;

afterEach(() => {
  process.env.NODE_ENV = originalNodeEnv;
  console.error = originalConsoleError;
});

function createResponse(statusCode = 200) {
  return {
    body: null,
    statusCode,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

describe('errorHandler', () => {
  it('includes the request id in error responses', () => {
    process.env.NODE_ENV = 'development';
    const response = createResponse(400);

    errorHandler(
      new Error('Invalid request'),
      { requestId: 'req-123' },
      response,
    );

    assert.equal(response.statusCode, 400);
    assert.equal(response.body.message, 'Invalid request');
    assert.equal(response.body.requestId, 'req-123');
    assert.match(response.body.stack, /Invalid request/);
  });

  it('hides stack traces and logs production errors with the request id', () => {
    process.env.NODE_ENV = 'production';
    const logs = [];
    console.error = (message) => logs.push(JSON.parse(message));
    const response = createResponse();

    errorHandler(
      new Error('Server exploded'),
      { requestId: 'req-prod' },
      response,
    );

    assert.equal(response.statusCode, 500);
    assert.deepEqual(response.body, {
      message: 'Server exploded',
      requestId: 'req-prod',
      stack: undefined,
    });
    assert.equal(logs.length, 1);
    assert.equal(logs[0].event, 'api_error');
    assert.equal(logs[0].requestId, 'req-prod');
    assert.equal(logs[0].statusCode, 500);
    assert.match(logs[0].stack, /Server exploded/);
  });

  it('returns duplicate key errors as conflicts', () => {
    process.env.NODE_ENV = 'development';
    const response = createResponse();

    errorHandler(
      {
        code: 11000,
        keyPattern: { email: 1 },
      },
      { requestId: 'req-duplicate' },
      response,
    );

    assert.equal(response.statusCode, 409);
    assert.equal(response.body.message, 'A record with this email already exists.');
    assert.equal(response.body.requestId, 'req-duplicate');
  });
});
