import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi';

const LostFoundCard = ({ item, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0 group">
        <img
          src={item.image}
          alt={item.itemName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-brandNavy/90 text-white text-[10px] font-bold px-3 py-1 rounded-xl tracking-wider uppercase shadow-sm">
          Found Item
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        <h3 className="font-bold text-brandNavy text-base font-sans leading-tight line-clamp-1">{item.itemName}</h3>
        
        <p className="text-sm text-brandTextSec line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-[11px] text-brandTextSec font-medium mt-auto pt-3">
          <div className="flex items-start gap-1.5">
            <HiOutlineLocationMarker className="text-brandAccent text-sm flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{item.foundLocation}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineCalendar className="text-brandTextSec text-sm flex-shrink-0" />
            <span>Found on: {item.foundDate}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/lost-found/${item.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 bg-brandBgSoft hover:bg-brandNavy hover:text-white text-brandNavy text-xs font-bold rounded-xl border border-brandNavy/5 transition-all duration-300 group"
        >
          View Details
          <HiOutlineArrowRight className="group-hover:translate-x-0.5 transition-transform text-sm" />
        </Link>
      </div>
    </motion.div>
  );
};

export default LostFoundCard;
