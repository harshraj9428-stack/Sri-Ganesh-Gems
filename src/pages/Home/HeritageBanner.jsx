import React, { useContext, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SiteContext } from '../../contexts/SiteContext';
import { staggerContainer, fadeUpVariant } from '../../config/constants';

export const HeritageBanner = () => {
  const { siteSettings } = useContext(SiteContext);
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]); // Subtle parallax

  const [currentIndex, setCurrentIndex] = useState(0);

  let rawImages = siteSettings?.heritageImages;
  if (!rawImages || !Array.isArray(rawImages)) {
    rawImages = [siteSettings?.heritageImage || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"];
  }
  const images = rawImages.filter(img => img && img.trim() !== '');
  if (images.length === 0) {
      images.push("https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800");
  }

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="bg-midnight text-champagne overflow-hidden my-16 mx-4 sm:mx-8 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative border border-champagne/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne rounded-full blur-[140px] opacity-10 pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row relative z-10">
        <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUpVariant} className="font-heading font-semibold text-champagne leading-[1.2] mb-8 text-4xl lg:text-5xl drop-shadow-md">25+ Years of Trusted Excellence</motion.h2>
            <motion.p variants={fadeUpVariant} className="body-text md:text-xl mb-12 max-w-2xl mx-auto opacity-90 font-light border-l-4 border-champagne pl-6">
              Founded in 1995, Sri Ganesh Gems has been the cornerstone of trust and purity in Patna. We source our gemstones directly from globally renowned mines, ensuring each piece is untouched, untreated, and radiates its natural astrological power.
            </motion.p>
            
            <motion.div variants={fadeUpVariant} className="grid grid-cols-2 gap-10 border-t border-champagne/20 pt-10">
              <div><p className="text-4xl font-heading font-bold text-champagne">100%</p><p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mt-2 text-champagne">Natural Gems</p></div>
              <div><p className="text-4xl font-heading font-bold text-champagne">5000+</p><p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mt-2 text-champagne">Happy Clients</p></div>
              <div><p className="text-4xl font-heading font-bold text-champagne">Certified</p><p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mt-2 text-champagne">Authenticity</p></div>
              <div><p className="text-4xl font-heading font-bold text-champagne">1995</p><p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mt-2 text-champagne">Established</p></div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center overflow-hidden relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full h-full min-h-[400px] lg:min-h-[600px] relative rounded-t-full rounded-b-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-[6px] border-navy outline outline-1 outline-champagne/40 outline-offset-8 bg-midnight"
          >
            <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[120%]">
              <AnimatePresence>
                <motion.img 
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  src={images[currentIndex]} 
                  alt="Store Heritage" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </AnimatePresence>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 mix-blend-multiply pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
