import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/hospital-logo.avif';
import React, { useContext } from "react";
import { LoginContext } from '../../context/LoginContext';
import { ThemeContext } from '../../context/ThemeContext';

function Header() {
  const { setShowLogin } = useContext(LoginContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <header className="bg-base-100 text-base-content shadow-md dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Hospital Logo" className="h-10 w-10 object-cover rounded-full" />
          <span className="text-2xl font-bold">HealthCare</span>
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/" className="hover:underline">Services</Link>
          <Link to="/" className="hover:underline">Doctors</Link>
          <Link to="/" className="hover:underline">Contact Us</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-blue-700 dark:border-gray-300 dark:hover:bg-gray-700"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Login Button */}
          <button
            className="btn bg-blue-700 text-white dark:bg-gray-800 dark:text-white dark:border-gray-600 w-32 rounded-full hover:bg-blue-800"
            onClick={() => setShowLogin(true)}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;