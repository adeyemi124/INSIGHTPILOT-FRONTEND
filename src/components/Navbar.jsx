import React from 'react';

const Navbar = ({ isMobileMenuOpen, toggleMobileMenu, navigate }) => (
  <header className="py-4 px-6 md:px-12 flex items-center justify-between bg-white shadow-sm relative z-50">
    <div className="flex items-center">
      <svg className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
      <h1 className="text-3xl font-bold text-blue-600">InsightPilot</h1>
    </div>
    <div className="md:hidden flex items-center">
      <button
        onClick={toggleMobileMenu}
        className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
    <div className="hidden md:flex items-center space-x-8">
      <nav className="flex items-center space-x-8 text-lg font-medium">
        <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Home</button>
        <button onClick={() => navigate('/features')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Features</button>
        <button onClick={() => navigate('/pricing')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Pricing</button>
        <button onClick={() => navigate('/about-us')} className="text-blue-700 font-bold border-b-2 border-blue-700 bg-transparent border-none cursor-pointer">About Us</button>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200" onClick={() => navigate('/signin')}>Sign In</button>
        <button className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200" onClick={() => navigate('/signup')}>Get Started</button>
      </div>
    </div>
  </header>
);

export default Navbar;