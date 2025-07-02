import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Removed Link import as it's now in FeedbackCard and FilterSortControls
import FeedbackCard from '../components/FeedbackCard'; // NEW: Import FeedbackCard
import FilterSortControls from '../components/FilterSortControls'; // NEW: Import FilterSortControls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const HomePage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // State for mobile filter menu

  const categories = ['Feature', 'Bug', 'UI', 'Other'];
  const statuses = ['Open', 'Planned', 'In Progress', 'Done'];

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

  useEffect(() => {
    const handler = setTimeout(() => {
        fetchFeedbacks(searchQuery, filterStatus, filterCategory, sortBy, sortOrder);
        // Optional: Close filter menu after applying filters if on mobile
        // This was in the previous version, but might be better handled by the component itself
        // if (isFilterMenuOpen) {
        //   setIsFilterMenuOpen(false);
        // }
    }, 300);

    return () => {
        clearTimeout(handler);
    };
  }, [searchQuery, filterStatus, filterCategory, sortBy, sortOrder, fetchFeedbacks]);


  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-xl text-gray-700">
        Loading feedbacks...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-xl text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Product Feedback Board</h1>

      {/* Filter and Sort Controls Component */}
      <FilterSortControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        categories={categories}
        statuses={statuses}
        isFilterMenuOpen={isFilterMenuOpen}
        setIsFilterMenuOpen={setIsFilterMenuOpen}
      />

      {/* Mobile Filter Menu (conditionally rendered and styled) - moved here from FilterSortControls */}
      {isFilterMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-10 border-t border-gray-200">
          <div className="flex flex-col items-center space-y-4 px-4">
            {/* Status Filter */}
            <select
              className="p-2 border text-black border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Category Filter */}
            <select
              className="p-2 border text-black border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Sort By */}
            <select
              className="p-2 border text-black border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Sort by Newest</option>
              <option value="upvotes">Sort by Upvotes</option>
            </select>

            {/* Sort Order */}
            {sortBy !== 'createdAt' && (
                <select
                    className="p-2 border text-black border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            )}
          </div>
        </div>
      )}


      {feedbacks.length === 0 && !loading ? (
        <div className="text-center p-8 text-gray-600 text-lg">
            {searchQuery || filterStatus || filterCategory ? "No feedbacks found matching your criteria." : "No feedback items yet. Be the first to suggest something!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {feedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback._id}
              feedback={feedback}
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;  