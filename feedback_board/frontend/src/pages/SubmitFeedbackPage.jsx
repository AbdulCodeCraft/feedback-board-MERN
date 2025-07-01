import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import the SVG image
import FeedbackIllustration from '../assets/feedback_illustration.svg'; // Correct path to your SVG
import feedbackVector from '../assets/feedback_vector.svg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const SubmitFeedbackPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Feature');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const categories = ['Feature', 'Bug', 'UI', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!title.trim() || !description.trim() || !category) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const newFeedback = { title, description, category };
      const response = await axios.post(`${API_BASE_URL}/feedbacks`, newFeedback);
      setSuccess('Feedback submitted successfully!');
      console.log('Feedback submitted:', response.data);

      setTitle('');
      setDescription('');
      setCategory('Feature');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Outer container for the entire page, takes full screen height, uses flex for layout
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-2 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">

        {/* Left Section: Image / Illustration */}
        <div className="lg:w-1/2 p-8 flex items-center justify-center bg-blue-50">
          <img
            src={feedbackVector} // Use the imported SVG variable here
            alt="Description of your image" // Always add descriptive alt text for accessibility
            className="max-w-xs md:max-w-sm lg:max-w-full h-auto"
          />
        </div>

        {/* Right Section: Form */}
        <div className="lg:w-1/2 p-8 sm:p-10 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Submit New Feedback</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline ml-2">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={loading}
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={loading}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedbackPage;