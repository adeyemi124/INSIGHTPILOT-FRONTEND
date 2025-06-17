import React from 'react';

const HeroSection = () => (
  <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 md:px-12 rounded-b-lg shadow-lg overflow-hidden mb-12">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute w-64 h-64 bg-white rounded-full -top-16 -left-16 mix-blend-overlay animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-white rounded-full -bottom-32 -right-32 mix-blend-overlay animate-pulse delay-300"></div>
    </div>
    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">About InsightPilot</h2>
      <p className="text-xl md:text-2xl mb-8 opacity-90">Learn more about our mission, vision, and the team behind the AI-powered decision intelligence platform.</p>
    </div>
  </section>
);

export default HeroSection;