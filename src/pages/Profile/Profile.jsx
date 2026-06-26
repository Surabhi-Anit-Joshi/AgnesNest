import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineUserCircle, HiOutlineMail, HiOutlinePhone,
  HiOutlineTag, HiOutlineHeart, HiOutlineLogout, HiOutlineTrash, HiOutlineCheck,
  HiOutlineSearchCircle, HiOutlinePencilAlt, HiOutlineX, HiCheckCircle
} from 'react-icons/hi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import MarketplaceCard from '../../components/marketplace/MarketplaceCard';
import LostFoundCard from '../../components/lostfound/LostFoundCard';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLostFound } from '../../context/LostFoundContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const inputCls = 'w-full text-sm text-brandNavy placeholder-brandTextSec/40 bg-brandBgSoft border border-brandNavy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandAccent/20 focus:border-brandAccent transition-all';
const FieldLabel = ({ children }) => (
  <label className="block text-[11px] font-bold text-brandNavy uppercase tracking-wider mb-1.5">
    {children}
  </label>
);

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { listings, updateStatus, deleteListing, wishlist, getListing } = useMarketplace();
  const { items: lostItems, deleteItem: deleteLostItem, updateItemStatus: updateLostItemStatus } = useLostFound();
  
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'lostfound' | 'wishlist'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(user || {});
  const [editSuccess, setEditSuccess] = useState(false);

  // If no user, show login prompt (or could redirect, but let's just show a prompt)
  if (!user) {
    return (
      <div className="min-h-screen bg-brandBgSoft flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-soft p-10 border border-brandNavy/5 text-center">
            <h1 className="text-2xl font-bold text-brandNavy mb-3">Not Logged In</h1>
            <p className="text-brandTextSec mb-8 text-sm">Please log in to view your profile and manage your listings.</p>
            <button onClick={() => navigate('/login')} className="w-full py-4 px-6 bg-brandNavy text-white font-medium rounded-2xl hover:bg-brandMedium transition-colors shadow-sm">
              Go to Login
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter items belonging to the current user
  const myListings = listings.filter(l => l.seller?.id === user.id || l.seller?.email === user.email);
  const activeListings = myListings.filter(l => l.status !== 'sold');
  const soldListings = myListings.filter(l => l.status === 'sold');
  
  const myLostItems = lostItems.filter(l => l.userId === user.id || l.email === user.email);
  const activeLostItems = myLostItems.filter(l => l.status !== 'resolved');
  const resolvedLostItems = myLostItems.filter(l => l.status === 'resolved');
  
  const wishlistItems = wishlist.map(id => getListing(id)).filter(Boolean);

  const handleMarkAsSold = (id) => {
    if (window.confirm('Are you sure you want to mark this item as Sold?')) updateStatus(id, 'sold');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) deleteListing(id);
  };

  const handleDeleteLostItem = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) deleteLostItem(id);
  };

  const handleMarkAsResolved = (id) => {
    if (window.confirm('Are you sure you want to mark this item as Resolved?')) updateLostItemStatus(id, 'resolved');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setEditSuccess(true);
    setTimeout(() => {
      setEditSuccess(false);
      setIsEditModalOpen(false);
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
                src={user.avatar} 
                alt={user.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-brandBgSoft mx-auto mb-3"
              />
              <h2 className="text-xl font-bold text-brandNavy">{user.name}</h2>
              <p className="text-sm font-medium text-brandTextSec">{user.course} · {user.year}</p>
            </div>
            
            <div className="flex flex-col gap-3 pt-6 border-t border-brandNavy/5 mb-6">
              <div className="flex items-center gap-3 text-sm text-brandNavy font-medium bg-brandBgSoft px-4 py-3 rounded-xl border border-brandNavy/5">
                <HiOutlinePhone className="text-brandAccent text-lg flex-shrink-0" />
                {user.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-brandNavy font-medium bg-brandBgSoft px-4 py-3 rounded-xl border border-brandNavy/5">
                <HiOutlineMail className="text-brandAccent text-lg flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => { setEditForm(user); setIsEditModalOpen(true); }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-brandBgSoft text-brandNavy font-bold rounded-xl border border-brandNavy/5 hover:bg-brandNavy/5 transition-colors text-sm"
              >
                <HiOutlinePencilAlt className="text-lg" /> Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors text-sm"
              >
                <HiOutlineLogout className="text-lg" /> Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow min-w-0 flex flex-col">
          
          <div className="flex items-center gap-2 border-b border-brandNavy/10 mb-6 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'listings' ? 'text-brandNavy border-brandNavy' : 'text-brandTextSec border-transparent hover:text-brandNavy'
              }`}
            >
              <HiOutlineTag className="text-lg" />
              My Listings ({myListings.length})
            </button>
            <button
              onClick={() => setActiveTab('lostfound')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'lostfound' ? 'text-brandNavy border-brandNavy' : 'text-brandTextSec border-transparent hover:text-brandNavy'
              }`}
            >
              <HiOutlineSearchCircle className="text-lg" />
              My Lost & Found ({myLostItems.length})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'wishlist' ? 'text-brandNavy border-brandNavy' : 'text-brandTextSec border-transparent hover:text-brandNavy'
              }`}
            >
              <HiOutlineHeart className="text-lg" />
              Saved ({wishlistItems.length})
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'listings' && (
              <motion.div key="listings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-brandNavy mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" /> Active Listings
                  </h3>
                  {activeListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {activeListings.map(listing => (
                        <div key={listing.id} className="relative group">
                          <MarketplaceCard listing={listing} />
                          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex flex-col items-center justify-center gap-3 pointer-events-none group-hover:pointer-events-auto border border-brandNavy/10 p-6 z-10 shadow-premium">
                            <h4 className="font-bold text-brandNavy text-center mb-2 line-clamp-2">{listing.title}</h4>
                            <button onClick={() => handleMarkAsSold(listing.id)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors text-sm">
                              <HiOutlineCheck className="text-lg" /> Mark as Sold
                            </button>
                            <button onClick={() => handleDelete(listing.id)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors text-sm">
                              <HiOutlineTrash className="text-lg" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-brandNavy/5 p-8 text-center shadow-soft"><p className="text-brandTextSec text-sm">You have no active listings.</p></div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brandNavy mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Sold Listings
                  </h3>
                  {soldListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {soldListings.map(listing => (
                        <div key={listing.id} className="relative opacity-70">
                           <MarketplaceCard listing={listing} />
                           <button onClick={() => handleDelete(listing.id)} className="absolute top-2 left-2 z-20 w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-50"><HiOutlineTrash /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-brandNavy/5 p-8 text-center shadow-soft"><p className="text-brandTextSec text-sm">No sold items yet.</p></div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'lostfound' && (
              <motion.div key="lostfound" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-brandNavy mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" /> Active Posts
                  </h3>
                  {activeLostItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {activeLostItems.map(item => (
                        <div key={item.id} className="relative group">
                          <LostFoundCard item={item} />
                          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex flex-col items-center justify-center gap-3 pointer-events-none group-hover:pointer-events-auto border border-brandNavy/10 p-6 z-10 shadow-premium">
                            <h4 className="font-bold text-brandNavy text-center mb-2 line-clamp-2">{item.itemName}</h4>
                            <button onClick={() => handleMarkAsResolved(item.id)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors text-sm">
                              <HiOutlineCheck className="text-lg" /> Mark as Resolved
                            </button>
                            <button onClick={() => handleDeleteLostItem(item.id)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors text-sm">
                              <HiOutlineTrash className="text-lg" /> Delete Post
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-brandNavy/5 p-10 text-center shadow-soft">
                      <p className="text-brandTextSec text-sm">You have no active lost & found posts.</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brandNavy mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400" /> Resolved Posts
                  </h3>
                  {resolvedLostItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {resolvedLostItems.map(item => (
                        <div key={item.id} className="relative opacity-70">
                          <LostFoundCard item={item} />
                          <button onClick={() => handleDeleteLostItem(item.id)} className="absolute top-2 left-2 z-20 w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-50">
                            <HiOutlineTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-brandNavy/5 p-10 text-center shadow-soft">
                      <p className="text-brandTextSec text-sm">No resolved posts yet.</p>
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

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden">
              
              <div className="flex items-center justify-between p-5 border-b border-brandNavy/5 bg-brandBgSoft">
                <h3 className="font-bold text-brandNavy">Edit Profile</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-brandTextSec hover:text-brandNavy"><HiOutlineX className="text-xl" /></button>
              </div>

              {editSuccess ? (
                <div className="p-10 flex flex-col items-center justify-center">
                  <HiCheckCircle className="text-6xl text-green-500 mb-4" />
                  <p className="font-bold text-brandNavy text-lg">Profile Updated</p>
                </div>
              ) : (
                <form onSubmit={handleEditSubmit} className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                  <div>
                    <FieldLabel>Profile Image URL</FieldLabel>
                    <input type="text" value={editForm.avatar || ''} onChange={e => setEditForm({...editForm, avatar: e.target.value})} className={inputCls} />
                  </div>
                  <div>
                    <FieldLabel>Full Name</FieldLabel>
                    <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className={inputCls} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Course</FieldLabel>
                      <input type="text" value={editForm.course || ''} onChange={e => setEditForm({...editForm, course: e.target.value})} className={inputCls} />
                    </div>
                    <div>
                      <FieldLabel>Year</FieldLabel>
                      <input type="text" value={editForm.year || ''} onChange={e => setEditForm({...editForm, year: e.target.value})} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Phone Number</FieldLabel>
                    <input type="text" value={editForm.phone || ''} onChange={e => setEditForm({...editForm, phone: e.target.value})} className={inputCls} required />
                  </div>
                  <div>
                    <FieldLabel>Email Address</FieldLabel>
                    <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className={inputCls} required />
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="w-full py-3.5 bg-brandNavy text-white font-bold rounded-xl hover:bg-brandMedium transition-colors shadow-sm">
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Profile;
