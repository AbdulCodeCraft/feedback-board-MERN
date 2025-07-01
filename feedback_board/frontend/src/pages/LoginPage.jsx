import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Effect to redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to homepage if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const result = login(username, password);

    if (result.success) {
      // useEffect will handle navigation
    } else {
      setError(result.message);
    }
  };

  return (
    // Main container: full screen, background image, flex to center content
    <div
      className="w-screen h-screen bg-[url('/images/landing_bg.jpg')] bg-cover bg-center flex items-center justify-center p-4 sm:p-6" // Adjusted padding for mobile
    >
      {/* Content wrapper: flex for left/right sections, responsive layout */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white border-opacity-20">

        {/* Left Section: Website Title and Description (Visible on all screens, stacks on mobile) */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-8 lg:w-1/2 text-white text-center bg-black bg-opacity-40"> {/* Adjusted padding */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg"> {/* Adjusted font size for mobile */}
            Product Feedback Board
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-md"> {/* Adjusted font size for mobile */}
            Your voice matters! Submit feature requests, report bugs, and upvote suggestions to help shape the future of our product.
          </p>
        </div>

        {/* Right Section: Login Form Container */}
        <div className="p-6 sm:p-8 lg:p-12 lg:w-1/2 flex items-center justify-center"> {/* Adjusted padding */}
          <div className="w-full max-w-sm"> {/* Inner container for form, to constrain its width */}
            {/* Changed text-black to text-white for better contrast on blurred background */}
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-center drop-shadow-md">Login (User / Admin)</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline ml-2">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6"> {/* Adjusted spacing */}
              <div>
                {/* Changed text-black to text-white for labels */}
                <label htmlFor="username" className="block text-black text-sm font-semibold mb-2 drop-shadow-sm">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  // Adjusted input background to be slightly less opaque for better contrast on mobile
                  className="w-full p-3 rounded-lg bg-black  bg-opacity-30 border border-white border-opacity-40 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                {/* Changed text-black to text-white for labels */}
                <label htmlFor="password" className="block text-black  text-sm font-semibold mb-2 drop-shadow-sm">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  // Adjusted input background to be slightly less opaque for better contrast on mobile
                  className="w-full p-3 rounded-lg bg-black  bg-opacity-30 border border-white border-opacity-40 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white   font-bold py-3 px-4 rounded-lg shadow-xl transition duration-1000 transform hover:scale-105"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;