import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineLocationMarker, HiOutlineArrowRight } from 'react-icons/hi';
import { FiWifi, FiCoffee } from 'react-icons/fi';

const PGCard = ({ pg, index = 0 }) => {
  const image = pg.images ? pg.images[0] : pg.image;
  const distLabel = pg.distanceLabel ?? pg.distance;
  const rentDisplay = typeof pg.rent === 'number'
    ? `₹${pg.rent.toLocaleString('en-IN')}`
    : pg.rent;
  const reviewCount = pg.reviewCount ?? pg.reviewsCount ?? 0;
  const wifiAvail = pg.facilities?.wifi ?? pg.wifi;
  const foodAvail = pg.facilities?.food ?? pg.food;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-3xl overflow-hidden border border-brandNavy/5 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full text-left"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden group flex-shrink-0">
        <img
          src={image}
          alt={pg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gender badge */}
        <div className="absolute top-3 left-3 bg-brandNavy/80 backdrop-blur-sm px-3 py-1 rounded-xl text-[10px] font-bold text-white tracking-wider uppercase">
          {pg.gender} Only
        </div>
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-bold text-brandNavy flex items-center gap-1 shadow-sm">
          <HiStar className="text-amber-500" />
          <span>{pg.rating.toFixed(1)}</span>
          <span className="text-[10px] text-brandTextSec font-medium">({reviewCount})</span>
        </div>
        {/* Available rooms */}
        {pg.availableRooms !== undefined && (
          <div className="absolute bottom-3 left-3 bg-green-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
            {pg.availableRooms} {pg.availableRooms === 1 ? 'Room' : 'Rooms'} Available
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col justify-between flex-grow gap-3">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-brandNavy text-base font-sans leading-tight line-clamp-1">{pg.name}</h3>

          {/* Location */}
          <div className="flex flex-col gap-0.5 text-[12px] text-brandTextSec font-medium">
            <div className="flex items-center gap-1">
              <HiOutlineLocationMarker className="text-brandAccent text-sm flex-shrink-0" />
              <span className="truncate">{pg.location}</span>
            </div>
            <p className="pl-4 text-xs font-semibold text-brandAccent font-mono">{distLabel}</p>
          </div>

          {/* Sharing options */}
          {pg.sharingOptions && (
            <div className="flex flex-wrap gap-1 mt-1">
              {pg.sharingOptions.map(opt => (
                <span key={opt} className="text-[10px] font-bold text-brandMedium bg-brandBgSoft px-2 py-0.5 rounded-lg">
                  {opt}
                </span>
              ))}
            </div>
          )}

          {/* Amenity badges */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            {wifiAvail && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-brandMedium bg-brandBgSoft px-2.5 py-1 rounded-lg">
                <FiWifi /> WiFi
              </span>
            )}
            {foodAvail && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-brandMedium bg-brandBgSoft px-2.5 py-1 rounded-lg">
                <FiCoffee /> Food
              </span>
            )}
          </div>
        </div>

        {/* Rent + CTA */}
        <div className="pt-3 border-t border-brandNavy/5 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] text-brandTextSec font-bold block uppercase tracking-wider">From</span>
            <span className="text-base font-extrabold text-brandNavy font-mono">
              {rentDisplay}
              <span className="text-[10px] text-brandTextSec font-medium">/mo</span>
            </span>
          </div>
          <Link
            to={`/pg/${pg.id}`}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-brandBgSoft hover:bg-brandNavy hover:text-white text-brandNavy text-xs font-bold rounded-xl transition-all duration-300 border border-brandNavy/5 group flex-shrink-0"
          >
            View Details
            <HiOutlineArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PGCard;
