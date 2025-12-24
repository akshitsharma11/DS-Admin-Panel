import { useState } from "react";
import { Dropdown } from "../../../components/ui/Dropdown";
import { UserTable } from "../../users/components/UserTable";
import { JobTable } from "../../jobs/components/JobTable";
import { TimesheetTable } from "../../timesheet/components/TimesheetTable";
import { FormDialog } from "../../../components/ui/FormDialog";
import { DeleteDialog } from "../../../components/ui/DeleteDialog";
import { FeatureAnnotation } from "./FeatureAnnotation";
import logoImage from "../../../assets/DS Logo 1.png";
// Import actual page styles to match UI exactly
import "../../../pages/LoginPage.css";
import "../../../pages/EmployeeTimesheetPage.css";
import "../../../pages/ManageUsersPage.css";
import "../../../pages/ManageJobsPage.css";
// Import dialog styles
import "../../../components/ui/FormDialog.css";
import "../../../components/ui/DeleteDialog.css";
import "./HelpDialog.css";

/**
 * Help Dialog Component - Shows complete app flow with actual UI
 * Displays real UI components from the application with annotations
 */
export function HelpDialog({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Sample data for preview
  const sampleEmployeeOptions = [
    { value: "1", label: "Marco D." },
    { value: "2", label: "John Smith" },
    { value: "3", label: "Jane Doe" },
  ];

  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return { value: year, label: year.toString() };
  });

  // Sample timesheet data
  const sampleTimesheetData = [
    {
      id: "1",
      date: 1,
      day: "Mon",
      facilityImprovement: "",
      training: "",
      paidTimeOffVacation: "",
      projectManagement: 8,
      grace: "",
      sickTimeWithPay: "",
      holidayPaid: "",
      administrative: "",
      emailsAsa: "",
      warranty: "",
      machineMaintenance: "",
      organizationalMeeting: "",
      rmi: "",
      tmDescription: "",
      isWeekend: false,
    },
    {
      id: "2",
      date: 2,
      day: "Tue",
      facilityImprovement: "",
      training: 2,
      paidTimeOffVacation: "",
      projectManagement: 6,
      grace: "",
      sickTimeWithPay: "",
      holidayPaid: "",
      administrative: "",
      emailsAsa: "",
      warranty: "",
      machineMaintenance: "",
      organizationalMeeting: "",
      rmi: "",
      tmDescription: "",
      isWeekend: false,
    },
  ];

  // Sample users data
  const sampleUsers = [
    {
      id: 1,
      shortName: "Marco D.",
      fullName: "Marco Daniels",
      email: "marco.daniels@company.com",
      hourlyRate: 50,
      role: "Employee",
      status: "Active",
    },
    {
      id: 2,
      shortName: "Sarah J.",
      fullName: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      hourlyRate: 55,
      role: "Employee",
      status: "Active",
    },
  ];

  // Sample jobs data
  const sampleJobs = [
    {
      id: 1,
      jobName: "Project Alpha - Development",
      status: "Active",
    },
    {
      id: 2,
      jobName: "Project Beta - Testing",
      status: "Active",
    },
  ];

  const appFlowSteps = [
    {
      title: "Login Page",
      description:
        "Start by logging in with your email address. Enter a valid email and click Login to access the admin panel.",
      route: "/login",
      features: [
        "Email validation",
        "Secure authentication",
        "Responsive design",
      ],
      ui: (
        <div className="help-ui-preview login-preview">
          <div
            className="login-page"
            style={{
              minHeight: "auto",
              maxHeight: "400px",
              position: "relative",
            }}
          >
            <div
              className="login-left-section"
              style={{ padding: "20px", minHeight: "auto" }}
            >
              <div className="login-left-content">
                <img
                  src={logoImage}
                  alt="DS1 Admin Panel"
                  className="login-logo"
                  style={{
                    width: "80px",
                    height: "80px",
                    marginBottom: "20px",
                  }}
                />
                <h1 className="login-app-title" style={{ fontSize: "24px" }}>
                  DS1 Admin Panel
                </h1>
              </div>
            </div>

            <div
              className="login-right-section"
              style={{ padding: "20px", position: "relative" }}
            >
              <div
                className="login-form-container"
                style={{ position: "relative" }}
              >
                <h2 className="login-greeting" style={{ fontSize: "24px" }}>
                  Hello!
                </h2>
                <p className="login-subtitle">Login to Get started</p>

                <form className="login-form">
                  <div className="form-group" style={{ position: "relative" }}>
                    <div
                      className="input-wrapper annotation-highlight"
                      style={{ position: "relative" }}
                    >
                      <svg
                        className="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M3 7l9 6 9-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <input
                        type="text"
                        className="login-input"
                        placeholder="Email"
                        disabled
                        readOnly
                      />
                      <FeatureAnnotation
                        position="top"
                        text="Enter your email address here. System validates email format automatically as you type."
                      />
                    </div>
                  </div>

                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      className="login-button annotation-highlight"
                      disabled
                      style={{ position: "relative" }}
                    >
                      Login
                      <FeatureAnnotation
                        position="top"
                        text="Click to log in. Button activates when valid email is entered. Redirects to timesheet page after login."
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Employee Timesheet",
      description:
        "View and manage employee timesheets. Filter by employee, month, and year. Edit timesheet entries directly in the table cells.",
      route: "/timesheets",
      features: [
        "Filter by employee, month, year",
        "Editable timesheet table",
        "Real-time data updates",
        "Percentage calculations",
      ],
      ui: (
        <div className="help-ui-preview timesheet-preview">
          <div
            className="employee-timesheet-page"
            style={{ position: "relative" }}
          >
            <div className="page-header">
              <h1 className="page-title">Employee Timesheet</h1>

              <div className="filters-section" style={{ position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <div
                    className="annotation-highlight"
                    style={{ position: "relative", pointerEvents: "none" }}
                  >
                    <div
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        minWidth: "150px",
                        cursor: "default",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="12"
                          cy="7"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <span style={{ fontSize: "14px", color: "#333" }}>
                        Marco D.
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <FeatureAnnotation
                      position="right"
                      text="Click to select employee. Shows dropdown with all employees. Timesheet updates automatically."
                    />
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    className="annotation-highlight"
                    style={{ position: "relative", pointerEvents: "none" }}
                  >
                    <div
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        minWidth: "150px",
                        cursor: "default",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 2v4M8 2v4M3 10h18"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <span style={{ fontSize: "14px", color: "#333" }}>
                        December
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <FeatureAnnotation
                      position="right"
                      text="Select month (January-December). Timesheet table updates to show that month's data."
                    />
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    className="annotation-highlight"
                    style={{ position: "relative", pointerEvents: "none" }}
                  >
                    <div
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        minWidth: "120px",
                        cursor: "default",
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#333" }}>
                        2025
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ marginLeft: "auto" }}
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <FeatureAnnotation
                      position="right"
                      text="Select year. Shows last 10 years. Filters timesheet to that year's data."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="table-section" style={{ position: "relative" }}>
              <div
                className="annotation-highlight"
                style={{ position: "relative" }}
              >
                <TimesheetTable
                  data={sampleTimesheetData}
                  onUpdate={() => {}}
                />
                <FeatureAnnotation
                  position="left"
                  text="Click any hour cell to edit. Use spinner or type numbers. Total calculates automatically. Percentage row shows time distribution. Summary shows monthly totals."
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Manage Users - Main Page",
      description:
        "View all users in a table. Use search to find users quickly. Click Add New User to create, or Edit/Delete buttons to manage existing users.",
      route: "/users",
      features: [
        "Search users by name, email, or role",
        "Add new users",
        "Edit user information",
        "Delete users",
        "View user details in table",
      ],
      ui: (
        <div className="help-ui-preview users-preview">
          <div className="manage-users-page" style={{ position: "relative" }}>
            <div className="page-header-single-line">
              <h1 className="page-title">User Management</h1>
              <div
                className="header-right-section"
                style={{ position: "relative" }}
              >
                <div style={{ position: "relative" }}>
                  <div
                    className="search-input-wrapper annotation-highlight"
                    style={{ position: "relative" }}
                  >
                    <svg
                      className="search-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="m21 21-4.35-4.35"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search users by name, email, or role..."
                      disabled
                      readOnly
                    />
                    <FeatureAnnotation
                      position="right"
                      text="Type to search users instantly. Filters by name, email, or role. Results update as you type."
                    />
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <button
                    className="btn-add-user annotation-highlight"
                    disabled
                    style={{ position: "relative", cursor: "default" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>Add New User</span>
                    <FeatureAnnotation
                      position="left"
                      text="Click to open Add User dialog. Enter user details: name, email, hourly rate, role, and status."
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="table-section" style={{ position: "relative" }}>
              <div
                className="annotation-highlight"
                style={{ position: "relative" }}
              >
                <UserTable
                  users={sampleUsers}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
                <FeatureAnnotation
                  position="right"
                  text="Table shows: Short Name, Full Name, Email, Hourly Rate, Role (Employee/Manager badge), Status (Active/Inactive badge). Edit button (✏️) opens Edit dialog with pre-filled data. Delete button (🗑️) opens Delete confirmation. All columns are sortable."
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Add/Edit User Dialog",
      description:
        "Dialog opens when you click 'Add New User' or Edit button. Fill in all required fields and click 'Add User' or 'Save Changes' to save.",
      route: "/users",
      features: [
        "Add new users with all details",
        "Edit existing user information",
        "Form validation",
        "Save or cancel changes",
      ],
      ui: (
        <div className="help-ui-preview users-preview">
          <div style={{ position: "relative", minHeight: "400px" }}>
            <div
              className="dialog-overlay"
              style={{
                position: "relative",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                className="dialog-content"
                style={{
                  position: "relative",
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                <div className="dialog-header">
                  <h2>Add New User</h2>
                  <button
                    className="btn-close"
                    disabled
                    style={{ cursor: "default" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <form className="dialog-form">
                  <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="fullName">Full Name *</label>
                    <div
                      className="annotation-highlight"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter full name"
                        disabled
                        readOnly
                      />
                      <FeatureAnnotation
                        position="top"
                        text="Enter user's full name. Required field. Example: John Smith"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="email">Email *</label>
                    <div
                      className="annotation-highlight"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email address"
                        disabled
                        readOnly
                      />
                      <FeatureAnnotation
                        position="top"
                        text="Enter user's email address. Required field. Must be valid email format."
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="hourlyRate">Hourly Rate ($) *</label>
                    <div
                      className="annotation-highlight"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="number"
                        id="hourlyRate"
                        name="hourlyRate"
                        placeholder="Enter hourly rate"
                        min="0"
                        step="0.01"
                        disabled
                        readOnly
                      />
                      <FeatureAnnotation
                        position="top"
                        text="Enter hourly rate in dollars. Required field. Can use decimals (e.g., 50.50)."
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="role">Role *</label>
                    <div
                      className="annotation-highlight"
                      style={{ position: "relative" }}
                    >
                      <select id="role" name="role" disabled>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                      </select>
                      <FeatureAnnotation
                        position="top"
                        text="Select user role: Employee or Manager. Required field. Determines user permissions."
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="status">Status *</label>
                    <div
                      className="annotation-highlight"
                      style={{ position: "relative" }}
                    >
                      <select id="status" name="status" disabled>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <FeatureAnnotation
                        position="top"
                        text="Select status: Active (can login) or Inactive (cannot login). Required field."
                      />
                    </div>
                  </div>

                  <div
                    className="dialog-actions"
                    style={{ position: "relative" }}
                  >
                    <div style={{ position: "relative" }}>
                      <button
                        type="button"
                        className="btn-cancel annotation-highlight"
                        disabled
                        style={{ position: "relative", cursor: "default" }}
                      >
                        Cancel
                        <FeatureAnnotation
                          position="left"
                          text="Click to close dialog without saving. All entered data will be lost."
                        />
                      </button>
                    </div>
                    <div style={{ position: "relative" }}>
                      <button
                        type="submit"
                        className="btn-save annotation-highlight"
                        disabled
                        style={{ position: "relative", cursor: "default" }}
                      >
                        Add User
                        <FeatureAnnotation
                          position="right"
                          text="Click to save new user. Validates all fields first. User appears in table after saving."
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Delete User Confirmation",
      description:
        "Delete confirmation dialog appears when you click the Delete button (🗑️) on any user. Confirm to permanently delete the user.",
      route: "/users",
      features: [
        "Confirmation before deletion",
        "Shows user name being deleted",
        "Cancel or confirm action",
      ],
      ui: (
        <div className="help-ui-preview users-preview">
          <div style={{ position: "relative", minHeight: "300px" }}>
            <div
              className="dialog-overlay"
              style={{
                position: "relative",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                className="delete-dialog-content"
                style={{
                  position: "relative",
                  maxWidth: "400px",
                  width: "100%",
                }}
              >
                <div className="delete-dialog-header">
                  <div className="delete-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 6h18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h2>Delete User</h2>
                </div>

                <div className="delete-dialog-body">
                  <p>
                    Are you sure you want to delete{" "}
                    <strong>Marco Daniels</strong>? This action cannot be
                    undone.
                  </p>
                </div>

                <div
                  className="delete-dialog-actions"
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      className="btn-cancel annotation-highlight"
                      disabled
                      style={{ position: "relative", cursor: "default" }}
                    >
                      Cancel
                      <FeatureAnnotation
                        position="left"
                        text="Click to cancel deletion. Dialog closes and user remains in the system."
                      />
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      className="btn-delete-confirm annotation-highlight"
                      disabled
                      style={{ position: "relative", cursor: "default" }}
                    >
                      Delete
                      <FeatureAnnotation
                        position="right"
                        text="Click to permanently delete user. Action cannot be undone. User removed from table."
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Manage Jobs - Main Page",
      description:
        "View all job projects in a table. Use search to find jobs quickly. Click Add New Job to create, or Edit/Delete buttons to manage existing jobs.",
      route: "/jobs",
      features: [
        "Search jobs by name or status",
        "Add new jobs",
        "Edit job details",
        "Delete jobs",
        "View job status",
      ],
      ui: (
        <div className="help-ui-preview jobs-preview">
          <div className="manage-jobs-page" style={{ position: "relative" }}>
            <div className="page-header-single-line">
              <h1 className="page-title">Job Management</h1>
              <div
                className="header-right-section"
                style={{ position: "relative" }}
              >
                <div style={{ position: "relative" }}>
                  <div
                    className="search-input-wrapper annotation-highlight"
                    style={{ position: "relative" }}
                  >
                    <svg
                      className="search-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="m21 21-4.35-4.35"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search jobs by name or status..."
                      disabled
                      readOnly
                    />
                    <FeatureAnnotation
                      position="left"
                      text="Type to search jobs. Filters by job name or status (Active/Inactive). Results update instantly."
                    />
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <button
                    className="btn-add-job annotation-highlight"
                    disabled
                    style={{ position: "relative", cursor: "default" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>Add New Job</span>
                    <FeatureAnnotation
                      position="left"
                      text="Click to open Add Job dialog. Enter job name and select status (Active/Inactive)."
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="table-section" style={{ position: "relative" }}>
              <div
                className="annotation-highlight"
                style={{ position: "relative" }}
              >
                <JobTable
                  jobs={sampleJobs}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
                <FeatureAnnotation
                  position="right"
                  text="Table shows: Job Name, Status (Active=green badge, Inactive=gray badge), Actions. Edit button (✏️) opens Edit dialog with current job name and status. Delete button (🗑️) opens Delete confirmation. Click row to view job details."
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Add/Edit Job Dialog",
      description:
        "Dialog opens when you click 'Add New Job' or Edit button. Enter job name and select status, then click 'Add Job' or 'Save Changes'.",
      route: "/jobs",
      features: [
        "Add new job projects",
        "Edit existing job details",
        "Set job status",
        "Save or cancel changes",
      ],
      ui: (
        <div className="help-ui-preview jobs-preview">
          <div style={{ position: "relative", minHeight: "350px" }}>
            <div
              className="dialog-overlay"
              style={{
                position: "relative",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                className="dialog-content"
                style={{
                  position: "relative",
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                <div className="dialog-header">
                  <h2>Add New Job</h2>
                  <button
                    className="btn-close"
                    disabled
                    style={{ cursor: "default" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <form className="dialog-form">
                  <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="jobName">Job Name *</label>
                    <div
                      className="annotation-highlight"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="text"
                        id="jobName"
                        name="jobName"
                        placeholder="Enter job name"
                        disabled
                        readOnly
                      />
                      <FeatureAnnotation
                        position="top"
                        text="Enter job/project name. Required field. Example: Project Alpha - Development"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="status">Status *</label>
                    <div
                      className="annotation-highlight"
                      style={{ position: "relative" }}
                    >
                      <select id="status" name="status" disabled>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <FeatureAnnotation
                        position="top"
                        text="Select job status: Active (currently working) or Inactive (completed/on hold). Required field."
                      />
                    </div>
                  </div>

                  <div
                    className="dialog-actions"
                    style={{ position: "relative" }}
                  >
                    <div style={{ position: "relative" }}>
                      <button
                        type="button"
                        className="btn-cancel annotation-highlight"
                        disabled
                        style={{ position: "relative", cursor: "default" }}
                      >
                        Cancel
                        <FeatureAnnotation
                          position="left"
                          text="Click to close dialog without saving. All entered data will be lost."
                        />
                      </button>
                    </div>
                    <div style={{ position: "relative" }}>
                      <button
                        type="submit"
                        className="btn-save annotation-highlight"
                        disabled
                        style={{ position: "relative", cursor: "default" }}
                      >
                        Add Job
                        <FeatureAnnotation
                          position="top"
                          text="Click to save new job. Validates all fields first. Job appears in table after saving."
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Delete Job Confirmation",
      description:
        "Delete confirmation dialog appears when you click the Delete button (🗑️) on any job. Confirm to permanently delete the job project.",
      route: "/jobs",
      features: [
        "Confirmation before deletion",
        "Shows job name being deleted",
        "Cancel or confirm action",
      ],
      ui: (
        <div className="help-ui-preview jobs-preview">
          <div style={{ position: "relative", minHeight: "300px" }}>
            <div
              className="dialog-overlay"
              style={{
                position: "relative",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                className="delete-dialog-content"
                style={{
                  position: "relative",
                  maxWidth: "400px",
                  width: "100%",
                }}
              >
                <div className="delete-dialog-header">
                  <div className="delete-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 6h18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h2>Delete Job</h2>
                </div>

                <div className="delete-dialog-body">
                  <p>
                    Are you sure you want to delete{" "}
                    <strong>Project Alpha - Development</strong>? This action
                    cannot be undone.
                  </p>
                </div>

                <div
                  className="delete-dialog-actions"
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      className="btn-cancel annotation-highlight"
                      disabled
                      style={{ position: "relative", cursor: "default" }}
                    >
                      Cancel
                      <FeatureAnnotation
                        position="left"
                        text="Click to cancel deletion. Dialog closes and job remains in the system."
                      />
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      className="btn-delete-confirm annotation-highlight"
                      disabled
                      style={{ position: "relative", cursor: "default" }}
                    >
                      Delete
                      <FeatureAnnotation
                        position="right"
                        text="Click to permanently delete job. Action cannot be undone. Job removed from table."
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const totalSteps = appFlowSteps.length;
  const currentStepData = appFlowSteps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="help-dialog-overlay" onClick={onClose}>
      <div className="help-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="help-dialog-header">
          <div className="help-dialog-title-section">
            <h2>App Flow Guide</h2>
            <span className="step-indicator">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <button className="btn-close" onClick={onClose} type="button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="help-dialog-body">
          <div className="flow-content">
            <div className="flow-ui-container">{currentStepData.ui}</div>

            <div className="flow-info">
              <h3>{currentStepData.title}</h3>
              <p className="flow-description">{currentStepData.description}</p>

              <div className="flow-features">
                <h4>Key Features:</h4>
                <ul>
                  {currentStepData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flow-route">
                <strong>Route:</strong> <code>{currentStepData.route}</code>
              </div>
            </div>
          </div>

          <div className="flow-progress">
            <div className="progress-dots">
              {appFlowSteps.map((_, index) => (
                <button
                  key={index}
                  className={`progress-dot ${
                    index === currentStep ? "active" : ""
                  }`}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="help-dialog-footer">
          <button
            className="btn-nav btn-prev"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </button>

          <button
            className="btn-nav btn-next"
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
          >
            Next
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
