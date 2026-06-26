import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineAcademicCap, 
  HiOutlineOfficeBuilding, 
  HiOutlineShoppingBag, 
  HiOutlineSearchCircle, 
  HiStar, 
  HiOutlineLocationMarker, 
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiOutlineArrowRight,
  HiOutlineUserGroup,
  HiOutlineCheckCircle
} from 'react-icons/hi';
import { FiWifi, FiCoffee, FiPhone } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { marketplaceItems, lostFoundItems } from '../../data/mockData';
import { usePG } from '../../context/PGContext';

// Animated Count Up Component
const CountUp = ({ to, suffix = "", duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(to);
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <span>{count}{suffix}</span>;
};

const Home = () => {
  const navigate = useNavigate();
  const { getTopPGs } = usePG();
  const topPGs = getTopPGs(4);
  const [copiedContact, setCopiedContact] = useState(null);

  const handleCopyContact = (id, contact) => {
    navigator.clipboard.writeText(contact);
    setCopiedContact(id);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  // Framer Motion Animation Settings
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-brandBgSoft flex flex-col justify-between overflow-x-hidden">
      
      {/* Navigation */}
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              {/* College Badge */}
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brandAccent/10 border border-brandAccent/25 text-brandAccent rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
              >
                <HiOutlineAcademicCap className="text-base" />
                Exclusively for St Agnes College
              </motion.div>

              {/* Title */}
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-brandNavy leading-[1.1] mb-6 tracking-tight"
              >
                Find Your Perfect <br />
                <span className="text-brandAccent">Student Stay</span> in Mangalore
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                variants={fadeInUp}
                className="text-base sm:text-lg text-brandTextSec font-medium leading-relaxed mb-8 max-w-xl"
              >
                AgnesNest helps students discover trusted PG accommodations, read genuine student reviews, buy and sell second-hand study essentials, and access Lost & Found services—all in one place.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
              >
                <Link
                  to="/find-pg"
                  className="px-8 py-4.5 bg-brandNavy text-white font-semibold rounded-2xl hover:bg-brandMedium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center text-sm"
                >
                  Explore PGs
                </Link>
                <Link
                  to="/marketplace"
                  className="px-8 py-4.5 bg-white text-brandNavy font-semibold rounded-2xl hover:bg-brandBgSoft transition-all duration-300 border border-brandNavy/10 hover:border-brandNavy/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center text-sm"
                >
                  Browse Marketplace
                </Link>
              </motion.div>

              {/* Animated Statistics */}
              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-brandNavy/5 w-full"
              >
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-brandNavy font-mono">
                    <CountUp to="100" suffix="+" />
                  </span>
                  <span className="text-xs text-brandTextSec font-semibold mt-1">PG Listings</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-brandNavy font-mono">
                    <CountUp to="500" suffix="+" />
                  </span>
                  <span className="text-xs text-brandTextSec font-semibold mt-1">Active Students</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-brandNavy font-mono">
                    <CountUp to="1000" suffix="+" />
                  </span>
                  <span className="text-xs text-brandTextSec font-semibold mt-1">Reviews Verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-brandNavy font-mono">
                    <CountUp to="200" suffix="+" />
                  </span>
                  <span className="text-xs text-brandTextSec font-semibold mt-1">Item Exchanges</span>
                </div>
              </motion.div>

            </motion.div>

            {/* Hero Right: College Image + Floating Cards */}
            <div className="lg:col-span-6 relative h-[560px] w-full flex items-center justify-center select-none">

              {/* Decorative background blur shapes */}
              <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brandAccent/10 blur-3xl -z-10" />
              <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-brandMedium/15 blur-3xl -z-10" />

              {/* === MAIN COLLEGE BUILDING IMAGE === */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="absolute inset-0 mx-auto w-[80%] h-[78%] top-[8%] rounded-[28px] overflow-hidden shadow-premium border-4 border-white"
              >
                <img
                  src="/agnes-college.png"
                  alt="St Agnes College, Mangalore"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/60 via-transparent to-transparent" />
                {/* College label badge */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-soft">
                  <div className="w-7 h-7 bg-brandAccent rounded-xl flex items-center justify-center">
                    <HiOutlineAcademicCap className="text-white text-sm" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-brandNavy leading-none">St Agnes College</p>
                    <p className="text-[9px] text-brandTextSec font-semibold">Mangalore, Karnataka</p>
                  </div>
                </div>
              </motion.div>

              {/* === FLOATING CARD 1: Students with Books === */}
              <motion.div
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                style={{ animationFillMode: 'forwards' }}
                className="absolute top-6 left-0 sm:left-2 w-[200px] bg-white rounded-3xl shadow-premium border border-brandNavy/5 overflow-hidden"
              >
                {/* Students with books photo */}
                <div className="relative h-28 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80"
                    alt="Students studying with books"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brandNavy/30" />
                </div>
                <div className="p-3.5">
                  <p className="text-[11px] font-extrabold text-brandNavy leading-tight">500+ Students</p>
                  <p className="text-[9px] text-brandTextSec font-semibold mt-0.5">Thriving on AgnesNest</p>
                  {/* Mini avatar row */}
                  <div className="flex items-center mt-2 gap-[-4px]">
                    {[
                      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=40&h=40&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=40&h=40&q=80',
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=40&h=40&q=80',
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Student"
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                        style={{ marginLeft: i === 0 ? 0 : -8 }}
                      />
                    ))}
                    <span className="ml-2 text-[9px] font-bold text-brandAccent">+497 more</span>
                  </div>
                </div>
              </motion.div>

              {/* === FLOATING CARD 2: Student with Bag (verified badge) === */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-4 right-0 sm:right-1 w-[192px] bg-white rounded-3xl shadow-premium border border-brandNavy/5 overflow-hidden"
              >
                {/* Student with bag photo */}
                <div className="relative h-24 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80"
                    alt="Student with backpack and books"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    ✓ Verified
                  </div>
                </div>
                <div className="p-3.5 flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=60&h=60&q=80"
                    alt="Jane"
                    className="w-9 h-9 rounded-full object-cover border-2 border-brandAccent/20 flex-shrink-0"
                  />
                  <div>
                    <p className="text-[11px] font-bold text-brandNavy leading-tight">Jane D'Souza</p>
                    <p className="text-[9px] text-brandTextSec font-mono">@stagnes.edu.in</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <HiOutlineCheckCircle className="text-green-500 text-xs" />
                      <span className="text-[9px] font-semibold text-green-600">Verified Student</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* === FLOATING CARD 3: PG Rent Info (top right) === */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="absolute top-5 right-0 sm:right-1 w-[160px] bg-white p-4 rounded-2xl shadow-soft border border-brandNavy/5 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-brandAccent/10 text-brandAccent rounded-xl flex items-center justify-center text-sm">
                    <HiOutlineOfficeBuilding />
                  </div>
                  <span className="text-[10px] font-bold text-brandNavy">Lourdes PG</span>
                </div>
                <p className="text-base font-extrabold text-brandNavy font-mono">₹6,000<span className="text-[9px] text-brandTextSec font-medium">/mo</span></p>
                <div className="flex items-center gap-1 mt-1.5 text-amber-500">
                  <HiStar className="text-xs" /><HiStar className="text-xs" /><HiStar className="text-xs" /><HiStar className="text-xs" /><HiStar className="text-xs" />
                  <span className="text-[9px] text-brandTextSec font-bold ml-0.5">4.5</span>
                </div>
                <span className="mt-1.5 block text-[9px] font-bold text-brandAccent bg-brandAccent/10 px-2 py-0.5 rounded-lg w-fit">0.4km from college</span>
              </motion.div>

            </div>

          </div>
        </section>

        {/* FEATURED PG SECTION */}
        <section className="bg-white py-24 border-t border-brandNavy/5">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12">
              <div className="text-left">
                <h2 className="text-3xl sm:text-4xl font-bold font-sans text-brandNavy mb-3">
                  Featured PGs Near St Agnes College
                </h2>
                <p className="text-brandTextSec text-[15px] sm:text-base font-medium max-w-xl">
                  Discover trusted accommodations recommended by students.
                </p>
              </div>
              <Link 
                to="/find-pg" 
                className="hidden sm:flex items-center gap-1.5 text-brandAccent hover:text-brandMedium text-sm font-bold transition-colors group"
              >
                Explore More 
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Swipe Carousel on Mobile, Grid on Desktop */}
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 -mx-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 pb-4 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {topPGs.map((pg) => (
                <motion.div
                  key={pg.id}
                  whileHover={{ y: -6 }}
                  className="min-w-[85%] sm:min-w-0 snap-center sm:snap-align-none bg-white rounded-3xl overflow-hidden border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full text-left"
                >
                  {/* PG Image & Badges */}
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={pg.images ? pg.images[0] : pg.image}
                      alt={pg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gender Tag */}
                    <div className="absolute top-3 left-3 bg-brandNavy/80 backdrop-blur-sm px-3 py-1 rounded-xl text-[10px] font-bold text-white tracking-wider uppercase">
                      {pg.gender} Only
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-bold text-brandNavy flex items-center gap-1 shadow-sm">
                      <HiStar className="text-amber-500" />
                      <span>{pg.rating}</span>
                      <span className="text-[10px] text-brandTextSec font-medium">({pg.reviewCount ?? pg.reviewsCount})</span>
                    </div>
                  </div>

                  {/* PG Info */}
                  <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-brandNavy text-lg font-sans leading-tight">
                        {pg.name}
                      </h3>

                      {/* Location & Distance */}
                      <div className="flex flex-col gap-1 text-[13px] text-brandTextSec font-medium">
                        <div className="flex items-center gap-1">
                          <HiOutlineLocationMarker className="text-brandAccent text-sm flex-shrink-0" />
                          <span className="truncate">{pg.location}</span>
                        </div>
                        <p className="pl-4 text-xs font-semibold text-brandAccent font-mono">
                          {pg.distanceLabel ?? pg.distance}
                        </p>
                      </div>

                      {/* Amenities Badges */}
                      <div className="flex items-center gap-2 mt-2">
                        {(pg.wifi ?? pg.facilities?.wifi) && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-brandMedium bg-brandBgSoft px-2.5 py-1 rounded-lg">
                            <FiWifi /> WiFi
                          </span>
                        )}
                        {(pg.food ?? pg.facilities?.food) && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-brandMedium bg-brandBgSoft px-2.5 py-1 rounded-lg">
                            <FiCoffee /> Food Inc.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rent & Action Button */}
                    <div className="pt-4 border-t border-brandNavy/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-brandTextSec font-bold block uppercase tracking-wider">Rent</span>
                        <span className="text-lg font-extrabold text-brandNavy font-mono">
                          {typeof pg.rent === 'number' ? `₹${pg.rent.toLocaleString('en-IN')}` : pg.rent}
                          <span className="text-xs text-brandTextSec font-medium">/mo</span>
                        </span>
                      </div>
                      <Link
                        to={`/pg/${pg.id}`}
                        className="px-4 py-2.5 bg-brandBgSoft hover:bg-brandNavy hover:text-white text-brandNavy text-xs font-bold rounded-xl transition-all duration-300 border border-brandNavy/5"
                      >
                        View Details
                      </Link>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Explore More link */}
            <div className="mt-8 text-center sm:hidden">
              <Link 
                to="/find-pg" 
                className="inline-flex items-center gap-1.5 text-brandAccent font-bold text-sm"
              >
                Explore More PGs <HiOutlineArrowRight />
              </Link>
            </div>

          </div>
        </section>

        {/* MARKETPLACE PREVIEW */}
        <section className="py-24 border-t border-brandNavy/5">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12">
              <div className="text-left">
                <h2 className="text-3xl sm:text-4xl font-bold font-sans text-brandNavy mb-3">
                  Buy & Sell Student Essentials
                </h2>
                <p className="text-brandTextSec text-[15px] sm:text-base font-medium max-w-xl">
                  Help students save money by buying and selling quality pre-owned essentials.
                </p>
              </div>
              <Link 
                to="/marketplace" 
                className="hidden sm:flex items-center gap-1.5 text-brandAccent hover:text-brandMedium text-sm font-bold transition-colors group"
              >
                Explore More 
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Grid of 4 Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {marketplaceItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full text-left"
                >
                  {/* Image & Tags */}
                  <div className="relative h-32 sm:h-48 overflow-hidden group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-brandAccent/90 backdrop-blur-sm px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-xl text-[9px] sm:text-[10px] font-bold text-white uppercase">
                      {item.category}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 sm:p-6 flex flex-col justify-between flex-grow gap-2 sm:gap-4">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <h3 className="font-bold text-brandNavy text-sm sm:text-base font-sans leading-snug line-clamp-2 sm:line-clamp-1">
                        {item.title}
                      </h3>
                      
                      {/* Price */}
                      <span className="text-base sm:text-lg font-extrabold text-brandNavy font-mono">{item.price}</span>
                      
                      {/* Details */}
                      <div className="flex flex-col gap-1 text-[10px] sm:text-xs font-semibold text-brandTextSec mt-0.5 sm:mt-1">
                        <p className="flex items-center gap-1 sm:gap-1.5 text-brandAccent">
                          Condition: <span className="bg-brandAccent/10 px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] uppercase font-bold">{item.condition}</span>
                        </p>
                        <p className="flex items-center gap-1 truncate text-[10px] sm:text-[11px] mt-0.5 sm:mt-1">
                          <HiOutlineLocationMarker className="flex-shrink-0" /> <span className="truncate">{item.pickupLocation}</span>
                        </p>
                      </div>
                    </div>

                    {/* Seller details & Action */}
                    <div className="pt-2 sm:pt-4 border-t border-brandNavy/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-2 mt-auto">
                      <div className="min-w-0 hidden sm:block">
                        <span className="text-[10px] text-brandTextSec font-bold block uppercase tracking-wider">Seller</span>
                        <p className="text-xs font-bold text-brandNavy truncate">{item.seller}</p>
                      </div>
                      <button
                        onClick={() => handleCopyContact(item.id, '+91 6361079075')}
                        className={`w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 border flex-shrink-0 ${
                          copiedContact === item.id 
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'bg-brandBgSoft hover:bg-brandNavy hover:text-white text-brandNavy border-brandNavy/5'
                        }`}
                      >
                        <FiPhone className="flex-shrink-0" />
                        <span>{copiedContact === item.id ? 'Copied' : 'Contact'}</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Explore More link */}
            <div className="mt-8 text-center sm:hidden">
              <Link 
                to="/marketplace" 
                className="inline-flex items-center gap-1.5 text-brandAccent font-bold text-sm"
              >
                Explore More Items <HiOutlineArrowRight />
              </Link>
            </div>

          </div>
        </section>

        {/* LOST & FOUND PREVIEW */}
        <section className="bg-white py-24 border-t border-brandNavy/5">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12">
              <div className="text-left">
                <h2 className="text-3xl sm:text-4xl font-bold font-sans text-brandNavy mb-3">
                  Lost Something? Found Something?
                </h2>
                <p className="text-brandTextSec text-[15px] sm:text-base font-medium max-w-xl">
                  Reconnect students with their lost belongings quickly and easily.
                </p>
              </div>
              <Link 
                to="/lost-found" 
                className="hidden sm:flex items-center gap-1.5 text-brandAccent hover:text-brandMedium text-sm font-bold transition-colors group"
              >
                Explore More 
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Grid of 4 Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {lostFoundItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full text-left"
                >
                  {/* Image & Type Badge */}
                  <div className="relative h-32 sm:h-48 overflow-hidden group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-xl text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider ${
                      item.type === 'Lost' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      {item.type}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 sm:p-6 flex flex-col justify-between flex-grow gap-2 sm:gap-4">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <h3 className="font-bold text-brandNavy text-sm sm:text-base font-sans leading-snug line-clamp-2 sm:line-clamp-1">
                        {item.title}
                      </h3>
                      
                      <div className="flex flex-col gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-brandTextSec font-semibold mt-1">
                        <p className="flex items-center gap-1 sm:gap-1.5 truncate">
                          <HiOutlineLocationMarker className="text-brandTextSec text-[11px] sm:text-[13px] flex-shrink-0" />
                          <span className="truncate">Location: {item.location}</span>
                        </p>
                        <p className="text-brandAccent text-[9px] sm:text-[11px] font-mono">Reported {item.date}</p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-2 sm:pt-4 border-t border-brandNavy/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-auto gap-1 sm:gap-2">
                      <span className="text-[9px] sm:text-[10px] text-brandTextSec font-bold hidden sm:block uppercase tracking-wider">Campus Care</span>
                      <button
                        onClick={() => handleCopyContact(item.id + 10, item.contact)}
                        className={`w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 border ${
                          copiedContact === item.id + 10 
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'bg-brandBgSoft hover:bg-brandNavy hover:text-white text-brandNavy border-brandNavy/5'
                        }`}
                      >
                        <FiPhone className="flex-shrink-0" />
                        <span>{copiedContact === item.id + 10 ? 'Copied' : 'Contact'}</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Explore More link */}
            <div className="mt-8 text-center sm:hidden">
              <Link 
                to="/lost-found" 
                className="inline-flex items-center gap-1.5 text-brandAccent font-bold text-sm"
              >
                Explore More Listings <HiOutlineArrowRight />
              </Link>
            </div>

          </div>
        </section>

        {/* WHY CHOOSE AGNESNEST */}
        <section className="py-24 border-t border-brandNavy/5">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-sans text-brandNavy mb-4">
                Why Choose AgnesNest?
              </h2>
              <p className="text-brandTextSec text-base sm:text-lg font-medium max-w-xl mx-auto">
                Tailor-made features to make your college life comfortable and efficient.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Feature 1 */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  <HiStar />
                </div>
                <h3 className="font-bold text-brandNavy text-lg mb-3 font-sans">Verified Student Reviews</h3>
                <p className="text-brandTextSec text-sm leading-relaxed">
                  Genuine insights from fellow college students on safety, food quality, WiFi, and hosts.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  <HiOutlineShieldCheck />
                </div>
                <h3 className="font-bold text-brandNavy text-lg mb-3 font-sans">Trusted Marketplace</h3>
                <p className="text-brandTextSec text-sm leading-relaxed">
                  Only St Agnes verified students are allowed to list, reducing scams and ensuring safe exchanges.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 bg-brandAccent/10 text-brandAccent rounded-2xl flex items-center justify-center text-2xl mb-6">
                  <HiOutlineOfficeBuilding />
                </div>
                <h3 className="font-bold text-brandNavy text-lg mb-3 font-sans">Easy PG Discovery</h3>
                <p className="text-brandTextSec text-sm leading-relaxed">
                  Filter by distance, monthly rent, food facility, and amenities to find your stay instantly.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  <HiOutlineUserGroup />
                </div>
                <h3 className="font-bold text-brandNavy text-lg mb-3 font-sans">College Community</h3>
                <p className="text-brandTextSec text-sm leading-relaxed">
                  A closed environment for St Agnes students to connect, buy study goods, and support each other.
                </p>
              </motion.div>

            </div>

          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="bg-gradient-to-r from-brandNavy via-brandMedium to-brandAccent rounded-[32px] p-12 sm:p-20 text-center relative overflow-hidden shadow-premium">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -z-0 translate-x-20 -translate-y-20 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 -z-0 -translate-x-20 translate-y-20 blur-2xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight mb-6 leading-tight">
                Join the AgnesNest Student Community
              </h2>
              <p className="text-white/80 font-medium text-base sm:text-lg mb-10 leading-relaxed">
                Connect with verified college peers, secure premium nearby housing, trade study items, and retrieve lost possessions securely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/find-pg"
                  className="w-full sm:w-auto px-8 py-4.5 bg-white text-brandNavy hover:bg-brandBgSoft font-bold rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  Explore PGs
                </Link>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-4.5 bg-transparent border border-white/40 hover:border-white text-white font-bold rounded-2xl transition-all duration-300 text-sm hover:bg-white/5"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;
