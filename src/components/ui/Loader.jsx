import './Loader.css';

/**
 * Loader Component
 * 3-dot animated loader with multiple variants
 */
export function Loader({ 
  size = 'medium', 
  text, 
  variant = 'default',
  className = '' 
}) {
  const sizeClass = size === 'small' ? 'loader-small' : size === 'large' ? 'loader-large' : '';
  const variantClass = variant === 'inline' ? 'loader-inline' : variant === 'full-page' ? 'loader-full-page' : variant === 'table' ? 'loader-table' : '';
  
  const containerClass = variant === 'inline' 
    ? `loader-inline ${className}` 
    : variant === 'full-page'
    ? `loader-full-page ${className}`
    : variant === 'table'
    ? `loader-container loader-table ${className}`
    : `loader-container ${className}`;

  return (
    <div className={containerClass}>
      <div className="loader-wrapper">
        <div className={`loader ${sizeClass}`}>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
        {text && <div className="loader-text">{text}</div>}
      </div>
    </div>
  );
}

/**
 * Inline Loader - for buttons and inline content
 */
export function InlineLoader({ text, className = '' }) {
  return <Loader variant="inline" text={text} className={className} />;
}

/**
 * Full Page Loader - for page-level loading
 */
export function FullPageLoader({ text = 'Loading...', className = '' }) {
  return <Loader variant="full-page" text={text} size="large" className={className} />;
}

/**
 * Table Loader - for table loading states
 */
export function TableLoader({ text, className = '' }) {
  return <Loader variant="table" text={text} className={className} />;
}

