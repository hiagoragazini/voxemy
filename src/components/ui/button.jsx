import React from 'react';

export const Button = ({ 
  children, 
  className = "", 
  disabled = false, 
  type = "button",
  ...props 
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 
disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
