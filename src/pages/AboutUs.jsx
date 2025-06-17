import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import HeroSection from '../components/HeroSection';
import AboutContent from '../components/AboutContent';
import Footer from '../components/Footer';

const AboutUs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Navbar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} navigate={navigate} />
      {isMobileMenuOpen && <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} navigate={navigate} />}
      <HeroSection />
      <AboutContent />
      <Footer />
    </div>
  );
};

export default AboutUs;
