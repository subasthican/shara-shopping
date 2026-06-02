import apiClient from './apiClient.js';

export async function getProducts(params = {}) {
  const response = await apiClient.get('/products', { params });
  return response.data;
}

export async function getProductById(productId) {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
}

export async function createProduct(productPayload) {
  const response = await apiClient.post('/products', productPayload);
  return response.data;
}

export async function updateProduct(productId, productPayload) {
  const response = await apiClient.put(`/products/${productId}`, productPayload);
  return response.data;
}
