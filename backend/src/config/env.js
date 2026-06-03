const REQUIRED_ENV_VARS = ['MONGODB_URI', 'JWT_SECRET'];
const PLACEHOLDER_SECRETS = new Set([
  'replace-with-a-long-random-secret',
  'replace-with-a-secure-password',
]);

export function validateEnvironment(env = process.env) {
  const errors = [];
  const nodeEnv = env.NODE_ENV || 'development';

  REQUIRED_ENV_VARS.forEach((key) => {
    if (!String(env[key] || '').trim()) {
      errors.push(`${key} is required.`);
    }
  });

  if (nodeEnv === 'production') {
    if (!String(env.CLIENT_URL || '').trim()) {
      errors.push('CLIENT_URL is required in production.');
    }

    if (PLACEHOLDER_SECRETS.has(String(env.JWT_SECRET || '').trim())) {
      errors.push('JWT_SECRET must be replaced with a secure production secret.');
    }
  }

  if (errors.length) {
    throw new Error(`Invalid environment configuration: ${errors.join(' ')}`);
  }
}
