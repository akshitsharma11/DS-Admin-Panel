import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export function Dropdown({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select...',
  icon,
  className = '',
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`dropdown ${className} ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
      <button 
        className="dropdown-trigger"
        onClick={() => !disabled && options.length > 0 && setIsOpen(!isOpen)}
        type="button"
        disabled={disabled || options.length === 0}
      >
        {icon && <span className="dropdown-icon">{icon}</span>}
        <span className="dropdown-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <button
              key={option.value}
              className={`dropdown-item ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

