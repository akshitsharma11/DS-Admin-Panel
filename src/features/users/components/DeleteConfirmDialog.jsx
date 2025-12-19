import { DeleteDialog } from '../../../components/ui/DeleteDialog';
import './DeleteConfirmDialog.css';

export function DeleteConfirmDialog({ user, onClose, onConfirm }) {
  if (!user) return null;

  return (
    <DeleteDialog
      title="Delete User"
      message={
        <>
          Are you sure you want to delete <strong>{user.fullName}</strong>? This action cannot be undone.
        </>
      }
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

