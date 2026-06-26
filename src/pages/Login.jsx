import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlinePhone } from 'react-icons/hi';
import Logo from '../components/Logo';

// Pixel-perfect SVG Indian Flag
const IndianFlag = () => (
  <svg width="24" height="16" viewBox="0 0 3 2" className="rounded-sm shadow-sm select-none">
    <rect width="3" height="2" fill="#FFFFFF"/>
    <rect width="3" height="0.67" fill="#FF9933"/>
    <rect width="3" height="0.67" y="0.67" fill="#FFFFFF"/>
    <rect width="3" height="0.67" y="1.33" fill="#128807"/>
    <circle cx="1.5" cy="1" r="0.18" fill="none" stroke="#000080" strokeWidth="0.02"/>
    {/* Spokes */}
    <circle cx="1.5" cy="1" r="0.04" fill="#000080"/>
  </svg>
);

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('6361079075');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      // Simulate login
      navigate('/');
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col justify-between items-center relative overflow-hidden select-none">
      
      {/* Spacer or upper content */}
      <div className="w-full flex-grow flex flex-col items-center justify-center px-6 relative z-10 py-12">
        
        {/* Logo and Tagline Area */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-block transform scale-110 mb-2">
            <Logo className="h-12 w-auto" textClassName="text-3xl font-extrabold text-brandNavy font-sans" />
          </div>
          <p className="text-brandMedium font-medium tracking-wide text-sm mt-3 font-sans">
            Connect. Engage. Thrive.
          </p>
        </motion.div>

        {/* Login Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md w-full bg-white rounded-[28px] shadow-premium p-8 border border-brandNavy/5"
        >
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            {/* Custom Phone Input Matching Design */}
            <div className="flex items-center gap-4 bg-white border border-brandNavy/10 rounded-2xl p-4 shadow-sm hover:border-brandAccent transition-all duration-300">
              
              {/* Flag & Prefix */}
              <div className="flex items-center gap-2 border-r border-brandNavy/10 pr-3 select-none">
                <IndianFlag />
                <span className="text-[16px] font-medium text-brandNavy">+91</span>
              </div>
              
              {/* Phone Icon */}
              <HiOutlinePhone className="text-brandTextSec text-xl flex-shrink-0" />
              
              {/* Number Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full text-[16px] font-medium text-brandNavy placeholder-brandTextSec/50 focus:outline-none bg-transparent"
                placeholder="6361079075"
                required
              />
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-4.5 bg-brandNavy text-white font-bold tracking-wider rounded-full hover:bg-brandMedium transition-all duration-300 shadow-md hover:shadow-lg text-sm uppercase"
            >
              LOGIN
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-brandTextSec text-xs font-medium">Don't have an account? </span>
            <Link to="/signup" className="text-brandAccent hover:text-brandMedium text-xs font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Premium Wave Decoration at Bottom (matching reference screenshot) */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none select-none">
        <svg viewBox="0 0 1440 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block align-middle">
          <path 
            d="M0,192L60,202.7C120,213,240,235,360,240C480,245,600,235,720,213.3C840,192,960,160,1080,149.3C1200,139,1320,149,1380,154.7L1440,160L1440,280L1380,280C1320,280,1200,280,1080,280C960,280,840,280,720,280C600,280,480,280,360,280C240,280,120,280,60,280L0,280Z" 
            fill="#002b5b"
          />
          <path 
            d="M0,224L60,224C120,224,240,224,360,213.3C480,203,600,181,720,181.3C840,181,960,203,1080,213.3C1200,224,1320,224,1380,224L1440,224L1440,280L1380,280C1320,280,1200,280,1080,280C960,280,840,280,720,280C600,280,480,280,360,280C240,280,120,280,60,280L0,280Z" 
            fill="#083E7D" 
            opacity="0.6"
          />
          {/* Accent Sparkle icon matching the bottom right of the login screen */}
          <path
            d="M1360 210C1360 215.523 1364.48 220 1370 220C1375.52 220 1380 215.523 1380 210C1380 204.477 1375.52 200 1370 200C1364.48 200 1360 204.477 1360 210Z"
            fill="#FFFFFF"
            opacity="0.8"
            className="animate-pulse"
          />
        </svg>
      </div>

    </div>
  );
};

export default Login;
