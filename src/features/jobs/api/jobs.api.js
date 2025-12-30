import { httpClient } from '../../../services/http';
import { JOBS_ENDPOINTS } from '../../../app/config/apiEndpoints.js';

/**
 * Jobs API service
 * All endpoints are defined in apiEndpoints.js
 */
export const jobsApi = {
  /**
   * Get all jobs
   * @returns {Promise} Jobs list with status and jobsData
   */
  getJobs: async () => {
    const response = await httpClient.post(JOBS_ENDPOINTS.GET_ALL);
    // Return the jobsData array from the response
    return response.data?.jobsData || [];
  },

  /**
   * Get job by ID
   * @param {number} jobId - Job ID
   * @returns {Promise} Job data
   */
  getJobById: async (jobId) => {
    const response = await httpClient.get(JOBS_ENDPOINTS.GET_BY_ID(jobId));
    return response.data;
  },

  /**
   * Create new job
   * @param {object} jobData - Job data
   * @returns {Promise} Created job
   */
  createJob: async (jobData) => {
    const response = await httpClient.post(JOBS_ENDPOINTS.CREATE, jobData);
    return response.data;
  },

  /**
   * Update job
   * @param {object} jobData - Updated job data (includes jobName, jobId, active as string)
   * @returns {Promise} Updated job
   */
  updateJob: async (jobData) => {
    const response = await httpClient.post(JOBS_ENDPOINTS.UPDATE, jobData);
    return response.data;
  },

  /**
   * Delete job
   * @param {number} jobId - Job ID
   * @returns {Promise} Deletion result
   */
  deleteJob: async (jobId) => {
    const response = await httpClient.delete(JOBS_ENDPOINTS.DELETE(jobId));
    return response.data;
  },
};

