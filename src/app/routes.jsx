import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout';
import { EmployeeTimesheetPage, ManageUsersPage, ManageJobsPage, LoginPage } from '../pages';
import { useAuth } from '../features/auth';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('x-access-token');

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/**
 * Public Route Component (Login)
 * Redirects to home if user is already authenticated
 */
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('x-access-token');

  if (isAuthenticated || token) {
    return <Navigate to="/timesheets" replace />;
  }

  return children;
}

/**
 * Application routes
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/timesheets" replace />} />
        <Route path="timesheets" element={<EmployeeTimesheetPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="jobs" element={<ManageJobsPage />} />
      </Route>
    </Routes>
  );
}

