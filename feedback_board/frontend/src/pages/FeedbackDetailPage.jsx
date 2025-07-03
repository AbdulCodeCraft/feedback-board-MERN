import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const FeedbackDetailPage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false); 

  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin'; 

  const allowedStatuses = ['Open', 'Planned', 'In Progress', 'Done']; // Matches backend schema enum

  //Fetch Feedback Details
  const fetchFeedbackDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/feedbacks/${id}`);
      setFeedback(response.data);
    } catch (err) {
      console.error("Error fetching feedback details:", err);
      setError(err.response?.data?.message || "Failed to load feedback details. It might not exist.");
      setFeedback(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Comments for this Feedback
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/feedbacks/${id}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Handle New Comment Submission
  const handleAddComment = async (e) => {
    e.preventDefault();
    setCommentError(null);
    setCommentLoading(true);

    if (!newCommentContent.trim()) {
      setCommentError("Comment cannot be empty.");
      setCommentLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/feedbacks/${id}/comments`, {
        content: newCommentContent
      });
      setComments(prevComments => [...prevComments, response.data]);
      setNewCommentContent('');
    } catch (err) {
      console.error("Error adding comment:", err);
      setCommentError(err.response?.data?.message || "Failed to add comment.");
    } finally {
      setCommentLoading(false);
    }
  };

  // NEW: Handle Status Change (Admin only)
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (!isAdmin || newStatus === feedback.status) return; // Only allow if admin and status is actually changing

    setStatusUpdating(true); // Indicate loading for status update
    try {
      const response = await axios.patch(`${API_BASE_URL}/feedbacks/${id}/status`, { status: newStatus });
      setFeedback(prevFeedback => ({ ...prevFeedback, status: response.data.status })); // Update local state
      alert('Feedback status updated successfully!');
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setStatusUpdating(false);
    }
  };


  // useEffect Hook to Trigger Data Fetching 
  useEffect(() => {
    if (id) {
        fetchFeedbackDetails();
        fetchComments();
    }
  }, [id]);

  
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-xl text-gray-700">
        Loading feedback details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-xl text-red-600">Error: {error}</div>;
  }

  if (!feedback) {
    return <div className="text-center p-8 text-xl text-gray-700">Feedback details not available.</div>;
  }

  //Main Render for Feedback Details and Comments
  return (
    <div className="w-screen h-screen bg-white p-8 rounded-lg shadow-lg">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to all feedbacks</Link>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">{feedback.title}</h1>
      <p className="text-gray-700 text-lg mb-6">{feedback.description}</p>

      <div className="flex items-center text-sm text-gray-600 mb-4 space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            feedback.category === 'Feature' ? 'bg-green-100 text-green-800' :
            feedback.category === 'Bug' ? 'bg-red-100 text-red-800' :
            feedback.category === 'UI' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
        }`}>
          {feedback.category}
        </span>

        {/* Status Display / Admin Status Changer */}
        {isAdmin ? ( // Conditionally render dropdown for admin
          <select
            className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={feedback.status}
            onChange={handleStatusChange}
            disabled={statusUpdating}
          >
            {allowedStatuses.map(statusOption => (
              <option key={statusOption} value={statusOption}>
                {statusOption} {statusUpdating && statusOption === feedback.status ? '(Updating...)' : ''}
              </option>
            ))}
          </select>
        ) : ( // Normal status display for non-admin
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            feedback.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
            feedback.status === 'Planned' ? 'bg-purple-100 text-purple-800' :
            feedback.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
            feedback.status === 'Done' ? 'bg-gray-200 text-gray-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {feedback.status}
          </span>
        )}
      </div>

      <div className="flex items-center text-gray-800 font-medium mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H2z" />
        </svg>
        {feedback.upvotes} Upvotes
      </div>

      {/* Comments Section */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments ({comments.length})</h2>

        {commentError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{commentError}</span>
          </div>
        )}

        {/* New Comment Form */}
        {/* You might want to wrap this in isAuthenticated check as well */}
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
        </form>

        {/* List of Comments */}
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet. Be the first to add one!</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default FeedbackDetailPage;