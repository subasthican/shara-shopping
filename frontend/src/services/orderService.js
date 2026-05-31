import apiClient from './apiClient.js';

export async function createOrder(orderPayload) {
  const { data } = await apiClient.post('/orders', orderPayload);
  return data;
}
