import axios from 'axios';
import { apiBaseUrl } from '../config/apiConfig.js';
import { getStoredAdminToken, isAdminTokenExpired, logoutAdmin } from '../utils/adminSession.js';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
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
