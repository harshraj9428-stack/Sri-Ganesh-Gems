import React, { useState, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { GemsContext } from '../contexts/GemsContext';
import { GemCard } from '../components/gems/GemCard';
import { Button } from '../components/shared/Button';
import { ScrollToTop } from '../components/shared/ScrollToTop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { pageVariants } from '../config/constants';

const Collections = () => {
  useDocumentTitle('Collections');
  const { gems } = useContext(GemsContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('All');

  const categories = ['All', 'Precious', 'Semi-Precious', 'Rashi Ratna'];
  const prices = ['All', 'Under ₹5,000', '₹5,000–₹25,000', '₹25,000+'];

  const filteredGems = useMemo(() => {
    return gems.filter(gem => {
      const matchCat = filter === 'All' || gem.category === filter || gem.subcategory === filter;
      const matchSearch = gem.name.toLowerCase().includes(search.toLowerCase()) || gem.hindiName.toLowerCase().includes(search.toLowerCase());
      let matchPrice = true;
      if (priceRange === 'Under ₹5,000') matchPrice = gem.startingPrice < 5000;
      else if (priceRange === '₹5,000–₹25,000') matchPrice = gem.startingPrice >= 5000 && gem.startingPrice <= 25000;
      else if (priceRange === '₹25,000+') matchPrice = gem.startingPrice > 25000;
      return matchCat && matchSearch && matchPrice;
    });
  }, [gems, filter, search, priceRange]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="pt-24 min-h-screen texture-bg">
      <ScrollToTop />
      <div className="bg-midnight text-center py-24 px-4 rounded-b-[3rem] mx-2 sm:mx-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-16 relative overflow-hidden border-b border-champagne/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1600')] bg-cover opacity-10 mix-blend-overlay blur-sm"></div>
        <div className="relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="heading-hero text-champagne mb-4 text-5xl md:text-6xl">Our Collections</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-champagne tracking-[0.25em] uppercase text-xs md:text-sm font-medium">Discover Nature's Finest Treasures</motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-8 flex justify-center">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-3 px-8 py-4 border-champagne/40 text-champagne rounded-full bg-navy/30 backdrop-blur-md transition-all active:scale-95"
          >
            <Filter size={18} />
            {showFilters ? 'Hide Filters' : 'Filter Collections'}
          </Button>
        </div>

        {/* Soft, Pill-shaped Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className={`${showFilters ? 'flex' : 'hidden lg:flex'} bg-midnight/40 backdrop-blur-xl p-4 md:p-6 mb-16 rounded-[2.5rem] card-shadow flex-col lg:flex-row gap-6 justify-between items-center z-20 relative border border-champagne/10`}
        >
          <div className="flex overflow-x-auto w-full lg:w-auto hide-scrollbar gap-3 pb-2 lg:pb-0 px-2">
            {categories.map((c, idx) => (
              <button 
                key={c} onClick={() => setFilter(c)}
                className={`px-6 py-3 text-[11px] uppercase tracking-[0.15em] whitespace-nowrap rounded-full transition-all duration-300 font-medium ${filter === c ? 'bg-champagne text-midnight shadow-[0_5px_15px_rgba(232,213,163,0.3)] scale-105' : 'bg-navy/30 text-slate hover:bg-navy hover:text-champagne'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex w-full lg:w-auto gap-4 flex-col sm:flex-row px-2">
            <div className="relative w-full sm:w-auto group">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate group-hover:text-champagne transition-colors" size={18} />
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full sm:w-56 pl-12 pr-6 py-3.5 bg-navy/30 hover:bg-navy/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-champagne/50 appearance-none cursor-pointer transition-all border border-transparent focus:border-champagne/30 text-champagne">
                {prices.map(p => <option key={p} value={p} className="bg-midnight">{p}</option>)}
              </select>
            </div>
            <div className="relative w-full sm:w-auto group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate group-hover:text-champagne transition-colors" size={18} />
              <input type="text" placeholder="Search gems..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-56 pl-12 pr-6 py-3.5 bg-navy/30 hover:bg-navy/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-champagne/50 transition-all border border-transparent focus:border-champagne/30 text-champagne placeholder:text-slate/60"/>
            </div>
          </div>
        </motion.div>

        {/* Gems Grid */}
        {filteredGems.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredGems.map((gem, index) => (
                <motion.div 
                  key={gem.id} layout 
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }} 
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }} 
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                >
                  <GemCard gem={gem} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 text-slate bg-midnight/40 backdrop-blur-sm rounded-[3rem] card-shadow border border-champagne/10">
            <p className="text-3xl font-heading text-champagne mb-4">No masterpieces found.</p>
            <p className="font-light mb-8 text-lg">Please try adjusting your filters or search terms.</p>
            <Button variant="outline" onClick={() => {setFilter('All'); setSearch(''); setPriceRange('All');}} className="mx-auto">Clear all filters</Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Collections;
