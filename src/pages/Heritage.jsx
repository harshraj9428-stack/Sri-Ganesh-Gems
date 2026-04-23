import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ScrollToTop } from '../components/shared/ScrollToTop';
import { GoldDivider } from '../components/shared/GoldDivider';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SiteContext } from '../contexts/SiteContext';
import { pageVariants } from '../config/constants';

const Heritage = () => {
  const { siteSettings } = useContext(SiteContext);
  useDocumentTitle('Our Heritage');
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="pt-24 min-h-screen texture-bg">
      <ScrollToTop />
      <div className="bg-midnight text-center py-32 px-4 relative overflow-hidden rounded-b-[4rem] mx-2 sm:mx-6 shadow-2xl border-b border-champagne/20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay animate-[slowPan_30s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: `url('${siteSettings?.heritageImage || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600"}')` }}
        ></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-midnight/90 to-transparent z-0"></div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10">
          <h1 className="heading-hero text-champagne mb-6 drop-shadow-lg text-6xl">Our Heritage</h1>
          <p className="text-champagne tracking-[0.2em] uppercase text-sm max-w-2xl mx-auto leading-loose font-medium opacity-100">A Journey of Trust, Purity, and Astrological Excellence Since 1995.</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-28">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-28">
          <h2 className="heading-section mb-6 text-4xl md:text-5xl">The Legacy Begins</h2>
          <p className="body-text text-lg text-champagne font-medium leading-loose max-w-3xl mx-auto">
            Established in the heart of Patna, Sri Ganesh Gems and Jewellery was founded with a singular vision: to provide 100% natural, untreated, and astrologically potent gemstones. For over two decades, we have strictly adhered to Vedic principles, ensuring that every gem passing through our hands serves its true spiritual purpose.
          </p>
          <GoldDivider />
        </motion.div>

        <div className="space-y-24 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-champagne/40 before:to-transparent">
          
          {[
            { year: "1995", title: "Inception", desc: "Founded as a small boutique specializing in rare Rashi Ratnas, gaining immediate local trust for unparalleled transparency.", bg: "bg-champagne" },
            { year: "2005", title: "Direct Sourcing", desc: "Established direct relationships with mines in Colombia, Ceylon, and Burma to eliminate middlemen and assure unheated, natural quality.", bg: "bg-midnight" },
            { year: "2015", title: "Certification Standard", desc: "Pioneered the practice of providing independent, internationally recognized lab certifications with every precious stone purchase.", bg: "bg-midnight" },
            { year: "Today", title: "Digital Presence", desc: "Serving clients globally, continuing our legacy of trust through digital bespoke consultations while maintaining our physical boutique roots.", bg: "bg-champagne" }
          ].map((item, i) => (
            <div key={item.year} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <motion.div 
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-navy ${item.bg} shadow-[0_0_20px_rgba(0,0,0,0.3)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-125`}
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-10 bg-midnight/40 backdrop-blur-sm rounded-[2.5rem] card-shadow text-center md:text-left group-odd:md:text-right group-hover:-translate-y-2 transition-transform duration-500 border border-champagne/10"
              >
                <h3 className="font-heading text-5xl text-champagne mb-3">{item.year}</h3>
                <p className="text-champagne text-[11px] uppercase tracking-[0.2em] mb-5 font-medium">{item.title}</p>
                <p className="text-slate text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
};

export default Heritage;
