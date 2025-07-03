import React from 'react';

const AlertMessage = ({ type, message }) => {
  if (!message) return null;

  const baseClasses = "px-4 py-3 rounded relative mb-4";
  let specificClasses = '';
  let icon = ''; // Optional

  switch (type) {
    case 'success':
      specificClasses = 'bg-green-100 border border-green-400 text-green-700';
      icon = '✔'; // Placeholder
      break;
    case 'error':
      specificClasses = 'bg-red-100 border border-red-400 text-red-700';
      icon = '✖'; // Placeholder
      break;
    case 'info':
      specificClasses = 'bg-blue-100 border border-blue-400 text-blue-700';
      icon = 'ℹ'; // Placeholder
      break;
    default:
      specificClasses = 'bg-gray-100 border border-gray-400 text-gray-700';
      icon = '';
  }

  return (
    <div className={`${baseClasses} ${specificClasses}`} role="alert">
      <strong className="font-bold mr-2">{icon}</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default AlertMessage;