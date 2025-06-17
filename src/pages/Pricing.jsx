import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    features: [
      'Basic AI insights',
      'Upload up to 2 datasets/month',
      'Community support',
      'Limited visualizations'
    ]
  },
  {
    name: 'Pro',
    price: '$19/mo',
    features: [
      'Unlimited AI insights',
      'Unlimited dataset uploads',
      'Advanced visualizations',
      'Priority support',
      'Export to PDF'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    features: [
      'Custom integrations',
      'Dedicated account manager',
      'Team collaboration',
      'Premium support'
    ]
  }
];

const Pricing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Navbar */}
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
            <button onClick={() => navigate('/pricing')} className="text-blue-700 font-bold border-b-2 border-blue-700 bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => navigate('/about-us')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">About Us</button>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200" onClick={() => navigate('/signin')}>Sign In</button>
            <button className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200" onClick={() => navigate('/signup')}>Get Started</button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center py-8 space-y-6 shadow-lg transition-transform duration-300 ease-in-out transform translate-y-0">
          <nav className="flex flex-col items-center space-y-6 text-xl font-medium">
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Home</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/features'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Features</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/pricing'); }} className="text-blue-700 font-bold border-b-2 border-blue-700 bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/about-us'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">About Us</button>
          </nav>
          <div className="flex flex-col items-center space-y-4 mt-6">
            <button className="w-48 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200" onClick={() => { setIsMobileMenuOpen(false); navigate('/signin'); }}>Sign In</button>
            <button className="w-48 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200" onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}>Get Started</button>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 md:px-12 rounded-b-lg shadow-lg overflow-hidden mb-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute w-64 h-64 bg-white rounded-full -top-16 -left-16 mix-blend-overlay animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white rounded-full -bottom-32 -right-32 mix-blend-overlay animate-pulse delay-300"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">Flexible Pricing for Every Need</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Choose a plan that fits your business, from free insights to enterprise-grade analytics and support.</p>
        </div>
      </section>
      {/* Pricing Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2 text-blue-700">{plan.name}</h2>
              <div className="text-3xl font-extrabold mb-4">{plan.price}</div>
              <ul className="mb-6 text-gray-700">
                {plan.features.map((f, i) => (
                  <li key={i} className="mb-2 flex items-center"><span className="text-green-500 mr-2">✔</span>{f}</li>
                ))}
              </ul>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">{plan.price === 'Free' ? 'Get Started' : 'Choose Plan'}</button>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 text-center text-gray-600 bg-gray-200 mt-auto">
        <p>&copy; {new Date().getFullYear()} InsightPilot. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with React, Tailwind CSS, and the power of AI.</p>
      </footer>
    </div>
  );
};

export default Pricing;
