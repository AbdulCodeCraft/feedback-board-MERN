import React from 'react';

const LoginForm = ({ username, setUsername, password, setPassword, handleSubmit, error }) => {
  return (
    <div className="w-full max-w-sm"> {/* This div was originally in LoginPage.jsx */}
      {/* CORRECTED: Heading text to white for contrast on transparent background */}
      <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-center drop-shadow-md">Login (User / Admin)</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div>
          {/* CORRECTED: Label text to white for contrast on transparent background */}
          <label htmlFor="username" className="block text-black text-sm font-semibold mb-2 drop-shadow-sm">
            Username:
          </label>
          <input
            type="text"
            id="username"
            // CORRECTED: Input background to bg-white opacity 30 for better visibility.
            // Text color changed to black to contrast with the input background itself.
            className="w-full p-3 rounded-lg bg-black bg-opacity-30 border border-white border-opacity-40  placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          {/* CORRECTED: Label text to white for contrast on transparent background */}
          <label htmlFor="password" className="block text-black text-sm font-semibold mb-2 drop-shadow-sm">
            Password:
          </label>
          <input
            type="password"
            id="password"
            // CORRECTED: Input background to bg-white opacity 30 for better visibility.
            // Text color changed to black to contrast with the input background itself.
            className="w-full p-3 rounded-lg bg-black bg-opacity-30 border border-white border-opacity-40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-xl transition duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;