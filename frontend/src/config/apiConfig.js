const LOCAL_API_URL = 'http://127.0.0.1:5001/api';

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

export function resolveApiBaseUrl(env = import.meta.env) {
  const configuredUrl = env?.VITE_API_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (env?.MODE === 'production') {
    throw new Error('VITE_API_URL is required for production frontend builds.');
  }

  return LOCAL_API_URL;
}

export const apiBaseUrl = resolveApiBaseUrl();
