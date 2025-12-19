import { DeleteDialog } from '../../../components/ui/DeleteDialog';
import './DeleteJobDialog.css';

export function DeleteJobDialog({ job, onClose, onConfirm }) {
  if (!job) return null;

  return (
    <DeleteDialog
      title="Delete Job"
      message={
        <>
          Are you sure you want to delete <strong>{job.jobName}</strong>? This action cannot be undone.
        </>
      }
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

