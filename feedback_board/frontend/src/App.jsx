import { Routes, Route, Link, Navigate } from 'react-router-dom'; // NEW: Import Navigate
import HomePage from './pages/HomePage';
import SubmitFeedbackPage from './pages/SubmitFeedbackPage';
import FeedbackDetailPage from './pages/FeedbackDetailPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Basic Navigation (Header) */}
      <nav className="bg-white shadow-md p-4">
        <ul className="flex justify-center space-x-4">
          {isAuthenticated && ( // Only show Home link if authenticated
            <li><Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">Home</Link></li>
          )}
          {isAuthenticated && ( // Only show Submit Feedback link if authenticated
            <li><Link to="/submit" className="text-blue-600 hover:text-blue-800 font-semibold">Submit Feedback</Link></li>
          )}
          {!isAuthenticated ? ( // Show Login if not authenticated
            <li><Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">Login</Link></li>
          ) : ( // Show Logout if authenticated
            <li>
              <button
                onClick={logout}
                className="text-blue-600 hover:text-blue-800 font-semibold bg-transparent border-none cursor-pointer p-0"
              >
                Logout ({userRole})
              </button>
            </li>
          )}
        </ul>
      </nav>

      <main className="w-full px-4 sm:px-6 lg:px-8">
        <Routes>
          {/* Route for the Login Page - accessible by anyone */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes: All other routes require authentication */}
          {/* This means if not authenticated, accessing / will redirect to /login */}
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/submit"
            element={isAuthenticated ? <SubmitFeedbackPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/feedbacks/:id"
            element={isAuthenticated ? <FeedbackDetailPage /> : <Navigate to="/login" />}
          />

          {/* Fallback for any unmatched paths (optional) */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;