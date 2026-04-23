import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/shared/Button';
import { SiteContext } from '../../contexts/SiteContext';
import { staggerContainer, fadeUpVariant } from '../../config/constants';

export const HeroSection = () => {
  const { siteSettings } = useContext(SiteContext);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-36 pb-28">
      {/* Dynamic Background Image */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style={{ backgroundImage: `url('${siteSettings?.heroImage || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600"}')` }} 
      />
      
      {/* Dynamic Aura Glow */}
      <motion.div 
        animate={{ 
          x: mousePos.x - 400, 
          y: mousePos.y - 400 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 50 }}
        className="absolute w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px] pointer-events-none z-10"
      />

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      <motion.div 
        variants={staggerContainer} initial="hidden" animate="show"
        className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-8 md:mt-12"
      >
        <motion.div variants={fadeUpVariant}>
          <span className="inline-flex items-center gap-3 px-5 py-2 border border-champagne/40 text-champagne text-[10px] uppercase tracking-widest mb-8 bg-black/30 backdrop-blur-md rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse"></span>
            EST. 1995 • PATNA, BIHAR
          </span>
        </motion.div>

        <motion.h1 variants={fadeUpVariant} className="heading-hero mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] text-champagne">
          A Legacy of <br className="hidden md:block"/>Divine Opulence
        </motion.h1>

        <motion.p variants={fadeUpVariant} className="body-text md:text-xl mb-12 max-w-2xl mx-auto opacity-90 font-light drop-shadow-md">
          Explore handcrafted masterpieces inspired by millennia of tradition, where every gem tells a sacred story.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/collections"><Button variant="primary" className="w-full sm:w-auto shadow-[0_0_20px_rgba(232,213,163,0.3)]">Explore Collections</Button></Link>
          <Link to="/enquire"><Button variant="outline" className="w-full sm:w-auto bg-black/40 backdrop-blur-lg">Book a Bespoke Enquiry</Button></Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2, duration: 1 }}
        className="absolute right-6 md:right-12 bottom-12 md:bottom-16 z-20 text-champagne flex flex-col items-center hidden sm:flex"
      >
        <span className="text-[10px] tracking-[0.5em] uppercase font-light [writing-mode:vertical-lr] mb-8">
          Scroll
        </span>
        <motion.div 
          animate={{ height: ["0px", "80px", "0px"], y: [0, 40, 80] }} 
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-[1px] bg-gradient-to-b from-champagne via-champagne/50 to-transparent"
        ></motion.div>
      </motion.div>
    </div>
  );
};
