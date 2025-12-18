/**
 * Setup request and response interceptors for axios
 * @param {import('axios').AxiosInstance} axiosInstance - The axios instance to setup interceptors for
 */
export function setupInterceptors(axiosInstance) {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Handle unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        // You can add navigation logic here if needed
      }
      return Promise.reject(error);
    }
  );
}

