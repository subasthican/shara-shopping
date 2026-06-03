import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateEnvironment } from './env.js';

describe('validateEnvironment', () => {
  it('allows a valid development environment', () => {
    assert.doesNotThrow(() => validateEnvironment({
      NODE_ENV: 'development',
      MONGODB_URI: 'mongodb://127.0.0.1:27017/shara-shopping',
      JWT_SECRET: 'local-secret',
    }));
  });

  it('requires core backend secrets', () => {
    assert.throws(
      () => validateEnvironment({ NODE_ENV: 'development' }),
      /MONGODB_URI is required.*JWT_SECRET is required/,
    );
  });

  it('requires production origin and secure JWT secret', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb://db',
        JWT_SECRET: 'replace-with-a-long-random-secret',
      }),
      /CLIENT_URL is required in production.*JWT_SECRET must be replaced/,
    );
  });
});
