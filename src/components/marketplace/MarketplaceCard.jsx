import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineArrowRight } from 'react-icons/hi';
import ProductStatusBadge from './ProductStatusBadge';
import WishlistButton from './WishlistButton';

const CONDITION_COLORS = {
  'New':       'bg-green-100 text-green-700',
  'Like New':  'bg-blue-100 text-blue-700',
  'Good':      'bg-amber-100 text-amber-700',
  'Fair':      'bg-orange-100 text-orange-700',
};

const MarketplaceCard = ({ listing, index = 0 }) => {
  const image = listing.images?.[0] || '';
  const isFree = listing.listingType === 'free';
  const isSold = listing.status === 'sold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: isSold ? 0 : -5 }}
      className="bg-white rounded-3xl overflow-hidden border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0 group">
        <img
          src={image}
          alt={listing.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${!isSold ? 'group-hover:scale-105' : 'grayscale-[30%]'}`}
        />

        {/* SOLD overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-extrabold text-2xl tracking-widest rotate-[-12deg] border-4 border-white px-4 py-1 rounded-xl">SOLD</span>
          </div>
        )}

        {/* Top-left: FREE or status */}
        <div className="absolute top-3 left-3">
          {isFree && !isSold
            ? <span className="bg-green-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-xl tracking-wider">FREE</span>
            : <ProductStatusBadge status={listing.status} />
          }
        </div>

        {/* Top-right: Wishlist */}
        {!isSold && (
          <div className="absolute top-3 right-3">
            <WishlistButton listingId={listing.id} />
          </div>
        )}

        {/* Condition badge — bottom */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${CONDITION_COLORS[listing.condition] || 'bg-gray-100 text-gray-600'}`}>
            {listing.condition}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        <div className="flex flex-col gap-1">
          {/* Category */}
          <span className="text-[10px] font-bold text-brandAccent uppercase tracking-wider">{listing.category}</span>
          {/* Title */}
          <h3 className="font-bold text-brandNavy text-sm font-sans leading-tight line-clamp-2">{listing.title}</h3>
        </div>

        {/* Price */}
        <div>
          {isFree ? (
            <span className="text-green-600 font-extrabold text-lg">FREE</span>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-brandNavy font-mono">₹{listing.price.toLocaleString('en-IN')}</span>
              {listing.negotiable && (
                <span className="text-[10px] font-bold text-brandTextSec bg-brandBgSoft px-2 py-0.5 rounded-lg">Negotiable</span>
              )}
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-1 text-[11px] text-brandTextSec font-medium mt-auto">
          <div className="flex items-center gap-1">
            <HiOutlineLocationMarker className="text-brandAccent flex-shrink-0" />
            <span className="truncate">{listing.pickupLocation}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineClock className="text-brandTextSec flex-shrink-0" />
            <span>By {listing.seller.name} · {listing.postedDate}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/product/${listing.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 mt-1 bg-brandBgSoft hover:bg-brandNavy hover:text-white text-brandNavy text-xs font-bold rounded-xl border border-brandNavy/5 transition-all duration-300 group"
        >
          View Details
          <HiOutlineArrowRight className="group-hover:translate-x-0.5 transition-transform text-sm" />
        </Link>
      </div>
    </motion.div>
  );
};

export default MarketplaceCard;
