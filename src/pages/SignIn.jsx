import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';



const SignIn = () => {
 const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };



  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post('https://insightpilot-api.onrender.com/api/auth/signin', { email, password });
      localStorage.setItem('token', res.data.token);
      // Optionally store user info
      setError('');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">


         {/* Back to Home Button */}
        <div className="mb-6 flex justify-start"> {/* Aligns button to the left */}
          <button
            onClick={handleGoHome}
            className="flex items-center text-sm text-[#3A7BDB] hover:text-[#1E4D8C] transition-colors duration-200 group"
            aria-label="Back to homepage"
          >
            <i className="fas fa-arrow-left mr-2 transition-transform duration-200 group-hover:-translate-x-1"></i>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <svg className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <span className="text-2xl font-bold text-blue-600">InsightPilot</span>
          </div>
        </div>
        
        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  id="email"
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out flex justify-center items-center !rounded-button whitespace-nowrap cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin mr-2"></i>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New user? 
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium ml-1 whitespace-nowrap cursor-pointer"
               onClick={() => navigate('/signup')}>
                Create an account
              </a>
            </p>
          </div>
        </div>
        
        {/* Security Notice */}
        <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
          <i className="fas fa-shield-alt mr-2"></i>
          <span>Protected by high-level security</span>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <i className="fas fa-question-circle mr-1"></i>
              Help
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <i className="fas fa-lock mr-1"></i>
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <i className="fas fa-file-contract mr-1"></i>
              Terms
            </a>
          </div>
          <p className="text-xs text-gray-500">© 2025 InsightPilot. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default SignIn







