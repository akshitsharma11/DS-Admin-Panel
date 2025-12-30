import './JobTable.css';
import { TableLoader } from '../../../components/ui/Loader';

export function JobTable({ jobs, onEdit, isLoading }) {
  const getStatusBadgeClass = (status) => {
    return status === 'Active' ? 'badge-status-active' : 'badge-status-inactive';
  };

  if (isLoading) {
    return <TableLoader text="Loading jobs..." />;
  }

  return (
    <div className="job-table-container">
      <div className="job-table-wrapper">
        <table className="job-table">
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty-state">
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.jobName || '-'}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(job.status)}`}>
                      {job.status || 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => onEdit(job)}
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

