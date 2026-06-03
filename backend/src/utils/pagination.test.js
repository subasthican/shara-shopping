import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createPaginatedResponse, getPagination } from './pagination.js';

describe('pagination utilities', () => {
  it('does not request pagination without page or limit params', () => {
    assert.deepEqual(getPagination({}), { requested: false });
  });

  it('normalizes page, limit, and skip values', () => {
    assert.deepEqual(getPagination({ page: '3', limit: '15' }), {
      requested: true,
      page: 3,
      limit: 15,
      skip: 30,
    });
  });

  it('clamps invalid and oversized pagination input', () => {
    assert.deepEqual(getPagination({ page: '-2', limit: '500' }), {
      requested: true,
      page: 1,
      limit: 100,
      skip: 0,
    });
  });

  it('creates pagination metadata', () => {
    const response = createPaginatedResponse([{ id: 1 }], { page: 2, limit: 10 }, 25);

    assert.deepEqual(response.pagination, {
      page: 2,
      limit: 10,
      total: 25,
      totalPages: 3,
      hasNextPage: true,
      hasPreviousPage: true,
    });
  });
});
