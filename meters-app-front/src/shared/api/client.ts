import axios, { AxiosError, type AxiosInstance } from 'axios';

import { API_BASE_URL } from '@/shared/config';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('[api]', error.response?.status, error.config?.url, error.message);
    }
    return Promise.reject(error);
  }
);

export { AxiosError };
