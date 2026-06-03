import axios from 'axios';
import { getStoredAdminToken, isAdminTokenExpired, logoutAdmin } from '../utils/adminSession.js';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredAdminToken();

  if (token && !isAdminTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (token) {
    logoutAdmin();
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutAdmin();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
