import React from 'react';

const Footer = () => (
  <footer className="py-8 px-6 md:px-12 text-center text-gray-600 bg-gray-200 mt-auto">
    <p>&copy; {new Date().getFullYear()} InsightPilot. All rights reserved.</p>
    <p className="mt-2 text-sm">Built with React, Tailwind CSS, and the power of AI.</p>
  </footer>
);

export default Footer;