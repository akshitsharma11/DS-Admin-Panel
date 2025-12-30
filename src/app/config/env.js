/**
 * Environment configuration
 *
 * To switch between Dev and Testing environments:
 * - Comment one line and uncomment the other
 *
 * Dev: http://82.180.160.159:3008/api/v1/
 * Testing: http://82.180.160.159:3005/api/v1/
 */

// Dev Environment
export const API_BASE_URL = "http://82.180.160.159:3008/api/v1/";

// Testing Environment (Production)
// export const API_BASE_URL = 'http://82.180.160.159:3005/api/v1/';

export const env = {
  API_BASE_URL,
  NODE_ENV: import.meta.env.MODE || "development",
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};
