import apiClient from './apiClient.js';

export async function getDashboardStats() {
  const { data } = await apiClient.get('/dashboard/stats');
  return data;
}
