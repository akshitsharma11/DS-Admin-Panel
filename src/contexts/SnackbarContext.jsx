import { createContext, useContext, useState, useCallback } from 'react';
import { SnackbarContainer } from '../components/ui/Snackbar';

const SnackbarContext = createContext(null);

/**
 * Snackbar Provider
 * Provides snackbar functionality throughout the app
 */
export function SnackbarProvider({ children }) {
  const [snackbars, setSnackbars] = useState([]);

  const showSnackbar = useCallback((type, message, options = {}) => {
    const id = Date.now() + Math.random();
    const snackbar = {
      id,
      type,
      title: options.title || null,
      message,
      duration: options.duration || 5000,
    };

    setSnackbars((prev) => [...prev, snackbar]);

    return id;
  }, []);

  const closeSnackbar = useCallback((id) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  const success = useCallback((message, options = {}) => {
    return showSnackbar('success', message, { ...options, title: options.title || 'Success' });
  }, [showSnackbar]);

  const error = useCallback((message, options = {}) => {
    return showSnackbar('error', message, { ...options, title: options.title || 'Error' });
  }, [showSnackbar]);

  const info = useCallback((message, options = {}) => {
    return showSnackbar('info', message, { ...options, title: options.title || 'Info' });
  }, [showSnackbar]);

  const warning = useCallback((message, options = {}) => {
    return showSnackbar('warning', message, { ...options, title: options.title || 'Warning' });
  }, [showSnackbar]);

  const value = {
    success,
    error,
    info,
    warning,
    showSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <SnackbarContainer snackbars={snackbars} onClose={closeSnackbar} />
    </SnackbarContext.Provider>
  );
}

/**
 * Hook to use snackbar
 */
export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
}

