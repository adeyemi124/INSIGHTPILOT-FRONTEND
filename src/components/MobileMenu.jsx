import React from 'react';

const MobileMenu = ({ setIsMobileMenuOpen, navigate }) => (
  <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center py-8 space-y-6 shadow-lg transition-transform duration-300 ease-in-out transform translate-y-0">
    <nav className="flex flex-col items-center space-y-6 text-xl font-medium">
      <button onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Home</button>
      <button onClick={() => { setIsMobileMenuOpen(false); navigate('/features'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Features</button>
      <button onClick={() => { setIsMobileMenuOpen(false); navigate('/pricing'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Pricing</button>
      <button onClick={() => { setIsMobileMenuOpen(false); navigate('/about-us'); }} className="text-blue-700 font-bold border-b-2 border-blue-700 bg-transparent border-none cursor-pointer">About Us</button>
    </nav>
    <div className="flex flex-col items-center space-y-4 mt-6">
      <button className="w-48 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200" onClick={() => { setIsMobileMenuOpen(false); navigate('/signin'); }}>Sign In</button>
      <button className="w-48 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200" onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}>Get Started</button>
    </div>
  </div>
);

export default MobileMenu;