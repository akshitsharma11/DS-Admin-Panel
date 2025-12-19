import './FormDialog.css';

/**
 * Reusable Form Dialog Component
 * General purpose dialog for forms - code once, use everywhere
 */
export function FormDialog({
  title,
  onClose,
  onSubmit,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  formFields = [],
  onChange,
  children,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{title}</h2>
          <button className="btn-close" onClick={onClose} type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dialog-form">
          {children || formFields.map((field) => (
            <div key={field.id || field.name} className="form-group">
              <label htmlFor={field.id || field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={field.id || field.name}
                  name={field.name}
                  value={field.value || ''}
                  onChange={onChange}
                  required={field.required}
                  disabled={field.disabled}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  id={field.id || field.name}
                  name={field.name}
                  value={field.value || ''}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  disabled={field.disabled}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                />
              )}
            </div>
          ))}

          <div className="dialog-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              {cancelLabel}
            </button>
            <button type="submit" className="btn-save">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

