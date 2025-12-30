import { httpClient } from "../../../services/http";
import { USERS_ENDPOINTS } from "../../../app/config/apiEndpoints.js";

/**
 * Users API service
 * All endpoints are defined in apiEndpoints.js
 */
export const usersApi = {
  /**
   * Get all users
   * @returns {Promise} Users list with status and data
   */
  getUsers: async () => {
    const response = await httpClient.post(USERS_ENDPOINTS.GET_ALL);
    // Return the data array from the response
    return response.data?.data || [];
  },

  /**
   * Get user by ID
   * @param {number} userId - User ID
   * @returns {Promise} User data
   */
  getUserById: async (userId) => {
    const response = await httpClient.get(USERS_ENDPOINTS.GET_BY_ID(userId));
    return response.data;
  },

  /**
   * Create new user
   * @param {object} userData - User data (includes email, tabName, name, role, hourlyRate, userStatus)
   * @returns {Promise} Created user
   */
  createUser: async (userData) => {
    const response = await httpClient.post(USERS_ENDPOINTS.CREATE, userData);
    return response.data;
  },

  /**
   * Update user
   * @param {object} userData - Updated user data (includes email, tabName, name, role, hourlyRate, userStatus)
   * @returns {Promise} Updated user
   */
  updateUser: async (userData) => {
    const response = await httpClient.post(USERS_ENDPOINTS.UPDATE, userData);
    return response.data;
  },

  /**
   * Delete user
   * @param {number} userId - User ID
   * @returns {Promise} Deletion result
   */
  deleteUser: async (userId) => {
    const response = await httpClient.delete(USERS_ENDPOINTS.DELETE(userId));
    return response.data;
  },
};
