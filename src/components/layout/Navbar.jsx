import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLogout, HiMenu, HiX, HiOutlineUserCircle } from 'react-icons/hi';
import Logo from '../Logo';
import { dummyStudent } from '../../data/mockData';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Find PG', path: '/find-pg' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Lost & Found', path: '/lost-found' },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-brandNavy/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center">
          <Logo className="h-9 w-auto" textClassName="text-2xl font-bold text-brandNavy font-sans" />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-5 py-2.5 text-[15px] font-medium text-brandNavy/80 hover:text-brandNavy transition-colors rounded-xl duration-300"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-brandNavy/5 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={isActive ? "text-brandNavy font-semibold" : ""}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Avatar Dropdown */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 focus:outline-none p-0.5 rounded-full border-2 border-transparent hover:border-brandAccent transition-all duration-300"
            >
              <img
                src={dummyStudent.avatar}
                alt={dummyStudent.name}
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 rounded-3xl glass-dropdown shadow-premium p-6 border border-brandNavy/10 z-50 text-left"
                >
                  {/* Student Info Card */}
                  <div className="flex items-center gap-4 pb-5 border-b border-brandNavy/5">
                    <img
                      src={dummyStudent.avatar}
                      alt={dummyStudent.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-brandAccent/20"
                    />
                    <div>
                      <h4 className="font-semibold text-brandNavy text-base leading-tight font-sans">
                        {dummyStudent.name}
                      </h4>
                      <p className="text-xs text-brandTextSec mt-0.5">{dummyStudent.email}</p>
                      <p className="text-xs text-brandTextSec font-mono mt-0.5">{dummyStudent.phone}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col gap-1.5">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-brandNavy/5 text-[15px] text-brandNavy/95 font-medium transition-colors"
                    >
                      <HiOutlineUserCircle className="text-lg text-brandTextSec" />
                      <span>Edit Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 text-[15px] text-red-600 font-medium transition-colors w-full text-left"
                    >
                      <HiOutlineLogout className="text-lg text-red-400" />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-brandNavy/80 hover:bg-brandNavy/5 hover:text-brandNavy focus:outline-none transition-colors"
          >
            {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-brandNavy/5 bg-white px-6 py-4 flex flex-col gap-2 shadow-inner"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                    isActive
                      ? 'bg-brandNavy/5 text-brandNavy font-semibold'
                      : 'text-brandNavy/80 hover:bg-brandNavy/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
