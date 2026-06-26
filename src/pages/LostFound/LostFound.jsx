import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlusSm, HiOutlineSearch, HiOutlineTag } from 'react-icons/hi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import LostFoundCard from '../../components/lostfound/LostFoundCard';
import AddFoundItemModal from '../../components/lostfound/AddFoundItemModal';
import { useLostFound } from '../../context/LostFoundContext';

const LostFound = () => {
  const { items } = useLostFound();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item => 
    item.status !== 'resolved' &&
    (item.itemName.toLowerCase().includes(search.toLowerCase()) || 
     item.description.toLowerCase().includes(search.toLowerCase()) ||
     item.foundLocation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-brandBgSoft flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brandNavy via-brandMedium to-[#2563eb] py-16 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 20%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-sans leading-tight mb-3">
                Lost & Found
              </h1>
              <p className="text-white/80 text-base font-medium max-w-lg">
                Help fellow students recover their lost belongings by posting found items.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="flex-shrink-0 flex items-center gap-2 px-8 py-4 bg-white text-brandNavy font-extrabold rounded-2xl hover:shadow-2xl transition-all duration-300 shadow-xl text-base"
            >
              <HiOutlinePlusSm className="text-xl" /> Add Found Item
            </motion.button>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-grow py-10">
        
        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brandTextSec text-lg" />
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for lost items, locations..." 
              className="w-full pl-11 pr-4 py-3.5 text-sm bg-white border border-brandNavy/10 rounded-2xl shadow-sm focus:outline-none focus:border-brandAccent transition-colors" 
            />
          </div>
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <LostFoundCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-16 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-brandBgSoft rounded-2xl flex items-center justify-center mx-auto mb-4 text-brandTextSec text-3xl">
              <HiOutlineTag />
            </div>
            <h3 className="text-xl font-bold text-brandNavy mb-2">No Items Found</h3>
            <p className="text-brandTextSec text-sm mb-6">No lost items match your search. Or maybe nothing is lost right now!</p>
            <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-brandNavy text-white font-semibold rounded-xl hover:bg-brandMedium transition-colors text-sm">
              Add Found Item
            </button>
          </div>
        )}
      </main>

      <AddFoundItemModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default LostFound;
