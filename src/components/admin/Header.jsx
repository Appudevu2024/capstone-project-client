
import { Link } from 'react-router-dom';
 import logo from '../../images/hospital-logo.avif'
 import React, { useEffect, useState } from "react";

 
function Header() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);


  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Hospital Logo" className="h-10 w-10 object-cover" />
        <span className="text-2xl font-bold">MediCare</span>
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/doctors" className="hover:underline">Doctors</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button className="bg-white text-blue-700 px-3 py-1 rounded-full hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Notification Icon */}
          <button className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3A6 6 0 006 11v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={toggleTheme} className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-blue-700">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        


      </div>
    </header>




  );
}

export default Header;

 