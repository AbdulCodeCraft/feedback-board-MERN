import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const HomePage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // NEW: State for status filter
  const [filterCategory, setFilterCategory] = useState(''); // NEW: State for category filter
  const [sortBy, setSortBy] = useState('createdAt'); // NEW: State for sort field
  const [sortOrder, setSortOrder] = useState('desc'); // NEW: State for sort order (desc/asc)

  const categories = ['Feature', 'Bug', 'UI', 'Other']; // Matches backend categories
  const statuses = ['Open', 'Planned', 'In Progress', 'Done']; // Matches backend statuses

  // Modified: fetchFeedbacks to accept filters and sort params
  const fetchFeedbacks = useCallback(async (query = '', status = '', category = '', sortByField = 'createdAt', sortOrderField = 'desc') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/feedbacks`, {
        params: {
          q: query,
          status: status,
          category: category,
          sortBy: sortByField,
          sortOrder: sortOrderField
        }
      });
      setFeedbacks(response.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setError("Failed to load feedbacks. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpvote = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/feedbacks/${id}/upvote`);
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(feedback =>
          feedback._id === id ? { ...feedback, upvotes: response.data.upvotes } : feedback
        )
      );
    } catch (err) {
      console.error("Error upvoting feedback:", err);
      alert("Failed to upvote. Please try again.");
    }
  };

  // NEW: useEffect to trigger data fetch when filters/sort/search change
  useEffect(() => {
    const handler = setTimeout(() => {
        fetchFeedbacks(searchQuery, filterStatus, filterCategory, sortBy, sortOrder);
    }, 300); // Debounce delay for search/filters/sort

    return () => {
        clearTimeout(handler);
    };
  }, [searchQuery, filterStatus, filterCategory, sortBy, sortOrder, fetchFeedbacks]);


  if (loading) {
    return (
      <div className="w-screen h-screenx flex items-center justify-center text-xl text-gray-700">
        Loading feedbacks...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-xl text-red-600">Error: {error}</div>;
  }

  return (
    <div className="w-screen h-screen mx-auto p-8"> {/* Using max-w-screen-xl for wider content */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Product Feedback Board</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/3 text-black">
            <input
                type="text"
                placeholder="Search feedbacks..."
                className="w-full p-2 pl-10 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </div>

        {/* Filter and Sort Dropdowns */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-2/3 justify-end">
            {/* Status Filter */}
            <select
              className="p-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Category Filter */}
            <select
              className="p-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Sort By */}
            <select
              className="p-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Sort by Newest</option>
              <option value="upvotes">Sort by Upvotes</option>
            </select>

            {/* Sort Order */}
            {sortBy !== 'createdAt' && ( // Only show sort order if not default 'newest'
                <select
                    className="p-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            )}
        </div>

        {/* Submit New Feedback Button */}
        <Link to="/submit" className="bg-gray-800 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ml-0 sm:ml-4 mt-4 sm:mt-0 w-full sm:w-auto text-center">
          Submit New Feedback
        </Link>
      </div>


      {feedbacks.length === 0 && !loading ? (
        <div className="text-center p-8 text-gray-600 text-lg">
            {searchQuery || filterStatus || filterCategory ? "No feedbacks found matching your criteria." : "No feedback items yet. Be the first to suggest something!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => (
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
                  onClick={() => handleUpvote(feedback._id)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;