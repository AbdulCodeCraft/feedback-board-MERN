import { Routes, Route, Link } from 'react-router-dom';

// Import your page components (ensure these paths and import syntaxes are correct)
import HomePage from './pages/HomePage'; // Correct: default import, path relative to src/
import SubmitFeedbackPage from './pages/SubmitFeedbackPage'; // Correct: default import, path relative to src/
import FeedbackDetailPage from './pages/FeedbackDetailPage'; // Correct: default import, path relative to src/

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Basic Navigation (Header) */}
      <nav className="bg-white shadow-md p-4">
        <ul className="flex justify-center space-x-4">
          <li><Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">Home</Link></li>
          <li><Link to="/submit" className="text-blue-600 hover:text-blue-800 font-semibold">Submit Feedback</Link></li>
          {/* Add login/logout links here later when implementing auth */}
        </ul>
      </nav>

      <main className="min-h-screen bg-gray-100 font-sans">
        {/* Define your routes */}
        <Routes>
          {/* Route for the Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Route for the Submit Feedback Page */}
          <Route path="/submit" element={<SubmitFeedbackPage />} />

          {/* Route for the Feedback Detail Page, with a dynamic ID parameter */}
          <Route path="/feedbacks/:id" element={<FeedbackDetailPage />} />

          {/* You can add more routes here as your app grows */}
        </Routes>
      </main>
    </div>
  );
}

export default App;