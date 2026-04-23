import React from 'react';
import { motion } from 'framer-motion';

export const GoldDivider = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="flex items-center justify-center space-x-4 my-6 opacity-80"
  >
    <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-[#C9A84C]"></div>
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-2 h-2 rotate-45 bg-[#C9A84C] rounded-sm shadow-[0_0_10px_rgba(201,168,76,0.5)]"
    ></motion.div>
    <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-[#C9A84C]"></div>
  </motion.div>
);
