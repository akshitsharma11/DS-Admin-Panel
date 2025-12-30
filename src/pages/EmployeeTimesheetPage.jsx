import { useState, useEffect } from 'react';
import { Dropdown } from '../components/ui/Dropdown';
import { useTimesheet, TimesheetTable } from '../features/timesheet';
import { usersApi } from '../features/users/api/users.api';
import { useSnackbar } from '../contexts/SnackbarContext';
import { TableLoader } from '../components/ui/Loader';
import './EmployeeTimesheetPage.css';

const monthOptions = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const yearOptions = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - 5 + i;
  return { value: year, label: year.toString() };
});

export function EmployeeTimesheetPage() {
  const { error: showError } = useSnackbar();
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  
  const {
    selectedEmployee,
    setSelectedEmployee,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    timesheetData,
    handleDataUpdate,
  } = useTimesheet();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const usersData = await usersApi.getUsers();
        // Map users to dropdown options format
        const options = usersData.map((user) => ({
          value: user._id,
          label: user.name || user.tabName || 'Unknown User',
        }));
        setEmployeeOptions(options);
        
        // Always set first user as default
        if (options.length > 0) {
          setSelectedEmployee(options[0].value);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.description ||
          err.message ||
          'Failed to fetch users';
        showError(errorMessage);
        console.error('Error fetching users:', err);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="employee-timesheet-page">
      <div className="page-header">
        <h1 className="page-title">Employee Timesheet</h1>
        
        <div className="filters-section">
          <Dropdown
            options={employeeOptions}
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            placeholder={isLoadingUsers ? "Loading users..." : "Select Employee"}
            disabled={isLoadingUsers}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          
          <Dropdown
            options={monthOptions}
            value={selectedMonth}
            onChange={setSelectedMonth}
            placeholder="Select Month"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          
          <Dropdown
            options={yearOptions}
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="Select Year"
          />
        </div>
      </div>

      <div className="table-section">
        {isLoadingUsers || !selectedEmployee ? (
          <TableLoader text="Loading timesheet data..." />
        ) : (
          <TimesheetTable data={timesheetData} onUpdate={handleDataUpdate} />
        )}
      </div>
    </div>
  );
}

