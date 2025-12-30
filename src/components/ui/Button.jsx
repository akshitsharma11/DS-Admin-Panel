import { InlineLoader } from './Loader';
import './Button.css';

/**
 * Button Component with Loading State
 * Shows progress indicator when loading
 */
export function Button({
  children,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${isLoading ? 'btn-loading' : ''} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <InlineLoader />
          <span className="btn-loading-text">Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

