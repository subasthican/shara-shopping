import apiClient from './apiClient.js';

export async function createContactMessage(messagePayload) {
  const { data } = await apiClient.post('/contact', messagePayload);
  return data;
}
