import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestimonialStrip = () => {
  const testimonials = [
    { text: "The quality of the Emerald I bought was exceptional. The detailed astrological guidance provided by the owner built my trust. Truly a luxury experience.", name: "Rahul S.", location: "Patna" },
    { text: "A hidden gem in the city. Their collection of Rashi Ratnas is unmatched, and everything comes with proper internationally recognized lab certification.", name: "Priya M.", location: "Ranchi" },
    { text: "Excellent customer service and genuine products. I've been their customer for 10 years and have never been disappointed by their quality.", name: "Amit K.", location: "Delhi" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-playing Carousel Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-28 bg-gradient-to-b from-[#EDE5D8] to-[#F5F0E8] overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="heading-section mb-16 text-4xl">Words from our Patrons</h2>
        
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full px-4"
            >
              <span className="block text-9xl text-[#C9A84C]/10 font-heading select-none mb-[-60px] leading-none">"</span>
              <p className="body-text italic mb-10 text-[#1C1C1C] leading-loose font-light text-2xl max-w-3xl mx-auto">"{testimonials[currentIndex].text}"</p>
              <div className="mt-8 flex flex-col items-center">
                <div className="w-16 h-[2px] bg-[#C9A84C] mb-5 opacity-60 rounded-full"></div>
                <p className="font-semibold text-[#1B4332] text-xl mb-1">{testimonials[currentIndex].name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">{testimonials[currentIndex].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-4 mt-16">
          {testimonials.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-[#1B4332] w-10 shadow-md' : 'bg-gray-300 w-2.5 hover:bg-gray-400 hover:scale-125'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
