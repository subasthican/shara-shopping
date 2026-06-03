const DEFAULT_SIGNALS = ['SIGTERM', 'SIGINT'];

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

export function registerGracefulShutdown({
  server,
  disconnectDatabase,
  logger = console,
  exit = process.exit,
  signals = DEFAULT_SIGNALS,
}) {
  let isShuttingDown = false;

  async function shutdown(signal) {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;
    logger.info(`Received ${signal}. Closing Shara Shopping API.`);

    try {
      await closeServer(server);
      await disconnectDatabase();
      logger.info('Shara Shopping API shutdown complete.');
      exit(0);
    } catch (error) {
      logger.error(`Shara Shopping API shutdown failed: ${error.message}`);
      exit(1);
    }
  }

  signals.forEach((signal) => {
    process.once(signal, () => {
      void shutdown(signal);
    });
  });

  return shutdown;
}
