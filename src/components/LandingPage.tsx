
import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onContinue: () => void;
}

const LandingPage = ({ onContinue }: LandingPageProps) => {
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 opacity-90"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-girly rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-girly rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-8">
          <span className="typewriter inline-block">Happy Birthday Dimwit</span>
        </h1>
        
        {showContinue && (
          <button
            onClick={onContinue}
            className="fade-in mt-8 px-8 py-4 bg-gradient-to-r from-pink-girly to-purple-girly text-white font-inter font-semibold rounded-full hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-pink-girly/25"
          >
            Continue ✨
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
