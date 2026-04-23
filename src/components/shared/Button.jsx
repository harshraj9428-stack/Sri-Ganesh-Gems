import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic Pull Logic
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (max 30px pull)
    const pullX = (clientX - centerX) * 0.35;
    const pullY = (clientY - centerY) * 0.35;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const base = "px-8 py-3.5 nav-text transition-colors duration-300 flex items-center justify-center rounded-full shadow-md overflow-hidden relative group";
  const variants = {
    primary: "bg-champagne text-midnight hover:shadow-lg border border-transparent font-semibold",
    outline: "border border-champagne text-champagne hover:text-midnight bg-transparent backdrop-blur-sm",
    solidGold: "bg-champagne text-midnight hover:shadow-lg border border-transparent"
  };
  
  return (
    <motion.button 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${variants[variant]} ${className}`} 
      {...props}
    >
      {/* Subtle hover shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
      
      {/* Button background fill animation for outline variant */}
      {variant === 'outline' && <div className="absolute inset-0 bg-champagne scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out -z-10"></div>}
      
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
