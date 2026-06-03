import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { sanitizeRequest } from './sanitizeMiddleware.js';

describe('sanitizeRequest', () => {
  it('removes unsafe body and query keys recursively', () => {
    const req = {
      body: {
        name: 'Dress',
        $where: 'malicious',
        nested: {
          'profile.email': 'bad',
          safe: 'ok',
        },
        items: [
          { sku: 'SH-1', $gt: 1 },
        ],
      },
      query: {
        search: 'dress',
        '$ne': 'bad',
      },
    };
    let nextCalled = false;

    sanitizeRequest(req, {}, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.deepEqual(req.body, {
      name: 'Dress',
      nested: { safe: 'ok' },
      items: [{ sku: 'SH-1' }],
    });
    assert.deepEqual(req.query, { search: 'dress' });
  });
});
