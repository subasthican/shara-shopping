const DATABASE_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export function createHealthStatus({ connectionState = 0, env = process.env, now = new Date(), uptime = process.uptime() } = {}) {
  const database = DATABASE_STATES[connectionState] || 'unknown';

  return {
    status: database === 'connected' ? 'ok' : 'degraded',
    service: 'Shara Shopping API',
    environment: env.NODE_ENV || 'development',
    uptimeSeconds: Math.round(uptime),
    timestamp: now.toISOString(),
    database,
  };
}
