import axios from 'axios';
import { setupInterceptors } from './interceptors.js';
import { API_BASE_URL } from '../../app/config/env.js';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup interceptors
setupInterceptors(httpClient);

export default httpClient;

