import { BrowserRouter } from 'react-router-dom';

/**
 * AppProviders - Wraps the app with all necessary providers
 */
export function AppProviders({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

