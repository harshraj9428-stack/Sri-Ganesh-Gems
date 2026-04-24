import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { ScrollToTop } from '../components/shared/ScrollToTop';
import { GoldDivider } from '../components/shared/GoldDivider';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { pageVariants } from '../config/constants';

const Contact = () => {
  useDocumentTitle('Contact Us');
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="pt-24 pb-20 texture-bg min-h-screen">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="heading-hero text-champagne mb-4 text-5xl md:text-6xl">Visit Our Shop</motion.h1>
          <GoldDivider />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-midnight/40 backdrop-blur-xl card-shadow rounded-[3.5rem] p-5 overflow-hidden border border-champagne/10">
          <div className="lg:w-1/3 bg-midnight text-champagne p-14 rounded-[3rem] flex flex-col justify-center relative overflow-hidden shadow-inner border border-champagne/10">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -bottom-20 -right-20 w-80 h-80 bg-champagne rounded-full blur-[100px] opacity-20 pointer-events-none"></motion.div>
            
            <h3 className="font-heading text-4xl md:text-5xl text-champagne mb-12 relative z-10">Get in Touch</h3>
            
            <div className="space-y-12 relative z-10">
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-navy/30 backdrop-blur-md border border-champagne/20 flex items-center justify-center shrink-0 text-champagne group-hover:bg-champagne group-hover:text-midnight transition-colors"><MapPin size={20} /></div>
                <div>
                  <p className="font-semibold mb-2 text-lg tracking-wide text-champagne">Shop Location</p>
                  <p className="text-slate text-sm leading-relaxed font-light">Durukhi Gali, Darzi Tola<br/>Muradpur Ln. Dariyapur, Sabzibagh<br/>Patna, Bihar 800004</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('tel:919835426322')}>
                <div className="w-12 h-12 rounded-full bg-navy/30 backdrop-blur-md border border-champagne/20 flex items-center justify-center shrink-0 text-champagne group-hover:bg-champagne group-hover:text-midnight transition-colors"><Phone size={20} /></div>
                <div>
                  <span className="text-lg hover:text-champagne transition-colors font-light text-champagne">+91 98354 26322</span>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('mailto:ganeshgems789@gmail.com')}>
                <div className="w-12 h-12 rounded-full bg-navy/30 backdrop-blur-md border border-champagne/20 flex items-center justify-center shrink-0 text-champagne group-hover:bg-champagne group-hover:text-midnight transition-colors"><Mail size={20} /></div>
                <div>
                  <span className="text-sm hover:text-champagne transition-colors font-light text-champagne">ganeshgems789@gmail.com</span>
                </div>
              </motion.div>
            </div>

            <div className="mt-20 pt-12 border-t border-champagne/10 relative z-10">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-champagne mb-6 font-medium">Business Hours</h4>
              <ul className="text-sm space-y-4 text-slate font-light">
                <li className="flex justify-between border-b border-champagne/5 pb-3"><span>Mon - Sat:</span> <span className="text-champagne font-medium">10:30 AM - 8:00 PM</span></li>
                <li className="flex justify-between pt-2"><span>Sunday:</span> <span className="text-champagne font-medium tracking-widest uppercase text-xs">Closed</span></li>
              </ul>
            </div>
          </div>

          <div 
            className="lg:w-2/3 min-h-[500px] bg-navy rounded-[3rem] relative overflow-hidden border border-champagne/10 shadow-inner group cursor-pointer"
            onClick={() => window.open('https://www.google.com/maps/dir//Shree+Ganesh+Gems+%26+Jwellers,+Durukhi+Gali,+Darzi+Tola,+Muradpur+Ln.+Dariyapur,+Sabzibagh,+Patna,+Bihar+800004/@25.6080374,85.1430429,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x39ed58f0094517e9:0x3c6c85847aa90c70!2m2!1d85.1573791!2d25.618039!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D', '_blank')}
          >
            <div className="absolute inset-0 bg-midnight/40 backdrop-blur-sm z-10 group-hover:backdrop-blur-none group-hover:bg-transparent transition-all duration-700 flex flex-col items-center justify-center">
              <MapPin size={64} className="mb-6 opacity-30 text-champagne animate-bounce" />
              <p className="font-heading text-3xl text-champagne mb-3">View on Google Maps</p>
              <p className="text-sm font-light text-slate bg-midnight/80 px-6 py-2 rounded-full">Click to open interactive map</p>
            </div>
            {/* Map Placeholder Image/Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-30"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
