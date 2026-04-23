import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed w-full z-40 transition-all duration-500 ${
    scrolled || !isHome ? 'bg-navy/90 backdrop-blur-xl shadow-sm py-2' : 'bg-transparent py-4 md:py-6'
  }`;
  const textClass = scrolled || !isHome ? 'text-champagne' : 'text-champagne drop-shadow-md';

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Heritage', path: '/heritage' },
    { name: 'Enquire', path: '/enquire' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Mobile Spacer to center logo */}
          <div className="md:hidden flex w-1/3"></div>

          {/* Desktop Left Links */}
          <div className="hidden md:flex space-x-8 w-1/3 justify-end items-center">
            {links.slice(0, 2).map(link => (
              <Link key={link.name} to={link.path} className={`nav-text ${textClass} hover:text-champagne transition-colors relative group py-2`}>
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-champagne group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="flex-shrink-0 w-1/3 flex justify-center cursor-pointer items-center flex-col relative isolate" 
            onClick={() => window.location.href='/'}
          >
             <img 
               src="/logo.png" 
               alt="Sri Ganesh Gems & Jewellery Logo" 
               className={`transition-all duration-500 object-contain ${scrolled || !isHome ? 'h-16 md:h-20' : 'h-20 md:h-32 drop-shadow-2xl'}`}
               style={{ 
                 filter: 'contrast(1.2) brightness(1.1)' 
               }}
               onError={(e) => {
                 e.target.style.display = 'none';
                 e.target.nextElementSibling.style.display = 'block';
               }}
             />
             <div className="text-center hidden mt-2">
               <h1 className={`font-heading text-2xl md:text-3xl font-bold tracking-widest ${textClass} hover:text-champagne transition-colors`}>SRI GANESH</h1>
               <div className="flex items-center justify-center gap-2 mt-1">
                  <div className="w-3 h-[1px] bg-champagne opacity-60"></div>
                  <p className={`text-[8px] md:text-[10px] tracking-[0.3em] uppercase ${textClass} opacity-80`}>Gems & Jewellery</p>
                  <div className="w-3 h-[1px] bg-champagne opacity-60"></div>
               </div>
             </div>
          </motion.div>

          {/* Desktop Right Links */}
          <div className="hidden md:flex space-x-8 w-1/3 justify-start items-center">
            {links.slice(2).map(link => (
              <Link key={link.name} to={link.path} className={`nav-text ${textClass} hover:text-champagne transition-colors relative group py-2`}>
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-champagne group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center w-1/3 justify-end">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${textClass} p-2 focus:outline-none`} aria-label="Toggle Menu">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 w-full bg-midnight/95 backdrop-blur-xl shadow-2xl py-8 px-4 flex flex-col space-y-6 text-center md:hidden overflow-hidden rounded-b-3xl border-t border-white/10"
          >
            {links.map((link, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={link.name}>
                <Link to={link.path} onClick={() => setMobileMenuOpen(false)} className="nav-text text-champagne hover:text-white py-3 px-6 block text-lg tracking-widest">
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
