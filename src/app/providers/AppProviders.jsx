import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from '../../contexts/SnackbarContext.jsx';

/**
 * AppProviders - Wraps the app with all necessary providers
 */
export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
    </BrowserRouter>
  );
}

