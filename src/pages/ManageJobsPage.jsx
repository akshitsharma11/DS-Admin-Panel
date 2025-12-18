import { useState } from 'react';
import './ManageJobsPage.css';
import { JobTable } from '../components/jobs/JobTable';
import { JobDialog } from '../components/jobs/JobDialog';
import { DeleteJobDialog } from '../components/jobs/DeleteJobDialog';

// Mock job data - in real app, fetch from API
const initialJobs = [
  {
    id: 1,
    jobName: 'Project Alpha - Development',
    status: 'Active',
  },
  {
    id: 2,
    jobName: 'Project Beta - Testing',
    status: 'Active',
  },
  {
    id: 3,
    jobName: 'Project Gamma - Design',
    status: 'Inactive',
  },
  {
    id: 4,
    jobName: 'Client Portal - Maintenance',
    status: 'Active',
  },
  {
    id: 5,
    jobName: 'Internal Tools - Upgrade',
    status: 'Inactive',
  },
];

export function ManageJobsPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.jobName.toLowerCase().includes(query) ||
      job.status.toLowerCase().includes(query)
    );
  });

  const handleAddJob = () => {
    setSelectedJob(null);
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleDeleteJob = (job) => {
    setSelectedJob(job);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveJob = (jobData) => {
    if (dialogMode === 'add') {
      // Add new job
      const newJob = {
        ...jobData,
        id: jobs.length + 1,
      };
      setJobs([...jobs, newJob]);
    } else {
      // Update existing job
      setJobs(
        jobs.map((job) =>
          job.id === selectedJob.id ? { ...job, ...jobData } : job
        )
      );
    }
    setIsDialogOpen(false);
    setSelectedJob(null);
  };

  const handleConfirmDelete = () => {
    setJobs(jobs.filter((job) => job.id !== selectedJob.id));
    setIsDeleteDialogOpen(false);
    setSelectedJob(null);
  };

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
          jobs={filteredJobs}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />
      </div>

      {isDialogOpen && (
        <JobDialog
          job={selectedJob}
          mode={dialogMode}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedJob(null);
          }}
          onSave={handleSaveJob}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteJobDialog
          job={selectedJob}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedJob(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
