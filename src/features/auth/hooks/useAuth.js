import { useState } from 'react';
// import { authApi } from '../api/auth.api';

/**
 * Hook for authentication
 * Currently uses mock validation - replace with API calls when backend is ready
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

      // TODO: Replace with API call
      // const response = await authApi.login(email);
      // localStorage.setItem('token', response.token);
      // setIsAuthenticated(true);

      // Mock success for now
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      // TODO: Replace with API call
      // await authApi.logout();
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    validateEmail,
  };
}

