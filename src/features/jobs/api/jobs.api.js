import { httpClient } from '../../../services/http';

/**
 * Jobs API endpoints
 */
export const jobsApi = {
  /**
   * Get all jobs
   * @returns {Promise} Jobs list
   */
  getJobs: async () => {
    const response = await httpClient.get('/jobs');
    return response.data;
  },

  /**
   * Get job by ID
   * @param {number} jobId - Job ID
   * @returns {Promise} Job data
   */
  getJobById: async (jobId) => {
    const response = await httpClient.get(`/jobs/${jobId}`);
    return response.data;
  },

  /**
   * Create new job
   * @param {object} jobData - Job data
   * @returns {Promise} Created job
   */
  createJob: async (jobData) => {
    const response = await httpClient.post('/jobs', jobData);
    return response.data;
  },

  /**
   * Update job
   * @param {number} jobId - Job ID
   * @param {object} jobData - Updated job data
   * @returns {Promise} Updated job
   */
  updateJob: async (jobId, jobData) => {
    const response = await httpClient.put(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  /**
   * Delete job
   * @param {number} jobId - Job ID
   * @returns {Promise} Deletion result
   */
  deleteJob: async (jobId) => {
    const response = await httpClient.delete(`/jobs/${jobId}`);
    return response.data;
  },
};

