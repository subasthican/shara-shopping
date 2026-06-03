const REQUIRED_ENV_VARS = ['MONGODB_URI', 'JWT_SECRET'];
const MIN_PRODUCTION_JWT_SECRET_LENGTH = 32;
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

  if (env.MONGODB_URI && !isValidMongoUri(env.MONGODB_URI)) {
    errors.push('MONGODB_URI must start with mongodb:// or mongodb+srv://.');
  }

  if (nodeEnv === 'production') {
    if (!String(env.CLIENT_URL || '').trim()) {
      errors.push('CLIENT_URL is required in production.');
    } else if (!hasValidClientOrigins(env.CLIENT_URL)) {
      errors.push('CLIENT_URL must contain valid http or https origins.');
    }

    const jwtSecret = String(env.JWT_SECRET || '').trim();

    if (PLACEHOLDER_SECRETS.has(jwtSecret)) {
      errors.push('JWT_SECRET must be replaced with a secure production secret.');
    } else if (jwtSecret.length < MIN_PRODUCTION_JWT_SECRET_LENGTH) {
      errors.push(`JWT_SECRET must be at least ${MIN_PRODUCTION_JWT_SECRET_LENGTH} characters in production.`);
    }
  }

  if (errors.length) {
    throw new Error(`Invalid environment configuration: ${errors.join(' ')}`);
  }
}

function isValidMongoUri(uri) {
  return /^mongodb(\+srv)?:\/\//.test(String(uri).trim());
}

function hasValidClientOrigins(clientUrl) {
  const origins = String(clientUrl)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!origins.length) {
    return false;
  }

  return origins.every((origin) => {
    try {
      const url = new URL(origin);
      return ['http:', 'https:'].includes(url.protocol) && !url.pathname.replace(/\/$/, '');
    } catch {
      return false;
    }
  });
}
