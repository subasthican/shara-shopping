import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { hasValidAdminSession, isAdminTokenExpired } from '../utils/adminSession.js';

describe('authService session helpers', () => {
  beforeEach(() => {
    global.atob = (value) => Buffer.from(value, 'base64').toString('utf8');
    global.localStorage = createLocalStorage();
  });

  it('detects expired admin tokens', () => {
    const token = createToken({ exp: Math.floor(Date.now() / 1000) - 60 });

    assert.equal(isAdminTokenExpired(token), true);
  });

  it('keeps valid admin sessions', () => {
    localStorage.setItem('shara_admin_user', JSON.stringify({ email: 'admin@sharashopping.lk' }));
    localStorage.setItem('shara_admin_token', createToken({ exp: Math.floor(Date.now() / 1000) + 3600 }));

    assert.equal(hasValidAdminSession(), true);
  });

  it('clears expired admin sessions', () => {
    localStorage.setItem('shara_admin_user', JSON.stringify({ email: 'admin@sharashopping.lk' }));
    localStorage.setItem('shara_admin_token', createToken({ exp: Math.floor(Date.now() / 1000) - 60 }));

    assert.equal(hasValidAdminSession(), false);
    assert.equal(localStorage.getItem('shara_admin_user'), null);
    assert.equal(localStorage.getItem('shara_admin_token'), null);
  });
});

function createToken(payload) {
  return [
    encodeBase64Url({ alg: 'none', typ: 'JWT' }),
    encodeBase64Url(payload),
    'signature',
  ].join('.');
}

function encodeBase64Url(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function createLocalStorage() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}
