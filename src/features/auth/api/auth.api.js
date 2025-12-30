import { httpClient } from "../../../services/http";
import { AUTH_ENDPOINTS } from "../../../app/config/apiEndpoints.js";

/**
 * Authentication API service
 * All endpoints are defined in apiEndpoints.js
 */
export const authApi = {
  /**
   * Login admin user
   * @param {string} user_email - Admin email address
   * @param {string} password - Admin password (hardcoded for now)
   * @returns {Promise} Auth response with token and user data
   */
  login: async (user_email, password = "DS1@123") => {
    const response = await httpClient.post(AUTH_ENDPOINTS.LOGIN, {
      user_email,
      password,
    });
    return response.data;
  },

  /**
   * Logout user
   * @returns {Promise} Logout result
   */
  logout: async () => {
    // For now, logout is handled client-side by clearing the token
    // If backend requires a logout endpoint, uncomment below:
    // const response = await httpClient.post(AUTH_ENDPOINTS.LOGOUT);
    // return response.data;
    return Promise.resolve({ success: true });
  },

  /**
   * Get current user
   * @returns {Promise} Current user data
   */
  getCurrentUser: async () => {
    const response = await httpClient.get(AUTH_ENDPOINTS.GET_CURRENT_USER);
    return response.data;
  },
};
