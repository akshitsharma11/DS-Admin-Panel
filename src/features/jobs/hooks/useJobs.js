import { useState, useMemo } from 'react';
// import { jobsApi } from '../api/jobs.api';

/**
 * Hook for managing jobs data and operations
 * Currently uses mock data - replace with API calls when backend is ready
 */
export function useJobs() {
  // Mock data - in real app, fetch from API
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

  const [jobs, setJobs] = useState(initialJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    
    const query = searchQuery.toLowerCase();
    return jobs.filter((job) => {
      return (
        job.jobName.toLowerCase().includes(query) ||
        job.status.toLowerCase().includes(query)
      );
    });
  }, [jobs, searchQuery]);

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
      // TODO: Replace with API call
      // await jobsApi.createJob(newJob);
    } else {
      // Update existing job
      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id ? { ...job, ...jobData } : job
      );
      setJobs(updatedJobs);
      // TODO: Replace with API call
      // await jobsApi.updateJob(selectedJob.id, jobData);
    }
    setIsDialogOpen(false);
    setSelectedJob(null);
  };

  const handleConfirmDelete = () => {
    setJobs(jobs.filter((job) => job.id !== selectedJob.id));
    // TODO: Replace with API call
    // await jobsApi.deleteJob(selectedJob.id);
    setIsDeleteDialogOpen(false);
    setSelectedJob(null);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedJob(null);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedJob(null);
  };

  return {
    jobs: filteredJobs,
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
  };
}

