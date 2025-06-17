import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const HomePage = () => {
  // State for user's query input
  const [userQuery, setUserQuery] = useState('');
  // State for AI-generated response
  const [aiResponse, setAiResponse] = useState('');
  // State for loading indicator during AI generation
  const [isLoading, setIsLoading] = useState(false);
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to call backend Gemini API for generating insights
  const generateInsight = async () => {
    if (!userQuery.trim()) {
      setAiResponse('Please enter a question to get an insight.');
      return;
    }
    setIsLoading(true);
    setAiResponse(''); // Clear previous response

    try {
      const res = await axios.post('https://insightpilot-api.onrender.com/api/insight/ask', { query: userQuery });
      setAiResponse(res.data.answer);
    } catch (error) {
      setAiResponse('An error occurred while fetching insights. Please try again later.');
      console.error('Error fetching insights:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Data for the landing page content
  const industryCategories = [
    'Health', 'Finance', 'Agriculture', 'Retail/eCommerce',
    'Education', 'Energy', 'Tech/Startups', 'Government'
  ];

  const keyFeatures = [
    {
      title: 'Search/Ask Insight',
      description: 'Users can ask questions like, "What are the 2024 eCommerce growth trends in Sub-Saharan Africa?" InsightPilot AI will fetch or summarize data, identify trends or outliers, and suggest strategic actions.',
    },
    {
      title: 'Upload & Analyze Datasets',
      description: 'Users can upload CSV/Excel files and ask InsightPilot AI to summarize key trends, predict likely outcomes in Q3, or visualize growth across regions.',
    },
    {
      title: 'Dashboard & Visual Reports',
      description: 'View insights through trend lines, pie charts, and word clouds (for text insight). Easily export reports to PDF.',
    },
    {
      title: 'Save Queries & Re-run',
      description: 'Save insight questions, re-run them with the latest data, and bookmark key results for quick access.',
    },
    {
      title: 'AI-Assisted Decision Support',
      description: 'Leverage InsightPilot AI to compare between options, suggest strategic insights, highlight risks and recommendations, and auto-generate executive summaries.',
    },
  ];

  return (
    // Main container for the application, removing all dark mode classes
    <div className="min-h-screen bg-gray-100 text-gray-900 transition-colors duration-300 font-sans">

      {/* Header section with app name, navigation items, and removed dark mode toggle */}
      <header className="py-4 px-6 md:px-12 flex items-center justify-between bg-white shadow-sm relative z-50">
        {/* Left section: App Name/Logo */}
        <div className="flex items-center">
          <svg className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <h1 className="text-3xl font-bold text-blue-600">InsightPilot</h1>
        </div>

        {/* Hamburger menu button for mobile */}
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

        {/* Desktop Navigation links and Auth buttons */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8 text-lg font-medium">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Home</button>
            <button onClick={() => navigate('/features')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Features</button>
            <button onClick={() => navigate('/pricing')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => navigate('/about-us')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">About Us</button>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
            <button className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center py-8 space-y-6 shadow-lg transition-transform duration-300 ease-in-out transform translate-y-0">
          <nav className="flex flex-col items-center space-y-6 text-xl font-medium">
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Home</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/features'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Features</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/pricing'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/about-us'); }} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer">About Us</button>
          </nav>
          <div className="flex flex-col items-center space-y-4 mt-6">
            <button className="w-48 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200"
              onClick={() => { setIsMobileMenuOpen(false); navigate('/signin'); }}
            >
              Sign In
            </button>
            <button className="w-48 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200"
              onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 md:px-12 rounded-b-lg shadow-lg overflow-hidden">
        {/* Background blobs for visual effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute w-64 h-64 bg-white rounded-full -top-16 -left-16 mix-blend-overlay animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white rounded-full -bottom-32 -right-32 mix-blend-overlay animate-pulse delay-300"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            InsightPilot: Your AI-Powered Decision Intelligence Platform
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Uncover actionable, up-to-date statistical trends, patterns, and insights summarized or generated using AI.
          </p>
          <button className="px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Target Users Section */}
   
      {/* Target Users Section */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Who Benefits from InsightPilot?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[

            'Business Analysts', 'Entrepreneurs/Startups', 'Industry Researchers',
            'Policy Makers / NGOs', 'Investors or VC Analysts', 'Journalists'
          ].map((user, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <p className="text-xl font-semibold text-blue-600">{user}</p>
              <p className="text-gray-600 mt-2">
                Empowering data-driven decisions for {user.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* Industry Categories Section */}
      <section id="industries" className="bg-blue-50 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-blue-700">Explore Insights Across Industries</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {industryCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-200 hover:bg-blue-100 transition-all duration-300">
                <p className="text-lg font-medium text-gray-800">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Key Features Designed for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {keyFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 flex flex-col items-start hover:shadow-xl transition-shadow duration-300">
              <div className="text-blue-600 mb-4">
                {/* Placeholder icons for features - can be replaced with actual SVG/Lucide icons */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={

                    index === 0 ? "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" :
                    index === 1 ? "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" :
                    index === 2 ? "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V14m-5-5l5-5m0 0H14m5 0v5" :
                    index === 3 ? "M5 13l4 4L19 7" :
                    "M13 10V3L4 14h7v7l9-11h-7z"
                  }/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h4>
              <p className="text-gray-600 text-lg">{feature.description}</p>
            </div>
          ))}

        </div>
      </section>



      {/* Gemini AI Powered Insight Demo Section */}
      <section className="bg-blue-50 py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-xl border border-gray-200">
          <h3 className="text-4xl font-bold text-center mb-8 text-blue-700">Experience InsightPilot AI Insights ✨</h3>
          <p className="text-center text-lg mb-8 text-gray-700">
            Ask a question below and see how InsightPilot, powered by AI, can generate actionable insights for you.
          </p>
          <div className="mb-6">
            <label htmlFor="insight-query" className="block text-lg font-medium text-gray-700 mb-2">
              Your Question:
            </label>
            <textarea
              id="insight-query"
              rows="4"
              className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm resize-y"
              placeholder="e.g., What are the 2024 eCommerce growth trends in Sub-Saharan Africa?"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            ></textarea>
          </div>
          <div className="text-center">
            <button
              onClick={generateInsight}
              disabled={isLoading}
              className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Insight...
                </span>
              ) : (
                'Get Insight ✨'
              )}
            </button>
          </div>

          {aiResponse && (
            <div className="mt-8 p-6 bg-blue-100 rounded-lg border border-blue-200 shadow-inner">
              <h4 className="text-xl font-semibold text-blue-800 mb-3">AI-Generated Insight:</h4>
              <p className="text-gray-800 whitespace-pre-wrap">{aiResponse}</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-12 text-center rounded-t-lg shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Decisions?</h3>
          <p className="text-xl mb-8 opacity-90">
            Step into the future of strategic decision-making. InsightPilot harnesses the power of AI to deliver real-time, actionable insights that help you navigate complex choices with clarity and confidence.
          </p>
          <button className="px-10 py-5 bg-white text-blue-700 font-bold text-xl rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate('/signup')}
          >
            Sign Up for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 text-center text-gray-600 bg-gray-200">
        <p>&copy; 2024 InsightPilot. All rights reserved.</p>
        
      </footer>
    </div>
  );
}

export default HomePage