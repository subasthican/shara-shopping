import apiClient from './apiClient.js';

export async function getProducts(params = {}) {
  const response = await apiClient.get('/products', { params });
  return response.data;
}
