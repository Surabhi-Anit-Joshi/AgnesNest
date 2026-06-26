import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const ImageGallery = ({ images = [], name = '' }) => {
  const [lightbox, setLightbox] = useState(null); // null = closed, index = open

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => (i - 1 + images.length) % images.length);
  const next = () => setLightbox(i => (i + 1) % images.length);

  if (!images.length) return null;

  const [main, ...thumbs] = images;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-2 h-72 sm:h-96 rounded-2xl overflow-hidden">
        {/* Main image — takes 2/3 width */}
        <div
          className="col-span-4 sm:col-span-3 relative cursor-pointer group overflow-hidden"
          onClick={() => openLightbox(0)}
        >
          <img
            src={main}
            alt={`${name} - main`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Thumbnails — 1/3 width stacked */}
        <div className="hidden sm:flex flex-col gap-2 col-span-1">
          {thumbs.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="relative flex-1 cursor-pointer group overflow-hidden rounded-r-none"
              onClick={() => openLightbox(i + 1)}
            >
              <img
                src={img}
                alt={`${name} ${i + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Show all photos overlay on last thumb */}
              {i === 2 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+{images.length - 4} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl p-2 rounded-xl hover:bg-white/10"
            >
              <HiOutlineX />
            </button>

            {/* Navigation */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white/80 hover:text-white text-3xl p-3 rounded-xl hover:bg-white/10"
            >
              <HiChevronLeft />
            </button>
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-16 text-white/80 hover:text-white text-3xl p-3 rounded-xl hover:bg-white/10"
            >
              <HiChevronRight />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[lightbox]}
              alt={`${name} ${lightbox + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
