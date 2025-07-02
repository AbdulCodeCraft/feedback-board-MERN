import React from 'react';

const StatusCategoryTag = ({ type, value }) => { // type: 'category' or 'status', value: actual string
  let colorClasses = '';

  if (type === 'category') {
    switch (value) {
      case 'Feature':
        colorClasses = 'bg-green-100 text-green-800';
        break;
      case 'Bug':
        colorClasses = 'bg-red-100 text-red-800';
        break;
      case 'UI':
        colorClasses = 'bg-blue-100 text-blue-800';
        break;
      default:
        colorClasses = 'bg-gray-100 text-gray-800';
    }
  } else if (type === 'status') {
    switch (value) {
      case 'Open':
        colorClasses = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Planned':
        colorClasses = 'bg-purple-100 text-purple-800';
        break;
      case 'In Progress':
        colorClasses = 'bg-orange-100 text-orange-800';
        break;
      case 'Done':
        colorClasses = 'bg-gray-200 text-gray-800';
        break;
      default:
        colorClasses = 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClasses}`}>
      {value}
    </span>
  );
};

export default StatusCategoryTag;