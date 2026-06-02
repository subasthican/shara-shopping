import apiClient from './apiClient.js';

export async function getCategories(params = {}) {
  const response = await apiClient.get('/categories', { params });
  return response.data;
}

export async function deleteCategory(categoryId) {
  const response = await apiClient.delete(`/categories/${categoryId}`);
  return response.data;
}

export async function createCategory(categoryPayload) {
  const response = await apiClient.post('/categories', categoryPayload);
  return response.data;
}

export async function updateCategory(categoryId, categoryPayload) {
  const response = await apiClient.put(`/categories/${categoryId}`, categoryPayload);
  return response.data;
}
