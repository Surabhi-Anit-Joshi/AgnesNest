import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineArrowLeft, HiOutlineLocationMarker, HiOutlineClock,
  HiOutlineTag, HiOutlineFlag, HiOutlineCalendar
} from 'react-icons/hi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProductGallery from '../../components/marketplace/ProductGallery';
import SellerCard from '../../components/marketplace/SellerCard';
import ProductStatusBadge from '../../components/marketplace/ProductStatusBadge';
import WishlistButton from '../../components/marketplace/WishlistButton';
import MarketplaceCard from '../../components/marketplace/MarketplaceCard';
import { useMarketplace } from '../../context/MarketplaceContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getListing, activeListings } = useMarketplace();
  const listing = getListing(id);

  // Scroll to top when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!listing) {
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
            <Link to="/marketplace" className="px-6 py-3 bg-brandNavy text-white font-semibold rounded-xl text-sm hover:bg-brandMedium transition-colors">
              Browse Marketplace
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isFree = listing.listingType === 'free';
  const isSold = listing.status === 'sold';

  // Similar items (same category, not same item, max 4)
  const similarItems = activeListings
    .filter(l => l.category === listing.category && l.id !== listing.id && l.status !== 'sold')
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-brandBgSoft flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-grow">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-brandTextSec font-medium mb-6 flex-wrap">
          <Link to="/" className="hover:text-brandAccent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/marketplace" className="hover:text-brandAccent transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-brandNavy font-semibold">{listing.category}</span>
          <span>/</span>
          <span className="text-brandNavy font-semibold truncate max-w-[200px]">{listing.title}</span>
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
          {/* Left: Gallery & Details */}
          <div className="flex-grow min-w-0 flex flex-col gap-8">
            
            {/* Gallery */}
            <div className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-4 sm:p-6 relative">
              {isSold && (
                <div className="absolute top-8 left-8 z-10 bg-black/50 text-white font-extrabold text-2xl tracking-widest rotate-[-12deg] border-4 border-white px-4 py-1 rounded-xl backdrop-blur-sm">
                  SOLD
                </div>
              )}
              <div className={isSold ? 'opacity-80 grayscale-[30%]' : ''}>
                <ProductGallery images={listing.images} name={listing.title} />
              </div>
            </div>

            {/* Main Info */}
            <section className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6 sm:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-brandAccent uppercase tracking-wider bg-brandAccent/10 px-2.5 py-1 rounded-lg">
                      {listing.category}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-brandNavy font-sans mt-3 leading-tight">
                      {listing.title}
                    </h1>
                  </div>
                  <div className="flex-shrink-0">
                    <WishlistButton listingId={listing.id} className="w-10 h-10 border-brandNavy/10" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {isFree && !isSold ? (
                    <span className="bg-green-500 text-white text-sm font-extrabold px-3 py-1.5 rounded-xl tracking-wider">FREE</span>
                  ) : (
                    <ProductStatusBadge status={listing.status} size="lg" />
                  )}
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${
                    listing.condition === 'New' ? 'bg-green-100 text-green-700' :
                    listing.condition === 'Like New' ? 'bg-blue-100 text-blue-700' :
                    listing.condition === 'Good' ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    Condition: {listing.condition}
                  </span>
                  {listing.course && (
                    <span className="text-xs font-bold bg-brandBgSoft text-brandNavy px-3 py-1.5 rounded-xl border border-brandNavy/10">
                      Course: {listing.course}
                    </span>
                  )}
                </div>

                {!isFree && (
                  <div className="mt-2 flex items-baseline gap-2 pb-6 border-b border-brandNavy/5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-brandNavy font-mono">
                      ₹{listing.price.toLocaleString('en-IN')}
                    </span>
                    {listing.negotiable && (
                      <span className="text-xs font-bold text-brandTextSec bg-brandBgSoft px-2.5 py-1 rounded-lg">
                        Negotiable
                      </span>
                    )}
                  </div>
                )}
                {isFree && <div className="pb-6 border-b border-brandNavy/5" />}

                {/* Description */}
                <div>
                  <h3 className="font-bold text-brandNavy text-base mb-3">Description</h3>
                  <p className="text-sm text-brandTextSec leading-relaxed whitespace-pre-line">
                    {listing.description}
                  </p>
                </div>

                {/* Additional Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-start gap-3 bg-brandBgSoft rounded-2xl p-4 border border-brandNavy/5">
                    <HiOutlineLocationMarker className="text-brandAccent text-xl flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-brandTextSec uppercase tracking-wider mb-0.5">Pickup Location</p>
                      <p className="text-sm font-semibold text-brandNavy">{listing.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-brandBgSoft rounded-2xl p-4 border border-brandNavy/5">
                    <HiOutlineCalendar className="text-brandAccent text-xl flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-brandTextSec uppercase tracking-wider mb-0.5">Available Until</p>
                      <p className="text-sm font-semibold text-brandNavy">{listing.availableUntil || 'Until further notice'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-brandBgSoft rounded-2xl p-4 border border-brandNavy/5">
                    <HiOutlineClock className="text-brandAccent text-xl flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-brandTextSec uppercase tracking-wider mb-0.5">Posted On</p>
                      <p className="text-sm font-semibold text-brandNavy">{listing.postedDate}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-brandNavy/5 flex justify-end">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-brandTextSec hover:text-red-500 transition-colors">
                    <HiOutlineFlag className="text-sm" /> Report Listing
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Seller & Actions */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              <SellerCard seller={listing.seller} listing={listing} />
            </div>
          </aside>
        </div>

        {/* Similar Listings */}
        {similarItems.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brandAccent rounded-full" />
              <h2 className="text-xl font-bold text-brandNavy">You may also like</h2>
              <span className="text-xs text-brandTextSec font-medium ml-1">· Similar {listing.category.toLowerCase()}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarItems.map((l, i) => (
                <MarketplaceCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
