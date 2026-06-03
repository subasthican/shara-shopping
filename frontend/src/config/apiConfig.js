const LOCAL_API_URL = 'http://127.0.0.1:5001/api';
const PRODUCTION_API_URL = '/api';

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

export function resolveApiBaseUrl(env = import.meta.env) {
  const configuredUrl = env?.VITE_API_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (env?.MODE === 'production') {
    return PRODUCTION_API_URL;
  }

  return LOCAL_API_URL;
}

export const apiBaseUrl = resolveApiBaseUrl();
