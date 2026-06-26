import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlinePhone, HiOutlineMail, HiOutlineShieldCheck,
  HiOutlineUsers, HiChevronDown, HiChevronUp, HiOutlineChatAlt2
} from 'react-icons/hi';

const SellerCard = ({ seller, listing }) => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft overflow-hidden">
      {/* Seller Info */}
      <div className="p-6 border-b border-brandNavy/5">
        <h3 className="font-bold text-brandNavy text-sm mb-4">Listed By</h3>
        <div className="flex items-center gap-3">
          <img
            src={seller.avatar}
            alt={seller.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-brandBgSoft flex-shrink-0"
          />
          <div>
            <p className="font-bold text-brandNavy text-sm">{seller.name}</p>
            <p className="text-[11px] text-brandTextSec font-medium">{seller.course} · {seller.year}</p>
            <p className="text-[10px] text-brandAccent font-bold mt-0.5">St Agnes College Student</p>
          </div>
        </div>

        {/* Preferred contact method */}
        <div className="mt-4 flex items-center gap-2 text-xs text-brandTextSec font-medium bg-brandBgSoft rounded-xl px-3 py-2">
          <HiOutlineChatAlt2 className="text-brandAccent flex-shrink-0" />
          Prefers: <span className="font-bold text-brandNavy">{seller.preferredContact ?? listing?.preferredContact ?? 'WhatsApp'}</span>
        </div>
      </div>

      {/* Connect with Seller */}
      <div className="p-6">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setContactOpen(o => !o)}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-brandNavy text-white font-bold rounded-2xl hover:bg-brandMedium transition-all duration-300 shadow-sm hover:shadow-md text-sm"
        >
          <HiOutlineUsers className="text-base" />
          Connect with Seller
          {contactOpen ? <HiChevronUp className="ml-1" /> : <HiChevronDown className="ml-1" />}
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
                  href={`tel:${seller.phone}`}
                  className="flex items-center gap-3 p-3.5 bg-brandNavy text-white rounded-xl font-semibold text-sm hover:bg-brandMedium transition-colors"
                >
                  <HiOutlinePhone className="text-lg" />
                  {seller.phone}
                </a>
                <a
                  href={`mailto:${seller.email}`}
                  className="flex items-center gap-3 p-3.5 bg-brandBgSoft border border-brandNavy/10 text-brandNavy rounded-xl font-semibold text-sm hover:border-brandAccent transition-colors"
                >
                  <HiOutlineMail className="text-lg text-brandAccent" />
                  <span className="truncate text-xs">{seller.email}</span>
                </a>
              </div>

              {/* Disclaimer */}
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-start gap-2.5">
                  <HiOutlineShieldCheck className="text-amber-500 text-lg flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    AgnesNest does not handle payments or transactions. It only helps students connect with each other. Buyers and sellers should communicate directly to discuss the item, price (if applicable), pickup location, and other arrangements.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SellerCard;
