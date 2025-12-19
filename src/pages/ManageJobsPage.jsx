import './ManageJobsPage.css';
import { useJobs, JobTable, JobDialog, DeleteJobDialog } from '../features/jobs';

export function ManageJobsPage() {
  const {
    jobs,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    isDeleteDialogOpen,
    selectedJob,
    dialogMode,
    handleAddJob,
    handleEditJob,
    handleDeleteJob,
    handleSaveJob,
    handleConfirmDelete,
    closeDialog,
    closeDeleteDialog,
  } = useJobs();

  return (
    <div className="manage-jobs-page">
      <div className="page-header-single-line">
        <h1 className="page-title">Job Management</h1>
        <div className="header-right-section">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search jobs by name or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-add-job" onClick={handleAddJob}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Add New Job</span>
          </button>
        </div>
      </div>

      <div className="table-section">
        <JobTable
          jobs={jobs}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />
      </div>

      {isDialogOpen && (
        <JobDialog
          job={selectedJob}
          mode={dialogMode}
          onClose={closeDialog}
          onSave={handleSaveJob}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteJobDialog
          job={selectedJob}
          onClose={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
