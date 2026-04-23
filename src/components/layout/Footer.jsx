import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-midnight text-champagne py-16 rounded-t-[3rem] mt-12 border-t-[6px] border-champagne relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600')] opacity-5 mix-blend-overlay pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left relative z-10">
      
      <div className="flex flex-col items-center md:items-start space-y-4">
        <h2 className="font-heading text-3xl font-bold text-champagne">Sri Ganesh</h2>
        <p className="text-[11px] tracking-[0.2em] uppercase text-slate">Gems & Jewellery</p>
        <p className="body-text text-sm text-slate/80 mt-4 max-w-xs font-light">A legacy of divine opulence since 1995, crafting sacred stories through millennia of tradition.</p>
      </div>
      
      <div>
        <h4 className="nav-text text-champagne mb-6">Explore</h4>
        <ul className="space-y-4 font-light">
          <li><Link to="/collections" className="text-slate/70 hover:text-champagne transition-colors text-sm flex items-center justify-center md:justify-start gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> All Collections</Link></li>
          <li><Link to="/heritage" className="text-slate/70 hover:text-champagne transition-colors text-sm flex items-center justify-center md:justify-start gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Our Heritage</Link></li>
          <li><Link to="/enquire" className="text-slate/70 hover:text-champagne transition-colors text-sm flex items-center justify-center md:justify-start gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Bespoke Enquiry</Link></li>
        </ul>
      </div>
      
      <div>
        <h4 className="nav-text text-champagne mb-6">Contact</h4>
        <ul className="space-y-4 text-sm text-slate/70 font-light">
          <li className="flex items-center justify-center md:justify-start gap-3"><MapPin size={16} className="text-champagne" /> Dariyapur, Patna, Bihar</li>
          <li className="flex items-center justify-center md:justify-start gap-3"><Phone size={16} className="text-champagne" /> +91 98354 26322</li>
          <li className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors cursor-pointer"><Mail size={16} className="text-champagne" /> ganeshgems789@gmail.com</li>
        </ul>
      </div>
      
      <div>
        <h4 className="nav-text text-champagne mb-6">Follow Us</h4>
        <div className="flex justify-center md:justify-start space-x-4">
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="w-12 h-12 rounded-full border border-slate/30 flex items-center justify-center hover:border-champagne hover:bg-champagne hover:text-midnight transition-colors duration-300"><Instagram size={18} /></motion.a>
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="w-12 h-12 rounded-full border border-slate/30 flex items-center justify-center hover:border-champagne hover:bg-champagne hover:text-midnight transition-colors duration-300"><Facebook size={18} /></motion.a>
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="w-12 h-12 rounded-full border border-slate/30 flex items-center justify-center hover:border-champagne hover:bg-champagne hover:text-midnight transition-colors duration-300"><Youtube size={18} /></motion.a>
        </div>
      </div>
    </div>
    
    <div className="mt-16 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 relative z-10">
      <p className="text-xs text-gray-500 mb-4 md:mb-0 font-light">&copy; {new Date().getFullYear()} Sri Ganesh Gems & Jewellery. All rights reserved.</p>
    </div>
  </footer>
);
