import React, { useState, useContext } from 'react';
import LoginPage from '../shared/LoginPage';
import banner1 from '../../images/slider1.jpg';
import banner2 from '../../images/slider2.webp';
import banner3 from '../../images/slider3.jpg';
import banner4 from '../../images/slider4.jpg';
import { LoginContext } from '../../context/LoginContext';

function HomePage() {
  const { showLogin, setShowLogin } = useContext(LoginContext);

  const banners = [banner1, banner2, banner3, banner4];
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        <img
          src={banners[currentSlide]}
          className="w-full h-full object-cover rounded-lg transition-all duration-500"
          alt={`Banner ${currentSlide + 1}`}
        />
        <div className="absolute left-0 top-0 w-full h-full bg-black/40  flex flex-col justify-center items-center text-center p-4">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Welcome to HealthCare
          </h2>
          <p className="text-white text-lg mb-6 max-w-xl">
            Your trusted partner in patient care, appointments, and health records.
          </p>
         
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
          <button
            onClick={handlePrevious}
            className="btn btn-circle text-white hover:bg-blue-700"
          >
            ❮
          </button>
        </div>
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            className="btn btn-circle text-white hover:bg-blue-700"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              
            </button>
            <LoginPage />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
