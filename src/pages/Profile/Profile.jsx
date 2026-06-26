import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineUserCircle, HiOutlineMail, HiOutlinePhone,
  HiOutlineTag, HiOutlineHeart, HiOutlineLogout, HiOutlineTrash, HiOutlineCheck
} from 'react-icons/hi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import MarketplaceCard from '../../components/marketplace/MarketplaceCard';
import ProductStatusBadge from '../../components/marketplace/ProductStatusBadge';
import { useMarketplace } from '../../context/MarketplaceContext';

const CURRENT_USER = {
  name: "Jane D'Souza",
  course: 'B.Com',
  year: '3rd Year',
  phone: '+91 6361079075',
  email: 'jane@stagnes.edu.in',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80',
};

const Profile = () => {
  const { listings, updateStatus, deleteListing, wishlist, getListing } = useMarketplace();
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'wishlist'
  
  // Filter listings belonging to the current user
  const myListings = listings.filter(l => l.seller?.email === CURRENT_USER.email);
  const activeListings = myListings.filter(l => l.status !== 'sold');
  const soldListings = myListings.filter(l => l.status === 'sold');
  
  // Wishlist items
  const wishlistItems = wishlist.map(id => getListing(id)).filter(Boolean);

  const handleMarkAsSold = (id) => {
    if (window.confirm('Are you sure you want to mark this item as Sold?')) {
      updateStatus(id, 'sold');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      deleteListing(id);
    }
  };

  return (
    <div className="min-h-screen bg-brandBgSoft flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 flex-grow flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Profile Card */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6 sticky top-24">
            <div className="text-center mb-6">
              <img 
                src={CURRENT_USER.avatar} 
                alt={CURRENT_USER.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-brandBgSoft mx-auto mb-3"
              />
              <h2 className="text-xl font-bold text-brandNavy">{CURRENT_USER.name}</h2>
              <p className="text-sm font-medium text-brandTextSec">{CURRENT_USER.course} · {CURRENT_USER.year}</p>
            </div>
            
            <div className="flex flex-col gap-3 pt-6 border-t border-brandNavy/5 mb-6">
              <div className="flex items-center gap-3 text-sm text-brandNavy font-medium bg-brandBgSoft px-4 py-3 rounded-xl border border-brandNavy/5">
                <HiOutlinePhone className="text-brandAccent text-lg flex-shrink-0" />
                {CURRENT_USER.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-brandNavy font-medium bg-brandBgSoft px-4 py-3 rounded-xl border border-brandNavy/5">
                <HiOutlineMail className="text-brandAccent text-lg flex-shrink-0" />
                <span className="truncate">{CURRENT_USER.email}</span>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors text-sm">
              <HiOutlineLogout className="text-lg" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow min-w-0 flex flex-col">
          
          <div className="flex items-center gap-2 border-b border-brandNavy/10 mb-6">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                activeTab === 'listings' ? 'text-brandNavy border-brandNavy' : 'text-brandTextSec border-transparent hover:text-brandNavy'
              }`}
            >
              <HiOutlineTag className="text-lg" />
              My Listings ({myListings.length})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
                activeTab === 'wishlist' ? 'text-brandNavy border-brandNavy' : 'text-brandTextSec border-transparent hover:text-brandNavy'
              }`}
            >
              <HiOutlineHeart className="text-lg" />
              Saved Items ({wishlistItems.length})
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'listings' && (
              <motion.div key="listings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                
                {/* Active Listings */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-brandNavy mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" /> Active Listings
                  </h3>
                  
                  {activeListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {activeListings.map(listing => (
                        <div key={listing.id} className="relative group">
                          <MarketplaceCard listing={listing} />
                          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex flex-col items-center justify-center gap-3 pointer-events-none group-hover:pointer-events-auto border border-brandNavy/10 p-6 z-10">
                            <h4 className="font-bold text-brandNavy text-center mb-2 line-clamp-2">{listing.title}</h4>
                            <button
                              onClick={() => handleMarkAsSold(listing.id)}
                              className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors text-sm shadow-sm"
                            >
                              <HiOutlineCheck className="text-lg" /> Mark as Sold
                            </button>
                            <button
                              onClick={() => handleDelete(listing.id)}
                              className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors text-sm"
                            >
                              <HiOutlineTrash className="text-lg" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-brandNavy/5 p-8 text-center shadow-soft">
                      <p className="text-brandTextSec text-sm">You have no active listings.</p>
                    </div>
                  )}
                </div>

                {/* Sold Listings */}
                <div>
                  <h3 className="text-lg font-bold text-brandNavy mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Sold Listings
                  </h3>
                  
                  {soldListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {soldListings.map(listing => (
                        <div key={listing.id} className="relative opacity-70">
                           <MarketplaceCard listing={listing} />
                           {/* Quick delete for sold items */}
                           <button
                              onClick={() => handleDelete(listing.id)}
                              className="absolute top-2 left-2 z-20 w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-50"
                              title="Delete Listing"
                            >
                              <HiOutlineTrash />
                            </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-brandNavy/5 p-8 text-center shadow-soft">
                      <p className="text-brandTextSec text-sm">No sold items yet.</p>
                    </div>
                  )}
                </div>

              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {wishlistItems.map(listing => (
                      <MarketplaceCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-brandNavy/5 p-16 text-center shadow-soft">
                    <div className="w-16 h-16 bg-brandBgSoft rounded-2xl flex items-center justify-center mx-auto mb-4 text-brandTextSec text-3xl">
                      <HiOutlineHeart />
                    </div>
                    <h3 className="text-xl font-bold text-brandNavy mb-2">No Saved Items</h3>
                    <p className="text-brandTextSec text-sm">Items you save will appear here.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
