import { useState, useEffect } from 'react';
import { authApi } from '../api/auth.api.js';
import { useSnackbar } from '../../../contexts/SnackbarContext';

const TOKEN_KEY = 'x-access-token';

/**
 * Hook for authentication
 * Manages authentication state, token storage, and API calls
 */
export function useAuth() {
  const { success, error: showError } = useSnackbar();
  // Check if user is authenticated based on token presence
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem(TOKEN_KEY);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    setIsAuthenticated(!!token);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Login user with email and password
   * @param {string} email - User email address
   * @returns {Promise<boolean>} Success status
   */
  const login = async (email) => {
    setIsLoading(true);
    setError('');

    try {
      if (!email || !email.trim()) {
        setError('Please fill in this field.');
        setIsLoading(false);
        return false;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return false;
      }

      // Call login API
      const response = await authApi.login(email);

      // Check if login was successful
      if (response.status && response['x-access-token']) {
        // Store the token
        localStorage.setItem(TOKEN_KEY, response['x-access-token']);
        
        // Store user data
        if (response.data) {
          setUser(response.data);
        }

        // Update authentication state
        setIsAuthenticated(true);
        setIsLoading(false);
        success('Login successful');
        return true;
      } else {
        const errorMsg = response.description || 'Login failed. Please try again.';
        setError(errorMsg);
        showError(errorMsg);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.description || err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      showError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  /**
   * Logout user - clears token and resets state
   */
  const logout = async () => {
    try {
      // Call logout API if needed (currently handled client-side)
      await authApi.logout();
      
      // Clear token from localStorage
      localStorage.removeItem(TOKEN_KEY);
      
      // Reset state
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Even if API call fails, clear local state
      localStorage.removeItem(TOKEN_KEY);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    user,
    login,
    logout,
    validateEmail,
  };
}

