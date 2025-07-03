  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext'; //import custom hook
  import LoginForm from '../components/LoginForm'; 

  const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login, isAuthenticated } = useAuth(); //login function and isauthenticated status 
    const navigate = useNavigate(); //Initializes the Maps function from the useNavigate hook.

    // Effect to redirect if user is already authenticated
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/'); // Redirect to homepage if already logged in
      }
    }, [isAuthenticated, navigate]);  //runs when map changed or isAuthenticated is true

    const handleSubmit = (e) => {
      e.preventDefault();  //Prevents the default HTML form submission behavior, which would cause a full page reload.
      
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
        className="w-screen h-screen bg-[url('/images/landing_bg.jpg')] bg-cover bg-center flex items-center justify-center p-4 sm:p-6"
      >
        {/* Content wrapper: flex for left/right sections, responsive layout */}
        <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white/10 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white border-opacity-30">

          {/* Left Section: Website Title and Description (Visible on all screens, stacks on mobile) */}
          <div className="flex flex-col justify-center items-center p-6 sm:p-8 lg:w-1/2 text-white text-center bg-black bg-opacity-40">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
              Product Feedback Board
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-md">
              Your voice matters! Submit feature requests, report bugs, and upvote suggestions to help shape the future of our product.
            </p>
          </div>

          {/* Right Section: Login Form Container */}
          <div className="p-6 sm:p-8 lg:p-12 lg:w-1/2 flex items-center justify-center">
            {/* NEW: Render the LoginForm component, passing necessary props */}
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              error={error}
            />
          </div>
        </div>
      </div>
    );
  };

  export default LoginPage;