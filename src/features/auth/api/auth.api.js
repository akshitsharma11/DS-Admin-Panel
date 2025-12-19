import { httpClient } from '../../../services/http';

/**
 * Authentication API endpoints
 */
export const authApi = {
  /**
   * Login user
   * @param {string} email - User email
   * @returns {Promise} Auth response with token
   */
  login: async (email) => {
    const response = await httpClient.post('/auth/login', { email });
    return response.data;
  },

  /**
   * Logout user
   * @returns {Promise} Logout result
   */
  logout: async () => {
    const response = await httpClient.post('/auth/logout');
    return response.data;
  },

  /**
   * Get current user
   * @returns {Promise} Current user data
   */
  getCurrentUser: async () => {
    const response = await httpClient.get('/auth/me');
    return response.data;
  },
};

