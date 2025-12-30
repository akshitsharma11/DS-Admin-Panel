import { useState, useEffect } from 'react';
import { FormDialog } from '../../../components/ui/FormDialog';
import './JobDialog.css';

export function JobDialog({ job, mode, onClose, onSave, isLoading = false }) {
  const [formData, setFormData] = useState({
    jobName: '',
    status: 'Active',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        jobName: job.jobName || '',
        status: job.status || 'Active',
      });
    } else {
      setFormData({
        jobName: '',
        status: 'Active',
      });
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formFields = [
    {
      type: 'text',
      id: 'jobName',
      name: 'jobName',
      label: 'Job Name *',
      value: formData.jobName,
      placeholder: 'Enter job name',
      required: true,
    },
    ...(mode === 'edit' ? [
      {
        type: 'select',
        id: 'status',
        name: 'status',
        label: 'Status *',
        value: formData.status,
        required: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ],
      },
    ] : []),
  ];

  return (
    <FormDialog
      title={mode === 'add' ? 'Add New Job' : 'Edit Job'}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel={mode === 'add' ? 'Add Job' : 'Save Changes'}
      formFields={formFields}
      onChange={handleChange}
      isLoading={isLoading}
    />
  );
}

