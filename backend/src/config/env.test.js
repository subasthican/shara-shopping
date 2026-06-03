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

  it('rejects invalid MongoDB connection strings', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'development',
        MONGODB_URI: 'https://db.example.com',
        JWT_SECRET: 'local-secret',
      }),
      /MONGODB_URI must start with mongodb/,
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

  it('requires valid production frontend origins', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb://db',
        JWT_SECRET: 'a-secure-production-secret-with-32-characters',
        CLIENT_URL: 'ftp://example.com',
      }),
      /CLIENT_URL must contain valid http or https origins/,
    );
  });

  it('allows multiple production frontend origins', () => {
    assert.doesNotThrow(() => validateEnvironment({
      NODE_ENV: 'production',
      MONGODB_URI: 'mongodb+srv://cluster.example.com/shara-shopping',
      JWT_SECRET: 'a-secure-production-secret-with-32-characters',
      CLIENT_URL: 'https://sharashopping.lk, https://www.sharashopping.lk',
    }));
  });

  it('requires a strong JWT secret in production', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb://db',
        JWT_SECRET: 'too-short',
        CLIENT_URL: 'https://sharashopping.lk',
      }),
      /JWT_SECRET must be at least 32 characters/,
    );
  });
});
