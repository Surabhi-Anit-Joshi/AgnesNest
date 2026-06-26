import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSearch, HiOutlineAdjustments, HiOutlineX,
  HiOutlineOfficeBuilding, HiOutlineFilter
} from 'react-icons/hi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PGCard from '../../components/pg/PGCard';
import { usePG } from '../../context/PGContext';

const RENT_MIN = 3000;
const RENT_MAX = 15000;

const defaultFilters = {
  search: '',
  gender: 'Any',
  sharing: [],
  rentMax: RENT_MAX,
  distance: 'Any',
  food: false,
  wifi: false,
  laundry: false,
  parking: false,
};

const CheckboxFilter = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="w-4 h-4 accent-brandNavy rounded cursor-pointer"
    />
    <span className="text-sm font-medium text-brandNavy group-hover:text-brandAccent transition-colors">{label}</span>
  </label>
);

const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-bold text-brandTextSec uppercase tracking-widest mb-2">{children}</p>
);

// Filter Sidebar Content (shared by desktop sidebar + mobile drawer)
const FilterContent = ({ filters, setFilters, resultCount, onReset }) => {
  const updateFilter = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const toggleSharing = (opt) => {
    setFilters(prev => ({
      ...prev,
      sharing: prev.sharing.includes(opt)
        ? prev.sharing.filter(s => s !== opt)
        : [...prev.sharing, opt],
    }));
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-brandNavy text-base">Filters</h3>
          <p className="text-xs text-brandTextSec mt-0.5">{resultCount} PGs found</p>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-brandAccent font-bold hover:text-brandMedium transition-colors underline"
        >
          Reset All
        </button>
      </div>

      {/* Search */}
      <div>
        <SectionLabel>Search by Name</SectionLabel>
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brandTextSec text-base" />
          <input
            type="text"
            value={filters.search}
            onChange={e => updateFilter('search', e.target.value)}
            placeholder="Search PG name..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-brandBgSoft border border-brandNavy/10 rounded-xl focus:outline-none focus:border-brandAccent transition-colors"
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <SectionLabel>Gender</SectionLabel>
        <div className="flex gap-2 flex-wrap">
          {['Any', 'Girls', 'Boys'].map(g => (
            <button
              key={g}
              onClick={() => updateFilter('gender', g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                filters.gender === g
                  ? 'bg-brandNavy text-white border-brandNavy'
                  : 'bg-white text-brandNavy border-brandNavy/15 hover:border-brandNavy/40'
              }`}
            >
              {g === 'Any' ? 'Any Gender' : `${g} PG`}
            </button>
          ))}
        </div>
      </div>

      {/* Room Sharing */}
      <div>
        <SectionLabel>Room Sharing</SectionLabel>
        <div className="flex flex-col gap-2">
          {['Single', '2 Sharing', '3 Sharing', '4 Sharing'].map(opt => (
            <CheckboxFilter
              key={opt}
              label={opt}
              checked={filters.sharing.includes(opt)}
              onChange={() => toggleSharing(opt)}
            />
          ))}
        </div>
      </div>

      {/* Monthly Rent */}
      <div>
        <SectionLabel>Max Monthly Rent</SectionLabel>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-brandTextSec font-medium">₹{RENT_MIN.toLocaleString('en-IN')}</span>
          <span className="text-xs font-bold text-brandNavy font-mono">₹{filters.rentMax.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min={RENT_MIN}
          max={RENT_MAX}
          step={500}
          value={filters.rentMax}
          onChange={e => updateFilter('rentMax', Number(e.target.value))}
          className="w-full accent-brandNavy cursor-pointer"
        />
      </div>

      {/* Distance */}
      <div>
        <SectionLabel>Distance from College</SectionLabel>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Any Distance', value: 'Any' },
            { label: 'Under 0.5 km', value: '0.5' },
            { label: '0.5 – 1 km', value: '1' },
            { label: '1 – 2 km', value: '2' },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => updateFilter('distance', value)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border text-left transition-all ${
                filters.distance === value
                  ? 'bg-brandNavy text-white border-brandNavy'
                  : 'bg-white text-brandNavy border-brandNavy/15 hover:border-brandNavy/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <SectionLabel>Amenities</SectionLabel>
        <div className="flex flex-col gap-2.5">
          <CheckboxFilter label="Food / Mess" checked={filters.food} onChange={v => updateFilter('food', v)} />
          <CheckboxFilter label="WiFi" checked={filters.wifi} onChange={v => updateFilter('wifi', v)} />
          <CheckboxFilter label="Laundry" checked={filters.laundry} onChange={v => updateFilter('laundry', v)} />
          <CheckboxFilter label="Parking" checked={filters.parking} onChange={v => updateFilter('parking', v)} />
        </div>
      </div>
    </div>
  );
};

const FindPG = () => {
  const { pgs } = usePG();
  const [filters, setFilters] = useState(defaultFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredPGs = useMemo(() => {
    return pgs.filter(pg => {
      // Search
      if (filters.search && !pg.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      // Gender
      if (filters.gender !== 'Any' && pg.gender !== filters.gender) return false;
      // Sharing
      if (filters.sharing.length > 0 && !filters.sharing.some(s => pg.sharingOptions?.includes(s))) return false;
      // Rent
      if (pg.rent > filters.rentMax) return false;
      // Distance
      if (filters.distance !== 'Any') {
        const maxDist = parseFloat(filters.distance);
        if (pg.distance > maxDist) return false;
      }
      // Amenities
      if (filters.food && !pg.facilities?.food) return false;
      if (filters.wifi && !pg.facilities?.wifi) return false;
      if (filters.laundry && !pg.facilities?.laundry) return false;
      if (filters.parking && !pg.facilities?.parking) return false;
      return true;
    });
  }, [pgs, filters]);

  const activeFilterCount = [
    filters.gender !== 'Any',
    filters.sharing.length > 0,
    filters.rentMax < RENT_MAX,
    filters.distance !== 'Any',
    filters.food, filters.wifi, filters.laundry, filters.parking,
  ].filter(Boolean).length;

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <div className="min-h-screen bg-brandBgSoft flex flex-col">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brandNavy via-brandMedium to-brandAccent py-16 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/25 rounded-full text-white text-xs font-semibold mb-4"
          >
            <HiOutlineOfficeBuilding /> {pgs.length} PG Listings Near St Agnes College
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-sans leading-tight tracking-tight mb-4"
          >
            Find Your Perfect PG<br />Near St Agnes College
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-base sm:text-lg font-medium max-w-2xl mx-auto"
          >
            Explore trusted student accommodations with genuine reviews from your fellow students.
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT: Sidebar + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-grow py-10">
        {/* Mobile filter bar */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <p className="text-sm font-semibold text-brandNavy">
            <span className="font-extrabold text-xl">{filteredPGs.length}</span> PGs found
          </p>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-brandNavy/10 rounded-xl shadow-soft text-sm font-bold text-brandNavy hover:border-brandAccent transition-colors"
          >
            <HiOutlineFilter />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-brandAccent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <FilterContent
                filters={filters}
                setFilters={setFilters}
                resultCount={filteredPGs.length}
                onReset={resetFilters}
              />
            </div>
          </aside>

          {/* PG Grid */}
          <main className="flex-grow min-w-0">
            <div className="hidden md:flex items-center justify-between mb-6">
              <p className="text-sm font-semibold text-brandNavy">
                Showing <span className="font-extrabold text-brandAccent">{filteredPGs.length}</span> of {pgs.length} PGs
              </p>
              {filters.search && (
                <span className="text-xs text-brandTextSec font-medium">
                  Results for "<span className="font-bold text-brandNavy">{filters.search}</span>"
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {filteredPGs.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredPGs.map((pg, i) => (
                    <PGCard key={pg.id} pg={pg} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft p-16 text-center"
                >
                  <div className="w-16 h-16 bg-brandBgSoft rounded-2xl flex items-center justify-center mx-auto mb-4 text-brandTextSec text-3xl">
                    <HiOutlineOfficeBuilding />
                  </div>
                  <h3 className="text-xl font-bold text-brandNavy mb-2">No PGs Found</h3>
                  <p className="text-brandTextSec text-sm mb-6">Try adjusting your filters to see more results.</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-brandNavy text-white font-semibold rounded-xl hover:bg-brandMedium transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Slide-out Filter Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl p-6 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-brandNavy text-lg">Filter PGs</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-brandBgSoft rounded-xl transition-colors text-brandTextSec"
                >
                  <HiOutlineX className="text-xl" />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <FilterContent
                  filters={filters}
                  setFilters={setFilters}
                  resultCount={filteredPGs.length}
                  onReset={resetFilters}
                />
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="mt-4 w-full py-4 bg-brandNavy text-white font-bold rounded-xl hover:bg-brandMedium transition-colors text-sm"
              >
                Show {filteredPGs.length} PGs
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default FindPG;
