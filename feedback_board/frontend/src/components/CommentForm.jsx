import React from 'react';
import AlertMessage from './AlertMessage'; 

const CommentForm = ({ newCommentContent, setNewCommentContent, handleAddComment, commentLoading, commentError }) => {
  return (
    <form onSubmit={handleAddComment} className="mb-6">
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 mb-3"
        rows="3"
        placeholder="Write a comment..."
        value={newCommentContent}
        onChange={(e) => setNewCommentContent(e.target.value)}
        disabled={commentLoading}
      ></textarea>
      <button
        type="submit"
        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ${commentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={commentLoading}
      >
        {commentLoading ? 'Posting...' : 'Post Comment'}
      </button>
      <AlertMessage type="error" message={commentError} /> 
    </form>
  );
};

export default CommentForm;