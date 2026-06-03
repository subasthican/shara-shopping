import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveApiBaseUrl } from './apiConfig.js';

describe('resolveApiBaseUrl', () => {
  it('uses the configured API URL without trailing slashes', () => {
    assert.equal(
      resolveApiBaseUrl({ MODE: 'production', VITE_API_URL: 'https://api.sharashopping.lk/api///' }),
      'https://api.sharashopping.lk/api',
    );
  });

  it('falls back to the local API in development', () => {
    assert.equal(resolveApiBaseUrl({ MODE: 'development' }), 'http://127.0.0.1:5001/api');
  });

  it('falls back to the same-origin API in production when no URL is configured', () => {
    assert.equal(resolveApiBaseUrl({ MODE: 'production' }), '/api');
  });
});
