import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout';
import { EmployeeTimesheetPage, ManageUsersPage, ManageJobsPage, LoginPage } from '../pages';

/**
 * Application routes
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/timesheets" replace />} />
        <Route path="timesheets" element={<EmployeeTimesheetPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="jobs" element={<ManageJobsPage />} />
      </Route>
    </Routes>
  );
}

