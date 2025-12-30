/**
 * Setup request and response interceptors for axios
 * @param {import('axios').AxiosInstance} axiosInstance - The axios instance to setup interceptors for
 */
export function setupInterceptors(axiosInstance) {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add x-access-token if available
      const token = localStorage.getItem('x-access-token');
      if (token) {
        config.headers['x-access-token'] = token;
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
        localStorage.removeItem('x-access-token');
        // Redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
}

