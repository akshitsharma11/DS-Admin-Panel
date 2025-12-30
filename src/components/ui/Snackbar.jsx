import { useEffect, useState } from 'react';
import './Snackbar.css';

/**
 * Snackbar Component
 * Displays toast notifications at the top right corner
 */
export function Snackbar({ id, type, title, message, duration = 5000, onClose }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match animation duration
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="snackbar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="rgba(255, 255, 255, 0.2)" />
            <path d="M8 12l2.5 2.5 5.5-5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'error':
        return (
          <svg className="snackbar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="rgba(255, 255, 255, 0.2)" />
            <path d="M12 8v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="snackbar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2.5" fill="rgba(255, 255, 255, 0.2)" strokeLinejoin="round" />
            <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg className="snackbar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="rgba(255, 255, 255, 0.2)" />
            <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="8" r="1" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <div className={`snackbar ${type} ${isExiting ? 'exiting' : ''}`}>
      {getIcon()}
      <div className="snackbar-content">
        {title && <div className="snackbar-title">{title}</div>}
        {message && <div className="snackbar-message">{message}</div>}
      </div>
      <button className="snackbar-close" onClick={handleClose} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Snackbar Container Component
 * Manages multiple snackbars
 */
export function SnackbarContainer({ snackbars, onClose }) {
  return (
    <div className="snackbar-container">
      {snackbars.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          id={snackbar.id}
          type={snackbar.type}
          title={snackbar.title}
          message={snackbar.message}
          duration={snackbar.duration}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

