import { httpClient } from '../../../services/http';

/**
 * Timesheet API endpoints
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
    const response = await httpClient.get('/timesheets', {
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
    const response = await httpClient.put(`/timesheets/${entryId}`, data);
    return response.data;
  },

  /**
   * Create new timesheet entry
   * @param {object} data - Timesheet entry data
   * @returns {Promise} Created entry
   */
  createTimesheet: async (data) => {
    const response = await httpClient.post('/timesheets', data);
    return response.data;
  },
};

