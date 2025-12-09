import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Change this to your Vercel backend URL
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      SecureStore.deleteItemAsync('auth_token');
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
