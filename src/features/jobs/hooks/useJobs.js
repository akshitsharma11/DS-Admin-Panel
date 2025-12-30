import { useState, useMemo, useEffect } from "react";
import { jobsApi } from "../api/jobs.api";
import { useSnackbar } from "../../../contexts/SnackbarContext";

/**
 * Hook for managing jobs data and operations
 */
export function useJobs() {
  const { success, error: showError } = useSnackbar();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // 'add' or 'edit'

  // Fetch jobs from API on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const jobsData = await jobsApi.getJobs();
        // Map API response to table format
        const mappedJobs = jobsData.map((job) => ({
          _id: job._id,
          jobName: job.jobName || "",
          jobId: job.jobId || "",
          status: job.active ? "Active" : "Inactive",
          active: job.active || false,
        }));
        setJobs(mappedJobs);
      } catch (err) {
        const errorMessage =
          err.response?.data?.description ||
          err.message ||
          "Failed to fetch jobs";
        showError(errorMessage);
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [showError]);

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
    setDialogMode("add");
    setIsDialogOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleSaveJob = async (jobData) => {
    setIsSaving(true);
    try {
      if (dialogMode === "add") {
        // Add new job
        // Map form data to API format
        const apiData = {
          jobName: jobData.jobName,
        };

        await jobsApi.createJob(apiData);

        // Refresh jobs list
        const jobsData = await jobsApi.getJobs();
        const mappedJobs = jobsData.map((job) => ({
          _id: job._id,
          jobName: job.jobName || "",
          jobId: job.jobId || "",
          status: job.active ? "Active" : "Inactive",
          active: job.active || false,
        }));
        setJobs(mappedJobs);
        success("Job created successfully");
      } else {
        // Update existing job
        // Map form data to API format
        const apiData = {
          jobName: jobData.jobName,
          jobId: selectedJob.jobId, // jobId from selected job (not editable)
          active: jobData.status === "Active" ? "true" : "false", // Convert to string
        };

        await jobsApi.updateJob(apiData);

        // Refresh jobs list
        const jobsData = await jobsApi.getJobs();
        const mappedJobs = jobsData.map((job) => ({
          _id: job._id,
          jobName: job.jobName || "",
          jobId: job.jobId || "",
          status: job.active ? "Active" : "Inactive",
          active: job.active || false,
        }));
        setJobs(mappedJobs);
        success("Job updated successfully");
      }
      setIsDialogOpen(false);
      setSelectedJob(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.description || err.message || "Failed to save job";
      showError(errorMessage);
      console.error("Error saving job:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedJob(null);
  };

  return {
    jobs: filteredJobs,
    isLoading,
    isSaving,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    selectedJob,
    dialogMode,
    handleAddJob,
    handleEditJob,
    handleSaveJob,
    closeDialog,
  };
}
