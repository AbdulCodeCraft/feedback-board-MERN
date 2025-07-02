import React from 'react';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="text-gray-600">No comments yet. Be the first to add one!</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-gray-800 mb-1">{comment.content}</p>
          <p className="text-gray-500 text-xs">
            Posted on {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;