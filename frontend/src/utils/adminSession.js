export function getStoredAdmin() {
  const storedAdmin = localStorage.getItem('shara_admin_user');
  return storedAdmin ? JSON.parse(storedAdmin) : null;
}

export function getStoredAdminToken() {
  return localStorage.getItem('shara_admin_token');
}

export function isAdminTokenExpired(token = getStoredAdminToken()) {
  const payload = decodeJwtPayload(token);

  if (!payload?.exp) {
    return false;
  }

  return payload.exp * 1000 <= Date.now();
}

export function hasValidAdminSession() {
  const token = getStoredAdminToken();
  const admin = getStoredAdmin();

  if (!admin || !token || isAdminTokenExpired(token)) {
    logoutAdmin();
    return false;
  }

  return true;
}

export function logoutAdmin() {
  localStorage.removeItem('shara_admin_token');
  localStorage.removeItem('shara_admin_user');
}

function decodeJwtPayload(token) {
  if (!token || token.split('.').length < 2) {
    return null;
  }

  try {
    const base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64Payload);
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
