import './UserTable.css';
import { TableLoader } from '../../../components/ui/Loader';

export function UserTable({ users, onEdit, isLoading }) {
  const getRoleBadgeClass = (role) => {
    const roleLower = role?.toLowerCase() || '';
    if (roleLower.includes('manager')) return 'badge-role-manager';
    if (roleLower.includes('developer') || roleLower.includes('designer')) return 'badge-role-employee';
    return 'badge-role-employee';
  };

  const getStatusBadgeClass = (status) => {
    const statusUpper = status?.toUpperCase() || '';
    return statusUpper === 'ACTIVE' ? 'badge-status-active' : 'badge-status-inactive';
  };

  const formatStatus = (status) => {
    if (!status) return 'INACTIVE';
    return status.toUpperCase() === 'ACTIVE' ? 'Active' : 'Inactive';
  };

  if (isLoading) {
    return <TableLoader text="Loading users..." />;
  }

  return (
    <div className="user-table-container">
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Short Name</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Hourly Rate ($)</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.shortName || '-'}</td>
                  <td>{user.fullName || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>${user.hourlyRate || 0}</td>
                  <td>
                    <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                      {user.role || '-'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(user.status)}`}>
                      {formatStatus(user.status)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => onEdit(user)}
                        title="Edit"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

