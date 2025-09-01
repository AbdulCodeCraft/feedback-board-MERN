import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

const FilterSortControls = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  categories,
  statuses,
  
}) => {
  
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4 relative w-full"> {/* Added w-full */}

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

      {/* Filter/Sort Toggle Button for Mobile */}
      <div className="sm:hidden w-full">
        <button
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          <span>{isFilterMenuOpen ? 'Hide Filters' : 'Show Filters & Sort'}</span>
        </button>
      </div>

      {/* Desktop Filter/Sort Dropdowns (hidden on mobile) */}
      <div className="hidden sm:flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-2/3 justify-end">
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
          {sortBy !== 'createdAt' && (
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

      
      <Link to="/submit" className="bg-gray-800 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ml-0 sm:ml-4 mt-4 sm:mt-0 w-full sm:w-auto text-center">
        Submit New Feedback
      </Link>

      {/* Mobile Filter Menu  */}
      {isFilterMenuOpen && (
        
        <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-30 border-t border-gray-200">
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
    </div>
  );
};

export default FilterSortControls;