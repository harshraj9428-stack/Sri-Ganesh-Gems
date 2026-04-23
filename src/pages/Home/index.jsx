import React from 'react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ScrollToTop } from '../../components/shared/ScrollToTop';
import { HeroSection } from './HeroSection';
import { FeaturedGems } from './FeaturedGems';
import { HeritageBanner } from './HeritageBanner';
import { TestimonialStrip } from './TestimonialStrip';
import { pageVariants } from '../../config/constants';

const Home = () => {
  useDocumentTitle('Home');
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">
      <ScrollToTop />
      <HeroSection />
      <FeaturedGems />
      <HeritageBanner />
      <TestimonialStrip />
    </motion.div>
  );
};

export default Home;
