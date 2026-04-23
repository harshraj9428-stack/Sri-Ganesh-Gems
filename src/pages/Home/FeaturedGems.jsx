import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GemsContext } from '../../contexts/GemsContext';
import { GemCard } from '../../components/gems/GemCard';
import { GoldDivider } from '../../components/shared/GoldDivider';
import { Button } from '../../components/shared/Button';
import { staggerContainer, fadeUpVariant } from '../../config/constants';

export const FeaturedGems = () => {
  const { gems } = useContext(GemsContext);
  const featured = gems.filter(g => g.featured).slice(0, 6);

  return (
    <section className="py-28 texture-bg relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-champagne/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
          <motion.h2 variants={fadeUpVariant} className="heading-section text-3xl sm:text-4xl md:text-5xl">Our Signature Collection</motion.h2>
          <GoldDivider />
          <motion.p variants={fadeUpVariant} className="body-text max-w-2xl mx-auto mb-20 text-slate font-light text-lg">
            Discover our handpicked selection of premium quality gemstones, each certified for authenticity and astrological efficacy.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {featured.map((gem) => (
            <motion.div key={gem.id} variants={fadeUpVariant}>
              <GemCard gem={gem} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-20 flex justify-center">
          <Link to="/collections"><Button variant="outline" className="px-14 py-4 text-sm tracking-widest">View Entire Collection</Button></Link>
        </motion.div>
      </div>
    </section>
  );
};
