import axios from 'axios';
import { setupInterceptors } from './interceptors.js';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup interceptors
setupInterceptors(httpClient);

export default httpClient;

