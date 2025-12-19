import { httpClient } from "../../../services/http";

/**
 * Users API endpoints
 */
export const usersApi = {
  /**
   * Get all users
   * @returns {Promise} Users list
   */
  getUsers: async () => {
    const response = await httpClient.get("/users");
    return response.data;
  },

  /**
   * Get user by ID
   * @param {number} userId - User ID
   * @returns {Promise} User data
   */
  getUserById: async (userId) => {
    const response = await httpClient.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Create new user
   * @param {object} userData - User data
   * @returns {Promise} Created user
   */
  createUser: async (userData) => {
    const response = await httpClient.post("/users", userData);
    return response.data;
  },

  /**
   * Update user
   * @param {number} userId - User ID
   * @param {object} userData - Updated user data
   * @returns {Promise} Updated user
   */
  updateUser: async (userId, userData) => {
    const response = await httpClient.put(`/users/${userId}`, userData);
    return response.data;
  },

  /**
   * Delete user
   * @param {number} userId - User ID
   * @returns {Promise} Deletion result
   */
  deleteUser: async (userId) => {
    const response = await httpClient.delete(`/users/${userId}`);
    return response.data;
  },
};
