import React from 'react';
import { motion } from 'framer-motion';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useMarketplace } from '../../context/MarketplaceContext';

const WishlistButton = ({ listingId, className = '' }) => {
  const { toggleWishlist, isWishlisted } = useMarketplace();
  const saved = isWishlisted(listingId);

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.15 }}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(listingId); }}
      title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-white/50 transition-colors ${
        saved ? 'text-red-500' : 'text-brandTextSec hover:text-red-400'
      } ${className}`}
    >
      {saved ? <HiHeart className="text-base" /> : <HiOutlineHeart className="text-base" />}
    </motion.button>
  );
};

export default WishlistButton;
