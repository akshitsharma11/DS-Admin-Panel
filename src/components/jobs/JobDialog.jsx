import { useState, useEffect } from 'react';
import './JobDialog.css';

export function JobDialog({ job, mode, onClose, onSave }) {
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

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{mode === 'add' ? 'Add New Job' : 'Edit Job'}</h2>
          <button className="btn-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="form-group">
            <label htmlFor="jobName">Job Name *</label>
            <input
              type="text"
              id="jobName"
              name="jobName"
              value={formData.jobName}
              onChange={handleChange}
              required
              placeholder="Enter job name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="dialog-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {mode === 'add' ? 'Add Job' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

