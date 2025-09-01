import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeedbackDetailDisplay from '../components/FeedbackDetailDisplay';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import AlertMessage from '../components/AlertMessage'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const FeedbackDetailPage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // General page error
  const [commentError, setCommentError] = useState(null); // Specific error for comments form
  const [commentLoading, setCommentLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';

  const allowedStatuses = ['Open', 'Planned', 'In Progress', 'Done'];

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

  // Handle Status Change (Admin only)
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (!isAdmin || newStatus === feedback.status) return;

    setStatusUpdating(true);
    try {
      const response = await axios.patch(`${API_BASE_URL}/feedbacks/${id}/status`, { status: newStatus });
      setFeedback(prevFeedback => ({ ...prevFeedback, status: response.data.status }));
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

  // Render Logic (Conditional Rendering for Loading/Error/No Feedback) 
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-xl text-gray-700">
        Loading feedback details...
      </div>
    );
  }

  if (error) {
    return <AlertMessage type="error" message={error} />; 
  }

  if (!feedback) {
    return <div className="text-center p-8 text-xl text-gray-700">Feedback details not available.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"> 
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to all feedbacks</Link>

      
      <FeedbackDetailDisplay
        feedback={feedback}
        isAdmin={isAdmin}
        allowedStatuses={allowedStatuses}
        handleStatusChange={handleStatusChange}
        statusUpdating={statusUpdating}
      />

      {/* Comments Section */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments ({comments.length})</h2>

       \
        <CommentForm
          newCommentContent={newCommentContent}
          setNewCommentContent={setNewCommentContent}
          handleAddComment={handleAddComment}
          commentLoading={commentLoading}
          commentError={commentError}
        />

        
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default FeedbackDetailPage;