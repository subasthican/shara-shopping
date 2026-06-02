import apiClient from './apiClient.js';

export async function createContactMessage(messagePayload) {
  const { data } = await apiClient.post('/contact', messagePayload);
  return data;
}

export async function getContactMessages(params = {}) {
  const { data } = await apiClient.get('/contact', { params });
  return data;
}

export async function getContactMessageById(messageId) {
  const { data } = await apiClient.get(`/contact/${messageId}`);
  return data;
}

export async function updateContactMessageStatus(messageId, statusPayload) {
  const { data } = await apiClient.put(`/contact/${messageId}/status`, statusPayload);
  return data;
}
