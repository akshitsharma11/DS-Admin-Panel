/**
 * Centralized API Endpoints Configuration
 *
 * All API endpoints are defined here for easy management and maintenance.
 * The base URL is configured in env.js and automatically prepended to these endpoints.
 *
 * Base URL examples:
 * - Dev: http://82.180.160.159:3008/api/v1/
 * - Testing: http://82.180.160.159:3005/api/v1/
 */

/**
 * Authentication API Endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: "/admin/login",
  LOGOUT: "/admin/logout",
  GET_CURRENT_USER: "/admin/me",
};

/**
 * Users API Endpoints
 */
export const USERS_ENDPOINTS = {
  GET_ALL: "admin/user-manage/get-all-users",
  GET_BY_ID: (userId) => `users/${userId}`,
  CREATE: "admin/user-manage/create-user",
  UPDATE: "admin/user-manage/edit-user",
  DELETE: (userId) => `users/${userId}`,
};

/**
 * Jobs API Endpoints
 */
export const JOBS_ENDPOINTS = {
  GET_ALL: "admin/job-manage/get-all-jobs",
  GET_BY_ID: (jobId) => `jobs/${jobId}`,
  CREATE: "admin/job-manage/create-job",
  UPDATE: "admin/job-manage/edit-job",
  DELETE: (jobId) => `jobs/${jobId}`,
};

/**
 * Timesheet API Endpoints
 */
export const TIMESHEET_ENDPOINTS = {
  GET_ALL: "/timesheets",
  GET_BY_ID: (entryId) => `/timesheets/${entryId}`,
  CREATE: "/timesheets",
  UPDATE: (entryId) => `/timesheets/${entryId}`,
  DELETE: (entryId) => `/timesheets/${entryId}`,
};

/**
 * Export all endpoints as a single object for convenience
 */
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USERS: USERS_ENDPOINTS,
  JOBS: JOBS_ENDPOINTS,
  TIMESHEET: TIMESHEET_ENDPOINTS,
};
