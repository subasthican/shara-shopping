import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { registerGracefulShutdown } from './gracefulShutdown.js';

function createLogger() {
  return {
    errors: [],
    infos: [],
    error(message) {
      this.errors.push(message);
    },
    info(message) {
      this.infos.push(message);
    },
  };
}

describe('registerGracefulShutdown', () => {
  it('closes the server, disconnects the database, and exits successfully', async () => {
    const events = [];
    const logger = createLogger();
    const shutdown = registerGracefulShutdown({
      server: {
        close(callback) {
          events.push('close');
          callback();
        },
      },
      async disconnectDatabase() {
        events.push('disconnect');
      },
      exit(code) {
        events.push(`exit:${code}`);
      },
      logger,
      signals: [],
    });

    await shutdown('SIGTERM');

    assert.deepEqual(events, ['close', 'disconnect', 'exit:0']);
    assert.match(logger.infos.at(0), /Received SIGTERM/);
    assert.match(logger.infos.at(1), /shutdown complete/);
  });

  it('exits with failure when server close fails', async () => {
    const events = [];
    const logger = createLogger();
    const shutdown = registerGracefulShutdown({
      server: {
        close(callback) {
          events.push('close');
          callback(new Error('close failed'));
        },
      },
      async disconnectDatabase() {
        events.push('disconnect');
      },
      exit(code) {
        events.push(`exit:${code}`);
      },
      logger,
      signals: [],
    });

    await shutdown('SIGINT');

    assert.deepEqual(events, ['close', 'exit:1']);
    assert.match(logger.errors.at(0), /close failed/);
  });

  it('ignores duplicate shutdown calls', async () => {
    const events = [];
    const shutdown = registerGracefulShutdown({
      server: {
        close(callback) {
          events.push('close');
          callback();
        },
      },
      async disconnectDatabase() {
        events.push('disconnect');
      },
      exit(code) {
        events.push(`exit:${code}`);
      },
      logger: createLogger(),
      signals: [],
    });

    await Promise.all([shutdown('SIGTERM'), shutdown('SIGINT')]);

    assert.deepEqual(events, ['close', 'disconnect', 'exit:0']);
  });
});
