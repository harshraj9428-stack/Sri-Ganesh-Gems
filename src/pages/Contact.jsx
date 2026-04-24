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
            className="lg:w-2/3 min-h-[500px] bg-navy rounded-[3rem] relative overflow-hidden border border-champagne/10 shadow-inner group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5960410714!2d85.15480417604313!3d25.61803901416738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58f0094517e9%3A0x3c6c85847aa90c70!2sShree%20Ganesh%20Gems%20%26%20Jwellers!5e0!3m2!1sen!2sin!4v1745487134812!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-all duration-700"
            ></iframe>
            
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-midnight/80 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-700"></div>
            
            <div className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
              <p className="font-heading text-2xl text-champagne mb-1">Our Location</p>
              <p className="text-xs text-slate font-light">Interactive Map • Hover to explore</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
