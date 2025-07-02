import { Routes, Route, Navigate } from "react-router-dom"; // Removed Link from here
import HomePage from "./pages/HomePage";
import SubmitFeedbackPage from "./pages/SubmitFeedbackPage";
import FeedbackDetailPage from "./pages/FeedbackDetailPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";
import Navbar from "./layouts/Navbar"; // NEW: Import the Navbar component

function App() {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 font-sans overflow-x-hidden"> {/* Added overflow-x-hidden */}
      {/* Basic Navigation (Header) - Now a separate component */}
      {isAuthenticated && ( // Navbar only renders if authenticated
        <Navbar
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          logout={logout}
        />
      )}

      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/submit"
            element={
              isAuthenticated ? (
                <SubmitFeedbackPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/feedbacks/:id"
            element={
              isAuthenticated ? (
                <FeedbackDetailPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;