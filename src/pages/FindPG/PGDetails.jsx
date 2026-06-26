import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineGlobe,
  HiOutlineArrowLeft, HiOutlineClock, HiOutlineShieldCheck, HiOutlineMap,
  HiStar, HiOutlineUsers, HiCheckCircle
} from 'react-icons/hi';
import { FiWifi, FiCoffee } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ImageGallery from '../../components/pg/ImageGallery';
import FacilityBadge from '../../components/pg/FacilityBadge';
import StarRating from '../../components/pg/StarRating';
import RatingBreakdown from '../../components/pg/RatingBreakdown';
import ReviewCard from '../../components/pg/ReviewCard';
import ReviewForm from '../../components/pg/ReviewForm';
import { usePG } from '../../context/PGContext';

// Toast notification
const Toast = ({ message, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3.5 rounded-2xl shadow-xl text-sm font-semibold flex items-center gap-2 z-50"
      >
        <HiCheckCircle className="text-lg" />
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

const InfoChip = ({ label, value, icon }) => (
  <div className="bg-brandBgSoft rounded-2xl p-4 flex flex-col gap-1">
    <span className="text-[10px] font-bold text-brandTextSec uppercase tracking-wider">{label}</span>
    <div className="flex items-center gap-1.5 text-brandNavy font-bold text-sm">
      {icon && <span className="text-brandAccent">{icon}</span>}
      {value}
    </div>
  </div>
);

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPG, addReview } = usePG();
  const pg = getPG(id);
  const [toastVisible, setToastVisible] = useState(false);

  if (!pg) {
    return (
      <div className="min-h-screen bg-brandBgSoft flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-400 text-3xl">
              <HiOutlineLocationMarker />
            </div>
            <h2 className="text-xl font-bold text-brandNavy mb-2">PG Not Found</h2>
            <p className="text-brandTextSec text-sm mb-6">The PG you are looking for doesn't exist or has been removed.</p>
            <Link to="/find-pg" className="px-6 py-3 bg-brandNavy text-white font-semibold rounded-xl text-sm hover:bg-brandMedium transition-colors">
              Browse All PGs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleReviewSubmit = (review) => {
    addReview(pg.id, review);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const avgRating = pg.rating.toFixed(1);

  return (
    <div className="min-h-screen bg-brandBgSoft flex flex-col">
      <Navbar />
      <Toast message="Your review has been submitted successfully! 🎉" visible={toastVisible} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-grow">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-brandTextSec font-medium mb-6">
          <Link to="/" className="hover:text-brandAccent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/find-pg" className="hover:text-brandAccent transition-colors">Find PG</Link>
          <span>/</span>
          <span className="text-brandNavy font-semibold">{pg.name}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brandNavy text-sm font-semibold mb-6 hover:text-brandAccent transition-colors group"
        >
          <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="bg-brandNavy text-white text-[10px] font-bold px-3 py-1 rounded-xl uppercase tracking-wider">
                {pg.gender} Only
              </span>
              {pg.availableRooms > 0 ? (
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-xl">
                  {pg.availableRooms} Rooms Available
                </span>
              ) : (
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-xl">
                  Full — Waitlist Only
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brandNavy font-sans">{pg.name}</h1>
            <p className="flex items-center gap-1.5 text-brandTextSec text-sm mt-1.5">
              <HiOutlineLocationMarker className="text-brandAccent" />
              {pg.address}
            </p>
            <p className="text-xs font-semibold text-brandAccent font-mono mt-0.5 pl-5">{pg.distanceLabel}</p>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-brandNavy/5 shadow-soft flex-shrink-0">
            <div className="text-right">
              <p className="text-2xl font-extrabold text-brandNavy font-mono">{avgRating}</p>
              <p className="text-[10px] text-brandTextSec font-semibold">{pg.reviewCount} Reviews</p>
            </div>
            <StarRating rating={pg.rating} size="md" />
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="mb-8">
          <ImageGallery images={pg.images} name={pg.name} />
        </div>

        {/* QUICK INFO CHIPS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <InfoChip label="Monthly Rent" value={`₹${pg.rent.toLocaleString('en-IN')}`} />
          <InfoChip label="Mess Fee" value={pg.messFee > 0 ? `₹${pg.messFee.toLocaleString('en-IN')}` : 'Not Included'} />
          <InfoChip label="Security Deposit" value={`₹${pg.securityDeposit.toLocaleString('en-IN')}`} />
          <InfoChip label="Curfew Time" value={pg.curfewTime} icon={<HiOutlineClock />} />
        </div>

        {/* Sharing Options */}
        <div className="bg-white rounded-2xl border border-brandNavy/5 shadow-soft p-5 mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-brandTextSec uppercase tracking-wider mr-2">Sharing Options:</span>
          {pg.sharingOptions.map(s => (
            <span key={s} className="bg-brandAccent/10 text-brandAccent text-xs font-bold px-3 py-1.5 rounded-xl border border-brandAccent/20">
              {s}
            </span>
          ))}
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* LEFT: Main Content */}
          <div className="flex-grow min-w-0 flex flex-col gap-8">

            {/* About */}
            <section className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6">
              <h2 className="text-lg font-bold text-brandNavy mb-4 font-sans">About this PG</h2>
              <p className="text-sm text-brandTextSec leading-relaxed">{pg.about}</p>
            </section>

            {/* Facilities */}
            <section className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6">
              <h2 className="text-lg font-bold text-brandNavy mb-5 font-sans">Facilities & Amenities</h2>
              <FacilityBadge facilities={pg.facilities} />
            </section>

            {/* Curfew & Nearby */}
            <section className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6">
              <h2 className="text-lg font-bold text-brandNavy mb-5 font-sans">Curfew & Nearby Places</h2>
              <div className="flex items-center gap-3 mb-5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <HiOutlineClock className="text-amber-500 text-xl flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Daily Curfew</p>
                  <p className="text-sm font-bold text-amber-800">{pg.curfewTime}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(pg.nearbyPlaces).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2.5 bg-brandBgSoft rounded-xl p-3">
                    <HiOutlineLocationMarker className="text-brandAccent text-base mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-brandTextSec uppercase tracking-wider capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs font-semibold text-brandNavy">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Google Maps */}
            <section className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6">
              <h2 className="text-lg font-bold text-brandNavy mb-4 font-sans">Location</h2>
              <p className="text-sm text-brandTextSec mb-4">{pg.address}</p>
              <a
                href={pg.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-brandNavy text-white font-semibold rounded-xl hover:bg-brandMedium transition-all duration-300 shadow-sm hover:shadow-md text-sm"
              >
                <HiOutlineMap className="text-lg" />
                Open in Google Maps
              </a>
            </section>

            {/* REVIEWS */}
            <section>
              <h2 className="text-xl font-bold text-brandNavy mb-6 font-sans">Student Reviews</h2>

              {/* Rating Summary */}
              <div className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-brandNavy font-mono">{avgRating}</p>
                    <StarRating rating={pg.rating} size="lg" />
                    <p className="text-xs text-brandTextSec font-semibold mt-1">{pg.reviewCount} Reviews</p>
                  </div>
                  <div className="flex-grow w-full">
                    <RatingBreakdown reviews={pg.reviews} />
                  </div>
                </div>
              </div>

              {/* Add Review Form */}
              <div className="mb-6">
                <ReviewForm pgId={pg.id} onSubmit={handleReviewSubmit} />
              </div>

              {/* Review Cards */}
              <div className="flex flex-col gap-4">
                {pg.reviews.length > 0 ? (
                  pg.reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <div className="bg-white rounded-2xl border border-brandNavy/5 p-10 text-center">
                    <p className="text-brandTextSec text-sm">No reviews yet. Be the first to review this PG!</p>
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* RIGHT: Sticky Contact Card */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-4">

              {/* Contact Card */}
              <div className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6">
                <h3 className="font-bold text-brandNavy text-base mb-4">Contact Owner</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 bg-brandBgSoft rounded-xl">
                    <div className="w-10 h-10 bg-brandAccent/10 rounded-xl flex items-center justify-center text-brandAccent">
                      <HiOutlineUsers className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] text-brandTextSec font-bold uppercase">Owner</p>
                      <p className="text-sm font-bold text-brandNavy">{pg.ownerName}</p>
                    </div>
                  </div>

                  <a
                    href={`tel:${pg.phone}`}
                    className="flex items-center gap-3 p-3.5 bg-brandNavy text-white rounded-xl font-semibold text-sm hover:bg-brandMedium transition-colors"
                  >
                    <HiOutlinePhone className="text-lg" />
                    {pg.phone}
                  </a>

                  {pg.email && (
                    <a
                      href={`mailto:${pg.email}`}
                      className="flex items-center gap-3 p-3.5 bg-brandBgSoft border border-brandNavy/10 text-brandNavy rounded-xl font-semibold text-sm hover:border-brandAccent transition-colors"
                    >
                      <HiOutlineMail className="text-lg text-brandAccent" />
                      <span className="truncate text-xs">{pg.email}</span>
                    </a>
                  )}

                  {pg.website && (
                    <a
                      href={pg.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 bg-brandBgSoft border border-brandNavy/10 text-brandNavy rounded-xl font-semibold text-sm hover:border-brandAccent transition-colors"
                    >
                      <HiOutlineGlobe className="text-lg text-brandAccent" />
                      Official Website
                    </a>
                  )}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-start gap-2.5">
                  <HiOutlineShieldCheck className="text-amber-500 text-lg flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">Important Note</p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      AgnesNest only helps students discover trusted PGs. Please contact the PG owner directly for availability and booking.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Listings */}
              <Link
                to="/find-pg"
                className="flex items-center justify-center gap-2 w-full py-3 border border-brandNavy/15 rounded-xl text-brandNavy text-sm font-semibold hover:border-brandAccent hover:text-brandAccent transition-colors"
              >
                <HiOutlineArrowLeft className="text-sm" />
                Back to All PG Listings
              </Link>

            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PGDetails;
