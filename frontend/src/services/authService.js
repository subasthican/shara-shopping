import apiClient from './apiClient.js';

export async function loginAdmin(credentials) {
  const { data } = await apiClient.post('/auth/login', credentials);
  localStorage.setItem('shara_admin_token', data.token);
  localStorage.setItem('shara_admin_user', JSON.stringify(data.admin));
  return data;
}

export function getStoredAdmin() {
  const storedAdmin = localStorage.getItem('shara_admin_user');
  return storedAdmin ? JSON.parse(storedAdmin) : null;
}

export function logoutAdmin() {
  localStorage.removeItem('shara_admin_token');
  localStorage.removeItem('shara_admin_user');
}
