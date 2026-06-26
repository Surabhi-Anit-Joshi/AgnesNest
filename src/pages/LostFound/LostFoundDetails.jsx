import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineArrowLeft, HiOutlineLocationMarker, HiOutlineCalendar,
  HiOutlineTag, HiOutlinePhone, HiOutlineMail, HiOutlineShieldCheck, HiOutlineUsers
} from 'react-icons/hi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useLostFound } from '../../context/LostFoundContext';

const LostFoundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItem } = useLostFound();
  const item = getItem(id);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-brandBgSoft flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-400 text-3xl">
              <HiOutlineTag />
            </div>
            <h2 className="text-xl font-bold text-brandNavy mb-2">Item Not Found</h2>
            <p className="text-brandTextSec text-sm mb-6">This item may have been removed or is no longer available.</p>
            <Link to="/lost-found" className="px-6 py-3 bg-brandNavy text-white font-semibold rounded-xl text-sm hover:bg-brandMedium transition-colors">
              Back to Lost & Found
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBgSoft flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-grow">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-brandTextSec font-medium mb-6">
          <Link to="/" className="hover:text-brandAccent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/lost-found" className="hover:text-brandAccent transition-colors">Lost & Found</Link>
          <span>/</span>
          <span className="text-brandNavy font-semibold truncate max-w-[200px]">{item.itemName}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brandNavy text-sm font-semibold mb-6 hover:text-brandAccent transition-colors group w-fit"
        >
          <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Image & Details */}
          <div className="flex-grow min-w-0 flex flex-col gap-6">
            
            {/* Image */}
            <div className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-4 sm:p-6 h-[300px] sm:h-[450px] relative overflow-hidden flex items-center justify-center group">
              <img 
                src={item.image} 
                alt={item.itemName} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6 bg-brandNavy/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl tracking-wider uppercase shadow-sm">
                Found Item
              </div>
            </div>

            {/* Info */}
            <section className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brandNavy font-sans mb-4 leading-tight">
                {item.itemName}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-brandNavy/5">
                <div className="flex items-start gap-3 bg-brandBgSoft rounded-2xl p-4 border border-brandNavy/5">
                  <HiOutlineLocationMarker className="text-brandAccent text-xl flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-brandTextSec uppercase tracking-wider mb-0.5">Found Location</p>
                    <p className="text-sm font-semibold text-brandNavy">{item.foundLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-brandBgSoft rounded-2xl p-4 border border-brandNavy/5">
                  <HiOutlineCalendar className="text-brandAccent text-xl flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-brandTextSec uppercase tracking-wider mb-0.5">Found Date</p>
                    <p className="text-sm font-semibold text-brandNavy">{item.foundDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-brandNavy text-base mb-3">Description</h3>
                <p className="text-sm text-brandTextSec leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </section>
          </div>

          {/* Right: Contact Finder */}
          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-3xl border border-brandNavy/5 shadow-soft overflow-hidden">
              <div className="p-6 border-b border-brandNavy/5">
                <h3 className="font-bold text-brandNavy text-sm mb-2">Item Finder</h3>
                <p className="font-bold text-brandNavy text-lg">{item.finderName}</p>
                <p className="text-[11px] text-brandTextSec font-medium mt-1">St Agnes College Student</p>
              </div>

              <div className="p-6">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setContactOpen(o => !o)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-brandNavy text-white font-bold rounded-2xl hover:bg-brandMedium transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                >
                  <HiOutlineUsers className="text-lg" />
                  Contact Finder
                </motion.button>

                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 flex flex-col gap-3">
                        <a
                          href={`tel:${item.phone}`}
                          className="flex items-center gap-3 p-3.5 bg-brandNavy text-white rounded-xl font-semibold text-sm hover:bg-brandMedium transition-colors"
                        >
                          <HiOutlinePhone className="text-lg" />
                          {item.phone}
                        </a>
                        <a
                          href={`mailto:${item.email}`}
                          className="flex items-center gap-3 p-3.5 bg-brandBgSoft border border-brandNavy/10 text-brandNavy rounded-xl font-semibold text-sm hover:border-brandAccent transition-colors"
                        >
                          <HiOutlineMail className="text-lg text-brandAccent" />
                          <span className="truncate text-xs">{item.email}</span>
                        </a>
                      </div>

                      {/* Disclaimer */}
                      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        <div className="flex items-start gap-2.5">
                          <HiOutlineShieldCheck className="text-amber-500 text-xl flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-800 leading-relaxed">
                            If this item belongs to you, please contact the finder directly using the provided details. AgnesNest only facilitates the connection between students.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LostFoundDetails;
