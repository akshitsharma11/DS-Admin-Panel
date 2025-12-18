import { Dropdown } from '../components/ui/Dropdown';
import { useTimesheet, TimesheetTable } from '../features/timesheet';
import './EmployeeTimesheetPage.css';

// Mock employee options - in real app, fetch from API
const employeeOptions = [
  { value: '1', label: 'Marco D.' },
  { value: '2', label: 'John Smith' },
  { value: '3', label: 'Jane Doe' },
];

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

  return (
    <div className="employee-timesheet-page">
      <div className="page-header">
        <h1 className="page-title">Employee Timesheet</h1>
        
        <div className="filters-section">
          <Dropdown
            options={employeeOptions}
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            placeholder="Select Employee"
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
        <TimesheetTable data={timesheetData} onUpdate={handleDataUpdate} />
      </div>
    </div>
  );
}

