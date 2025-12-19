import './DeleteDialog.css';

/**
 * Reusable Delete Confirmation Dialog Component
 * General purpose delete dialog - code once, use everywhere
 */
export function DeleteDialog({
  title,
  message,
  onClose,
  onConfirm,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
}) {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="delete-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-dialog-header">
          <div className="delete-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>{title}</h2>
        </div>

        <div className="delete-dialog-body">
          <p>{message}</p>
        </div>

        <div className="delete-dialog-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            {cancelLabel}
          </button>
          <button type="button" className="btn-delete-confirm" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

