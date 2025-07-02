import React, { useState } from 'react'; // useState is needed for mobile menu state
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userRole, logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define common button/link classes for uniformity
  const navLinkClasses =
    "px-4 py-2 rounded-md text-white hover:bg-blue-400 transition-colors duration-200 font-semibold text-sm";
  const loginLogoutBtnClasses =
    "px-4 py-2 rounded-md text-white hover:bg-blue-400 transition-colors duration-200 font-semibold text-sm cursor-pointer";
  const loginLinkClasses =
    "px-4 py-2 rounded-md text-white hover:bg-blue-400 transition-colors duration-200 font-semibold text-sm";

  // Function to close mobile menu after clicking a link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <> {/* Use a Fragment to return multiple elements */}
      <nav className="bg-blue-300 shadow-md h-16 px-6 flex justify-between items-center relative z-10">
        {/* Left Section: PFB Text */}
        <div className="!text-gray-900 font-extrabold text-lg sm:text-xl">PFB</div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-900 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            aria-label="Toggle menu"
          >
            {/* Hamburger SVG icon */}
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 01-1.414 1.414L12 13.414l-4.864 4.864a1 1 0 01-1.414-1.414L10.586 12 5.722 7.136a1 1 0 011.414-1.414L12 10.586l4.864-4.864a1 1 0 011.414 1.414L13.414 12l4.864 4.864z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Nav Links (hidden on mobile) */}
        <ul className="hidden lg:flex items-center space-x-2 sm:space-x-4">
          <li className="h-10 flex items-center">
            <Link to="/" className={navLinkClasses}>
              Home
            </Link>
          </li>
          <li className="h-10 flex items-center">
            <Link to="/submit" className={navLinkClasses}>
              Submit Feedback
            </Link>
          </li>
          <li className="h-10 flex items-center">
            <button
              onClick={logout}
              className="text-white px-4 font-bold bg-gray-900 py-2 rounded-md text-sm hover:bg-gray-800"
            >
              Logout ({userRole})
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu (conditionally rendered and styled) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-blue-200 shadow-lg py-4 z-20">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to="/" className={navLinkClasses.replace('text-white', '!text-gray-900')} onClick={handleNavLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/submit" className={navLinkClasses.replace('text-white', '!text-gray-900')} onClick={handleNavLinkClick}>
                Submit Feedback
              </Link>
            </li>
            <li>
              <button
                onClick={() => { logout(); handleNavLinkClick(); }}
                className="text-gray-900 px-4 font-bold bg-gray-300 py-2 rounded-md text-sm hover:bg-gray-400"
              >
                Logout ({userRole})
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;