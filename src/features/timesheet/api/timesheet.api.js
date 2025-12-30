import { httpClient } from '../../../services/http';
import { TIMESHEET_ENDPOINTS } from '../../../app/config/apiEndpoints.js';

/**
 * Timesheet API service
 * All endpoints are defined in apiEndpoints.js
 */
export const timesheetApi = {
  /**
   * Get timesheet data for an employee
   * @param {string} employeeId - Employee ID
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @returns {Promise} Timesheet data
   */
  getTimesheet: async (employeeId, month, year) => {
    const response = await httpClient.get(TIMESHEET_ENDPOINTS.GET_ALL, {
      params: { employeeId, month, year },
    });
    return response.data;
  },

  /**
   * Update timesheet entry
   * @param {string} entryId - Entry ID
   * @param {object} data - Updated timesheet data
   * @returns {Promise} Updated entry
   */
  updateTimesheet: async (entryId, data) => {
    const response = await httpClient.put(TIMESHEET_ENDPOINTS.UPDATE(entryId), data);
    return response.data;
  },

  /**
   * Create new timesheet entry
   * @param {object} data - Timesheet entry data
   * @returns {Promise} Created entry
   */
  createTimesheet: async (data) => {
    const response = await httpClient.post(TIMESHEET_ENDPOINTS.CREATE, data);
    return response.data;
  },

  /**
   * Delete timesheet entry
   * @param {string} entryId - Entry ID
   * @returns {Promise} Deletion result
   */
  deleteTimesheet: async (entryId) => {
    const response = await httpClient.delete(TIMESHEET_ENDPOINTS.DELETE(entryId));
    return response.data;
  },
};

