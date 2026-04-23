import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

export const GemCard = memo(({ gem }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
      className="group relative bg-midnight flex flex-col texture-bg border border-champagne/10 hover:border-champagne/40 transition-colors duration-500 card-shadow hover:card-shadow-hover overflow-hidden rounded-[2rem] cursor-pointer h-full"
      onClick={() => window.location.hash=`/collections/${gem.id}`}
    >
      <div className="p-3 pb-0">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy/50 rounded-[1.5rem]">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-champagne/20 border-t-champagne rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={gem.placeholderUrl} 
            alt={gem.name} 
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
            className={`w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[1.5s] ease-out relative z-10 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
          <div className="shimmer-overlay"></div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col items-center text-center relative z-10 bg-midnight">
        <span className="text-[9px] uppercase tracking-[0.2em] bg-navy border border-champagne/20 px-3 py-1.5 text-champagne rounded-full mb-4 inline-block font-medium">
          {gem.category}
        </span>
        <h3 className="heading-card mb-1 text-xl text-champagne">{gem.name}</h3>
        <span className="text-sm text-slate font-normal italic mb-4">({gem.hindiName})</span>
        <p className="text-sm text-slate/80 mb-6 flex-grow font-light">{gem.origin ? `Natural | ${gem.origin.split('/')[0]}` : ''}</p>
        
        <div className="w-full flex justify-between items-center mt-auto pt-5 border-t border-champagne/10">
          <div className="text-left">
            <p className="text-[9px] text-slate/60 uppercase tracking-[0.1em]">Starting at</p>
            <p className="font-semibold text-champagne text-lg">₹{gem.startingPrice?.toLocaleString()}</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); openWhatsApp(gem.name); }} 
            className="w-10 h-10 rounded-full bg-navy text-champagne flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-colors duration-300 shadow-sm"
            aria-label="Enquire on WhatsApp"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});
