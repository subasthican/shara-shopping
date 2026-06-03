import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createHealthStatus } from './healthStatus.js';

describe('createHealthStatus', () => {
  it('reports ok when the database is connected', () => {
    const status = createHealthStatus({
      connectionState: 1,
      env: { NODE_ENV: 'production' },
      now: new Date('2026-06-03T09:00:00.000Z'),
      uptime: 42.4,
    });

    assert.deepEqual(status, {
      status: 'ok',
      service: 'Shara Shopping API',
      environment: 'production',
      uptimeSeconds: 42,
      timestamp: '2026-06-03T09:00:00.000Z',
      database: 'connected',
    });
  });

  it('reports degraded when the database is not connected', () => {
    const status = createHealthStatus({ connectionState: 0, env: {}, now: new Date('2026-06-03T09:00:00.000Z'), uptime: 1 });

    assert.equal(status.status, 'degraded');
    assert.equal(status.database, 'disconnected');
  });
});
