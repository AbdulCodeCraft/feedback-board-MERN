import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Removed Link import as it's now in FeedbackCard and FilterSortControls
import FeedbackCard from '../components/FeedbackCard';
import FilterSortControls from '../components/FilterSortControls'; // Now fully self-contained

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
  // Removed: const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // This state is now internal to FilterSortControls

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
    // This div needs to be consistent with overall layout.
    // Assuming 'w-full px-4 sm:px-6 lg:px-8 py-4' for its desktop look.
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Product Feedback Board</h1>

      {/* Filter and Sort Controls Component - no longer passes mobile menu state */}
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
        // Removed: isFilterMenuOpen={isFilterMenuOpen} setIsFilterMenuOpen={setIsFilterMenuOpen}
      />

      {/* REMOVED: Mobile Filter Menu conditional rendering from here */}

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