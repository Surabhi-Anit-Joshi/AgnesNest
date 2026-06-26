import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlinePhone, HiOutlineUser, HiOutlineMail, HiOutlineArrowLeft } from 'react-icons/hi';

import { useAuth } from '../context/AuthContext';

// Pixel-perfect SVG Indian Flag
const IndianFlag = () => (
  <svg width="24" height="16" viewBox="0 0 3 2" className="rounded-sm shadow-sm select-none">
    <rect width="3" height="2" fill="#FFFFFF"/>
    <rect width="3" height="0.67" fill="#FF9933"/>
    <rect width="3" height="0.67" y="0.67" fill="#FFFFFF"/>
    <rect width="3" height="0.67" y="1.33" fill="#128807"/>
    <circle cx="1.5" cy="1" r="0.18" fill="none" stroke="#000080" strokeWidth="0.02"/>
    <circle cx="1.5" cy="1" r="0.04" fill="#000080"/>
  </svg>
);

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('6361079075');
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState("D'Souza");
  const [email, setEmail] = useState('jane@stagnes.edu.in');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    login({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone: '+91 ' + phoneNumber,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col justify-between items-center relative overflow-hidden select-none">
      
      <div className="w-full flex-grow flex flex-col items-center justify-center px-6 relative z-10 py-10">
        
        {/* Header with back arrow */}
        <div className="max-w-md w-full flex items-center justify-start gap-4 mb-6">
          <button 
            onClick={() => navigate('/login')}
            className="p-2 rounded-xl hover:bg-brandNavy/5 text-brandNavy transition-colors focus:outline-none"
          >
            <HiOutlineArrowLeft className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-brandNavy font-sans">Create Account</h1>
        </div>

        {/* Info Text */}
        <div className="max-w-md w-full text-center mb-6">
          <p className="text-[15px] text-brandNavy font-medium font-sans">
            Start your journey with <span className="font-semibold text-brandNavy">AgnesNest</span>!
          </p>
          <p className="text-brandTextSec text-sm mt-0.5">
            Fill in the details below.
          </p>
        </div>

        {/* SignUp Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-[28px] shadow-premium p-8 border border-brandNavy/5"
        >
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            
            {/* Input 1: Mobile Number */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-brandNavy text-xs font-semibold pl-1">Mobile Number</label>
              <div className="flex items-center gap-4 bg-white border border-brandNavy/10 rounded-2xl p-4 shadow-sm hover:border-brandAccent transition-all duration-300">
                <div className="flex items-center gap-2 border-r border-brandNavy/10 pr-3">
                  <IndianFlag />
                  <span className="text-[15px] font-medium text-brandNavy">+91</span>
                </div>
                <HiOutlinePhone className="text-brandTextSec text-lg flex-shrink-0" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full text-[15px] font-medium text-brandNavy placeholder-brandTextSec/50 focus:outline-none bg-transparent"
                  placeholder="6361079075"
                  required
                />
              </div>
            </div>

            {/* Input 2: First Name */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-brandNavy text-xs font-semibold pl-1">First Name</label>
              <div className="flex items-center gap-4 bg-white border border-brandNavy/10 rounded-2xl p-4 shadow-sm hover:border-brandAccent transition-all duration-300">
                <HiOutlineUser className="text-brandTextSec text-lg flex-shrink-0" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full text-[15px] font-medium text-brandNavy placeholder-brandTextSec/50 focus:outline-none bg-transparent"
                  placeholder="First Name"
                  required
                />
              </div>
            </div>

            {/* Input 3: Last Name */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-brandNavy text-xs font-semibold pl-1">Last Name</label>
              <div className="flex items-center gap-4 bg-white border border-brandNavy/10 rounded-2xl p-4 shadow-sm hover:border-brandAccent transition-all duration-300">
                <HiOutlineUser className="text-brandTextSec text-lg flex-shrink-0" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full text-[15px] font-medium text-brandNavy placeholder-brandTextSec/50 focus:outline-none bg-transparent"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Input 4: Email Address */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-brandNavy text-xs font-semibold pl-1">Email Address</label>
              <div className="flex items-center gap-4 bg-white border border-brandNavy/10 rounded-2xl p-4 shadow-sm hover:border-brandAccent transition-all duration-300">
                <HiOutlineMail className="text-brandTextSec text-lg flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-[15px] font-medium text-brandNavy placeholder-brandTextSec/50 focus:outline-none bg-transparent"
                  placeholder="Enter Email Address"
                  required
                />
              </div>
            </div>

            {/* Agree Terms Checkbox */}
            <div className="flex items-center gap-3 text-left pl-1 py-1">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-brandNavy border-brandNavy/20 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="agree-terms" className="text-xs font-semibold text-brandNavy select-none cursor-pointer">
                I agree with <a href="#" className="text-brandAccent hover:underline">Terms & Conditions</a>
              </label>
            </div>

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-4.5 bg-brandNavy text-white font-bold tracking-wider rounded-full hover:bg-brandMedium transition-all duration-300 shadow-md hover:shadow-lg text-sm uppercase mt-2"
            >
              SIGN UP
            </motion.button>
          </form>

        </motion.div>
      </div>

      {/* Wave Decoration at Bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none select-none">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block align-middle">
          <path 
            d="M0,120L60,112C120,104,240,88,360,96C480,104,600,136,720,149.3C840,163,960,157,1080,144C1200,131,1320,112,1380,101.3L1440,91L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z" 
            fill="#dcdfe4"
          />
          <path 
            d="M0,150L60,144C120,138,240,126,360,128C480,130,600,146,720,149.3C840,153,960,143,1080,138.7C1200,134,1320,136,1380,137.3L1440,139L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z" 
            fill="#e2e6eb" 
            opacity="0.8"
          />
          <path
            d="M1320 150C1320 155.523 1324.48 160 1330 160C1335.52 160 1340 155.523 1340 150C1340 144.477 1335.52 140 1330 140C1324.48 140 1320 144.477 1320 150Z"
            fill="#FFFFFF"
            opacity="0.9"
            className="animate-pulse"
          />
        </svg>
      </div>

    </div>
  );
};

export default SignUp;
