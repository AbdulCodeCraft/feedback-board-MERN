import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackCard = ({ feedback, onUpvote }) => {
  return (
    <div key={feedback._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{feedback.title}</h2>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{feedback.description}</p>
        <div className="flex items-center text-sm text-gray-600 mb-4 space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            feedback.category === 'Feature' ? 'bg-green-100 text-green-800' :
            feedback.category === 'Bug' ? 'bg-red-100 text-red-800' :
            feedback.category === 'UI' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {feedback.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            feedback.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
            feedback.status === 'Planned' ? 'bg-purple-100 text-purple-800' :
            feedback.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
            feedback.status === 'Done' ? 'bg-gray-200 text-gray-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {feedback.status}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center text-gray-800 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H2z" />
          </svg>
          {feedback.upvotes} Upvotes
        </div>
        <button
          className="bg-gray-900 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-full text-sm transition duration-300 shadow-sm"
          onClick={() => onUpvote(feedback._id)}
        >
          Upvote
        </button>
      </div>
      <Link
        to={`/feedbacks/${feedback._id}`}
        className="mt-4 text-blue-500 hover:underline text-sm text-right block"
      >
        View Details
      </Link>
    </div>
  );
};

export default FeedbackCard;