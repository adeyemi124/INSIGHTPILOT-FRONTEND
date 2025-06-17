import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const handleNavigation = (path) => {
    // Only navigate if we're not already on that path
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <header className="py-4 px-6 md:px-12 flex items-center justify-between bg-white shadow-sm relative z-50">
      <div className="flex items-center">
        <svg className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
        <h1 className="text-3xl font-bold text-blue-600">InsightPilot</h1>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <nav className="flex items-center space-x-8 text-lg font-medium">
          <button 
            onClick={() => handleNavigation('/dashboard')} 
            className={`${location.pathname === '/dashboard' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-200 bg-transparent border-none cursor-pointer`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => handleNavigation('/dashboard/profile')} 
            className={`${location.pathname === '/dashboard/profile' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-200 bg-transparent border-none cursor-pointer`}
          >
            Profile
          </button>
          <button 
            onClick={() => handleNavigation('/dashboard/settings')} 
            className={`${location.pathname === '/dashboard/settings' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-200 bg-transparent border-none cursor-pointer`}
          >
            Settings
          </button>
        </nav>
        <div className="flex items-center space-x-4">
          <button 
            className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar; 