import apiClient from './apiClient.js';

export async function getCustomers(params = {}) {
  const response = await apiClient.get('/customers', { params });
  return response.data;
}
