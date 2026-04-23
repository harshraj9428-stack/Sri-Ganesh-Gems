import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ZoomIn, CheckCircle, Mail } from 'lucide-react';
import { GemsContext } from '../contexts/GemsContext';
import { GemCard } from '../components/gems/GemCard';
import { Button } from '../components/shared/Button';
import { ScrollToTop } from '../components/shared/ScrollToTop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { openWhatsApp } from '../utils/whatsapp';
import { pageVariants, staggerContainer, fadeUpVariant } from '../config/constants';

const ProductDetail = () => {
  const { id } = useParams();
  const { gems } = useContext(GemsContext);
  const gem = gems.find(g => g.id === id);
  
  useDocumentTitle(gem ? `${gem.name} (${gem.hindiName})` : 'Product Not Found');

  const [imgLoaded, setImgLoaded] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

  // Zoom Magnifier Hover Effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${gem.placeholderUrl})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%' // Zoom level
    });
  };
  const handleMouseLeave = () => setZoomStyle({ display: 'none' });

  if (!gem) return <Navigate to="/collections" />;

  const similarGems = gems.filter(g => g.category === gem.category && g.id !== gem.id).slice(0, 4);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="pt-32 pb-20 texture-bg min-h-screen">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] text-slate uppercase tracking-[0.2em] mb-10 flex items-center justify-center lg:justify-start">
          <Link to="/" className="hover:text-champagne transition-colors">Home</Link> <span className="mx-3 text-slate/50">/</span> 
          <Link to="/collections" className="hover:text-champagne transition-colors">Collections</Link> <span className="mx-3 text-slate/50">/</span> 
          <span className="text-champagne font-semibold">{gem.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 bg-midnight p-6 md:p-12 rounded-[3.5rem] card-shadow mb-24 border border-champagne/10">
          
          {/* Main Image with Zoom */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:w-1/2">
            <div className="aspect-[4/5] bg-navy/30 rounded-[3rem] overflow-hidden relative group p-5 border border-champagne/5 shadow-inner">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative cursor-crosshair shadow-sm bg-midnight">
                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy/50">
                    <div className="w-16 h-16 border-4 border-champagne/20 border-t-champagne rounded-full animate-spin"></div>
                  </div>
                )}
                
                <img 
                  src={gem.placeholderUrl} 
                  alt={gem.name} 
                  onLoad={() => setImgLoaded(true)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className={`w-full h-full object-contain object-center relative z-10 transition-opacity duration-1000 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
                />
                
                <div className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem]" style={zoomStyle}></div>

                <div className="absolute bottom-6 right-6 bg-navy/90 backdrop-blur-md rounded-full p-3 text-champagne shadow-lg pointer-events-none z-30 opacity-80 group-hover:opacity-0 transition-opacity duration-500 border border-champagne/20">
                  <ZoomIn size={24} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mb-8 text-center lg:text-left">
              <motion.span variants={fadeUpVariant} className="inline-block text-[10px] uppercase tracking-[0.2em] bg-navy px-5 py-2 text-champagne rounded-full mb-6 font-medium border border-champagne/20 shadow-sm">
                {gem.category}
              </motion.span>
              <motion.h1 variants={fadeUpVariant} className="heading-section text-5xl md:text-6xl mb-3 text-champagne">{gem.name} <span className="text-3xl text-slate font-normal italic capitalize">({gem.hindiName})</span></motion.h1>
              <motion.p variants={fadeUpVariant} className="text-xl text-champagne font-heading italic mt-2">Natural {gem.origin ? gem.origin.split('/')[0] : ''} {gem.name}</motion.p>
            </motion.div>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="body-text text-slate mb-10 leading-loose font-light text-center lg:text-left text-lg">{gem.description}</motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-10 p-8 bg-gradient-to-br from-navy/80 to-transparent rounded-[2.5rem] border border-champagne/10 text-center lg:text-left shadow-inner">
              <p className="text-[11px] text-slate uppercase tracking-[0.2em] mb-2 font-medium">Starting Price</p>
              <p className="text-4xl md:text-5xl font-semibold text-champagne font-heading">
                ₹{gem.startingPrice?.toLocaleString()} 
                {gem.category !== 'Jewellery' && gem.priceUnit && (
                  <span className="text-base font-normal text-slate/70 font-body">/ {gem.priceUnit}</span>
                )}
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div variants={fadeUpVariant} className="bg-navy/30 p-6 rounded-[2rem] border border-champagne/10 hover:border-champagne/30 transition-colors">
                <h3 className="text-xs font-semibold text-champagne uppercase tracking-[0.2em] border-b border-champagne/10 pb-4 mb-5 text-center flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-champagne"></div> {gem.category === 'Jewellery' ? 'Product Specs' : 'Physical Attributes'}</h3>
                <ul className="space-y-4 text-sm font-light text-slate">
                  {gem.category === 'Rudraksh' ? (
                    <>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Face (Mukhi)</span> <span className="font-medium text-white text-right">{gem.face}</span></li>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Origin</span> <span className="font-medium text-white text-right">{gem.origin}</span></li>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Ruling Deity</span> <span className="font-medium text-white text-right">{gem.deity}</span></li>
                    </>
                  ) : gem.category === 'Jewellery' ? (
                    <>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Material</span> <span className="font-medium text-white text-right">{gem.material}</span></li>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Purity</span> <span className="font-medium text-white text-right">{gem.purity}</span></li>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Weight</span> <span className="font-medium text-white text-right">{gem.weight}</span></li>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Gemstone</span> <span className="font-medium text-white text-right">{gem.gemstone}</span></li>
                    </>
                  ) : (
                    <>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Origin</span> <span className="font-medium text-white text-right">{gem.origin}</span></li>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Color</span> <span className="font-medium text-white text-right">{gem.color}</span></li>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Hardness</span> <span className="font-medium text-white text-right">{gem.hardness}</span></li>
                      <li className="flex justify-between items-center"><span className="text-slate/70">Carat Range</span> <span className="font-medium text-white text-right">{gem.caratRange}</span></li>
                    </>
                  )}
                  <li className="flex justify-between items-center pt-3 border-t border-champagne/5"><span className="text-slate/70">Certification</span> <span className="font-medium text-champagne flex items-center gap-1 bg-champagne/10 px-2 py-1 rounded-full"><CheckCircle size={14}/> Included</span></li>
                </ul>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="bg-navy/30 p-6 rounded-[2rem] border border-champagne/10 hover:border-champagne/30 transition-colors">
                <h3 className="text-xs font-semibold text-champagne uppercase tracking-[0.2em] border-b border-champagne/10 pb-4 mb-5 text-center flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-champagne"></div> Spiritual Profile</h3>
                <ul className="space-y-4 text-sm font-light text-slate">
                  {gem.category === 'Rudraksh' ? (
                    <>
                      <li className="flex flex-col text-center"><span className="text-slate/70 text-[10px] uppercase tracking-[0.15em] mb-1">Mantra</span> <span className="font-medium text-champagne text-base italic">"{gem.mantra}"</span></li>
                      <li className="flex flex-col text-center mt-2 pt-4 border-t border-champagne/5"><span className="text-slate/70 text-[10px] uppercase tracking-[0.15em] mb-2">Ruling Planet</span> <span className="font-medium text-white">{gem.planet}</span></li>
                    </>
                  ) : gem.category === 'Jewellery' ? (
                    <>
                      <li className="flex flex-col text-center"><span className="text-slate/70 text-[10px] uppercase tracking-[0.15em] mb-1">Style</span> <span className="font-medium text-champagne text-base">Traditional Handcrafted</span></li>
                    </>
                  ) : (
                    <>
                      <li className="flex flex-col text-center"><span className="text-slate/70 text-[10px] uppercase tracking-[0.15em] mb-1">Ruling Planet</span> <span className="font-medium text-champagne text-base">{gem.planet}</span></li>
                      <li className="flex flex-col text-center"><span className="text-slate/70 text-[10px] uppercase tracking-[0.15em] mb-1">Suitable Rashi</span> <span className="font-medium text-white">{Array.isArray(gem.rashi) ? gem.rashi.join(', ') : gem.rashi}</span></li>
                      <li className="flex flex-col text-center mt-2 pt-4 border-t border-champagne/5"><span className="text-slate/70 text-[10px] uppercase tracking-[0.15em] mb-2">Key Benefits</span> <span className="font-medium text-white leading-relaxed text-xs">{gem.benefits}</span></li>
                    </>
                  )}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-5 mt-auto">
              <Button onClick={() => openWhatsApp(gem.name)} className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] border-none text-white gap-3 shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.4)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" /></svg>
                Enquire via WhatsApp
              </Button>
              <Link to="/enquire" state={{ selectedGem: gem.name }} className="flex-1">
                <Button variant="outline" className="w-full gap-3 text-champagne border-champagne hover:border-champagne hover:bg-champagne hover:text-midnight shadow-sm">
                  <Mail size={18} /> Send Detailed Enquiry
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Similar Masterpieces */}
        {similarGems.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-32 pt-16 border-t border-champagne/20">
            <div className="text-center mb-16">
              <h3 className="heading-section text-4xl">Similar Masterpieces</h3>
              <p className="text-xs text-champagne font-medium uppercase tracking-widest mt-4">Explore related {gem.category} stones</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarGems.map((g, i) => (
                <motion.div key={g.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <GemCard gem={g} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetail;
