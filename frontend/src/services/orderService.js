import apiClient from './apiClient.js';

export async function createOrder(orderPayload) {
  const { data } = await apiClient.post('/orders', orderPayload);
  return data;
}

export async function trackOrder(orderId, contact) {
  const { data } = await apiClient.get(`/orders/track/${orderId}`, {
    params: { contact },
  });
  return data;
}

export async function getOrders(params = {}) {
  const { data } = await apiClient.get('/orders', { params });
  return data;
}

export async function getOrderById(orderId) {
  const { data } = await apiClient.get(`/orders/${orderId}`);
  return data;
}

export async function updateOrderStatus(orderId, statusPayload) {
  const { data } = await apiClient.put(`/orders/${orderId}/status`, statusPayload);
  return data;
}
