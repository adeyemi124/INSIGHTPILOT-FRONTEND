import React from 'react';

const AboutContent = () => (
  <div className="max-w-3xl mx-auto px-4 pb-16">
    <p className="text-lg mb-6 text-gray-700 text-center">
      InsightPilot is your AI-powered decision intelligence platform, designed to help businesses, analysts, and leaders uncover actionable insights from data. Our mission is to make advanced analytics and AI-driven recommendations accessible to everyone, regardless of technical background.
    </p>
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Vision</h2>
      <p className="text-gray-700 mb-4">Empower organizations and individuals to make smarter, faster, and more confident decisions using the power of AI and data visualization.</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Team</h2>
      <p className="text-gray-700">We are a passionate team of data scientists, engineers, and business strategists committed to democratizing data-driven decision making. We believe in transparency, innovation, and user-centric design.</p>
    </div>
    <div className="text-center">
      <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">Contact: support@insightpilot.com</span>
    </div>
  </div>
);

export default AboutContent;