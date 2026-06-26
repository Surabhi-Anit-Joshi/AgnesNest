import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSearch, HiOutlineFilter, HiOutlineX, HiOutlineShoppingBag,
  HiOutlinePlusSm, HiOutlineTag, HiOutlineSortAscending
} from 'react-icons/hi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import MarketplaceCard from '../../components/marketplace/MarketplaceCard';
import SellItemModal from '../../components/marketplace/SellItemModal';
import { useMarketplace } from '../../context/MarketplaceContext';

const CATEGORIES = ['All', 'Books', 'Study Materials', 'Furniture', 'Electronics', 'Kitchen Essentials', 'Room Essentials', 'Cycles', 'Others'];
const CONDITIONS = ['All', 'New', 'Like New', 'Good', 'Fair'];
const COURSES = ['All', 'BCA', 'B.Com', 'B.Sc', 'B.Tech', 'BBA', 'MCA', 'Other'];

const SORT_OPTIONS = [
  { label: 'Newest First',    value: 'newest' },
  { label: 'Oldest First',    value: 'oldest' },
  { label: 'Lowest Price',    value: 'price_asc' },
  { label: 'Highest Price',   value: 'price_desc' },
];

const defaultFilters = {
  search: '', category: 'All', condition: 'All', course: 'All',
  priceMin: '', priceMax: '', freeOnly: false, sort: 'newest',
};

const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-bold text-brandTextSec uppercase tracking-widest mb-2">{children}</p>
);

const FilterContent = ({ filters, setFilters, count, onReset }) => {
  const update = (k, v) => setFilters(p => ({ ...p, [k]: v }));
  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-brandNavy text-base">Filters</h3>
          <p className="text-xs text-brandTextSec mt-0.5">{count} items found</p>
        </div>
        <button onClick={onReset} className="text-xs text-brandAccent font-bold hover:text-brandMedium underline">Reset All</button>
      </div>

      {/* Search */}
      <div>
        <SectionLabel>Search</SectionLabel>
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brandTextSec" />
          <input type="text" value={filters.search} onChange={e => update('search', e.target.value)}
            placeholder="Search items..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-brandBgSoft border border-brandNavy/10 rounded-xl focus:outline-none focus:border-brandAccent transition-colors" />
        </div>
      </div>

      {/* Free Only Toggle */}
      <label className="flex items-center gap-3 cursor-pointer bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <input type="checkbox" checked={filters.freeOnly} onChange={e => update('freeOnly', e.target.checked)} className="w-4 h-4 accent-green-600 rounded cursor-pointer" />
        <span className="text-sm font-bold text-green-700">🎁 Free Items Only</span>
      </label>

      {/* Category */}
      <div>
        <SectionLabel>Category</SectionLabel>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => update('category', c)}
              className={`px-3 py-2 rounded-xl text-xs font-bold text-left border transition-all ${
                filters.category === c ? 'bg-brandNavy text-white border-brandNavy' : 'bg-white text-brandNavy border-brandNavy/10 hover:border-brandNavy/40'
              }`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <SectionLabel>Condition</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map(c => (
            <button key={c} onClick={() => update('condition', c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                filters.condition === c ? 'bg-brandNavy text-white border-brandNavy' : 'bg-white text-brandNavy border-brandNavy/10 hover:border-brandNavy/40'
              }`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <SectionLabel>Price Range (₹)</SectionLabel>
        <div className="flex items-center gap-2">
          <input type="number" value={filters.priceMin} onChange={e => update('priceMin', e.target.value)}
            placeholder="Min" className="w-full py-2.5 px-3 text-sm bg-brandBgSoft border border-brandNavy/10 rounded-xl focus:outline-none focus:border-brandAccent" />
          <span className="text-brandTextSec text-xs">–</span>
          <input type="number" value={filters.priceMax} onChange={e => update('priceMax', e.target.value)}
            placeholder="Max" className="w-full py-2.5 px-3 text-sm bg-brandBgSoft border border-brandNavy/10 rounded-xl focus:outline-none focus:border-brandAccent" />
        </div>
      </div>

      {/* Course */}
      <div>
        <SectionLabel>Course</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {COURSES.map(c => (
            <button key={c} onClick={() => update('course', c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                filters.course === c ? 'bg-brandNavy text-white border-brandNavy' : 'bg-white text-brandNavy border-brandNavy/10 hover:border-brandNavy/40'
              }`}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Marketplace = () => {
  const { activeListings, recentlySold, listings } = useMarketplace();
  const [filters, setFilters] = useState(defaultFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = activeListings;
    if (filters.freeOnly) result = result.filter(l => l.listingType === 'free');
    if (filters.search) result = result.filter(l => l.title.toLowerCase().includes(filters.search.toLowerCase()) || l.description.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.category !== 'All') result = result.filter(l => l.category === filters.category);
    if (filters.condition !== 'All') result = result.filter(l => l.condition === filters.condition);
    if (filters.course !== 'All') result = result.filter(l => l.course === filters.course);
    if (filters.priceMin) result = result.filter(l => l.price >= Number(filters.priceMin));
    if (filters.priceMax) result = result.filter(l => l.price <= Number(filters.priceMax));

    switch (filters.sort) {
      case 'oldest':    return [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'price_asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price_desc':return [...result].sort((a, b) => b.price - a.price);
      default:          return [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [activeListings, filters]);

  const activeCount = Object.entries(filters).filter(([k, v]) =>
    k !== 'sort' && v !== defaultFilters[k] && v !== '' && v !== false && v !== 'All' && v !== 'newest'
  ).length;

  const resetFilters = () => setFilters(defaultFilters);

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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/25 rounded-full text-white text-xs font-semibold mb-4">
                <HiOutlineShoppingBag /> {listings.length} Listings · Students Only
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-sans leading-tight mb-3">
                Student Marketplace
              </h1>
              <p className="text-white/80 text-base font-medium max-w-lg">
                Buy and sell reusable books, study materials, furniture, and PG essentials within the AgnesNest student community.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="flex-shrink-0 flex items-center gap-2 px-8 py-4 bg-white text-brandNavy font-extrabold rounded-2xl hover:shadow-2xl transition-all duration-300 shadow-xl text-base"
            >
              <HiOutlinePlusSm className="text-xl" /> Sell an Item
            </motion.button>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-grow py-10">

        {/* Mobile top bar */}
        <div className="flex items-center justify-between mb-6 md:hidden gap-3">
          <div className="relative flex-grow">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brandTextSec" />
            <input type="text" value={filters.search} onChange={e => setFilters(p => ({ ...p, search: e.target.value }))}
              placeholder="Search items..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-brandNavy/10 rounded-xl focus:outline-none focus:border-brandAccent" />
          </div>
          <button onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-brandNavy/10 rounded-xl shadow-soft text-sm font-bold text-brandNavy flex-shrink-0">
            <HiOutlineFilter />
            Filters
            {activeCount > 0 && <span className="bg-brandAccent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{activeCount}</span>}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <FilterContent filters={filters} setFilters={setFilters} count={filtered.length} onReset={resetFilters} />
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-grow min-w-0">
            {/* Sort bar */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <p className="text-sm font-semibold text-brandNavy">
                Showing <span className="font-extrabold text-brandAccent">{filtered.length}</span> of {activeListings.length} items
              </p>
              <div className="flex items-center gap-2">
                <HiOutlineSortAscending className="text-brandTextSec" />
                <select value={filters.sort} onChange={e => setFilters(p => ({ ...p, sort: e.target.value }))}
                  className="text-sm font-semibold text-brandNavy bg-white border border-brandNavy/10 rounded-xl px-3 py-2 focus:outline-none focus:border-brandAccent">
                  {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((l, i) => <MarketplaceCard key={l.id} listing={l} index={i} />)}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-16 text-center">
                  <div className="w-16 h-16 bg-brandBgSoft rounded-2xl flex items-center justify-center mx-auto mb-4 text-brandTextSec text-3xl">
                    <HiOutlineTag />
                  </div>
                  <h3 className="text-xl font-bold text-brandNavy mb-2">No Items Found</h3>
                  <p className="text-brandTextSec text-sm mb-6">Try adjusting your filters or be the first to list an item!</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={resetFilters} className="px-6 py-3 bg-brandNavy text-white font-semibold rounded-xl hover:bg-brandMedium transition-colors text-sm">
                      Clear Filters
                    </button>
                    <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-brandBgSoft border border-brandNavy/10 text-brandNavy font-semibold rounded-xl hover:border-brandNavy/30 transition-colors text-sm">
                      Sell an Item
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recently Sold */}
            {recentlySold.length > 0 && (
              <section className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-brandAccent rounded-full" />
                  <h2 className="text-xl font-bold text-brandNavy">Recently Sold</h2>
                  <span className="text-xs text-brandTextSec font-medium ml-1">· For community transparency</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {recentlySold.map((l, i) => <MarketplaceCard key={l.id} listing={l} index={i} />)}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setDrawerOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl p-6 md:hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-brandNavy text-lg">Filter Items</h2>
                <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-brandBgSoft rounded-xl text-brandTextSec">
                  <HiOutlineX className="text-xl" />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <FilterContent filters={filters} setFilters={setFilters} count={filtered.length} onReset={resetFilters} />
              </div>
              <button onClick={() => setDrawerOpen(false)}
                className="mt-4 w-full py-4 bg-brandNavy text-white font-bold rounded-xl hover:bg-brandMedium transition-colors text-sm">
                Show {filtered.length} Items
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SellItemModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default Marketplace;
