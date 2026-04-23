import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { GemsContext } from '../contexts/GemsContext';
import { ToastContext } from '../contexts/ToastContext';
import { Button } from '../components/shared/Button';
import { ScrollToTop } from '../components/shared/ScrollToTop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { pageVariants } from '../config/constants';
import { sendEnquiryToWhatsApp } from '../utils/whatsapp';


const Enquire = () => {
  useDocumentTitle('Bespoke Enquiry');
  const { gems } = useContext(GemsContext);
  const { addToast } = useContext(ToastContext);
  const location = useLocation();
  const preSelectedGem = location.state?.selectedGem || '';
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', gemInterest: preSelectedGem, budget: '', request: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.phone.length !== 10) {
      addToast("Please enter a valid 10-digit phone number.", "error");
      return;
    }
    setIsSubmitting(true);
    
    // Send to WhatsApp
    sendEnquiryToWhatsApp(formData);
    
    // Complete the process
    setTimeout(() => {
      setIsSubmitting(false);
      addToast("Enquiry sent successfully! We will contact you soon.");
      setFormData({ name: '', phone: '', email: '', gemInterest: '', budget: '', request: '' });
    }, 1000);
  };


  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="pt-24 min-h-screen texture-bg flex items-center justify-center p-4">
      <ScrollToTop />
      <div className="max-w-6xl w-full bg-midnight rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row overflow-hidden my-12 border border-champagne/20">
        
        {/* Left Side (Branding Info) */}
        <div className="lg:w-2/5 bg-midnight text-champagne p-12 lg:p-20 flex flex-col relative overflow-hidden border-r border-champagne/10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-champagne rounded-full blur-[120px] opacity-20"></motion.div>
          
          <div className="relative z-10 flex flex-col h-full justify-center">
            <h2 className="heading-hero text-champagne mb-8 text-5xl md:text-6xl drop-shadow-md">Bespoke<br/>Consultation</h2>
            <p className="body-text text-champagne/70 mb-16 font-light leading-loose text-lg">Connect with our gemstone experts to find the perfect stone that aligns perfectly with your astrological chart and personal taste.</p>
            
            <div className="space-y-10 mt-auto">
              <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.open('tel:919835426322')}>
                <div className="w-16 h-16 rounded-full bg-navy/50 backdrop-blur-md border border-champagne/30 flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-midnight transition-colors duration-500 shadow-lg"><Phone size={24} /></div>
                <div><p className="text-[10px] uppercase tracking-[0.2em] text-champagne mb-1">Direct Call</p><p className="font-heading text-2xl tracking-wide text-champagne">+91 98354 26322</p></div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.open('mailto:ganeshgems789@gmail.com')}>
                <div className="w-16 h-16 rounded-full bg-navy/50 backdrop-blur-md border border-champagne/30 flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-midnight transition-colors duration-500 shadow-lg"><Mail size={24} /></div>
                <div><p className="text-[10px] uppercase tracking-[0.2em] text-champagne mb-1">Email Us</p><p className="font-heading text-xl tracking-wide text-champagne">ganeshgems789@gmail.com</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="lg:w-3/5 p-12 lg:p-24 flex items-center justify-center bg-navy/20">
          <div className="w-full max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <h3 className="text-3xl font-heading text-champagne mb-10 text-center md:text-left">Send us your request</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-slate mb-3 pl-4 font-medium">Full Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-navy/40 border border-champagne/20 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all text-sm font-light shadow-sm text-champagne" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-slate mb-3 pl-4 font-medium">Phone Number *</label>
                  <input required type="tel" pattern="[0-9]{10}" title="Please enter exactly 10 digits" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-navy/40 border border-champagne/20 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all text-sm font-light shadow-sm text-champagne" placeholder="e.g. 9876543210" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-slate mb-3 pl-4 font-medium">Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-navy/40 border border-champagne/20 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all text-sm font-light shadow-sm text-champagne" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-slate mb-3 pl-4 font-medium">Gem of Interest</label>
                  <select value={formData.gemInterest} onChange={e => setFormData({...formData, gemInterest: e.target.value})} className="w-full bg-navy/40 border border-champagne/20 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all text-sm font-light appearance-none cursor-pointer shadow-sm text-champagne">
                    <option value="" className="bg-midnight">Select a Gem</option>
                    {gems.map(g => <option key={g.id} value={g.name} className="bg-midnight">{g.name} ({g.hindiName})</option>)}
                    <option value="Other" className="bg-midnight">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-slate mb-3 pl-4 font-medium">Estimated Budget</label>
                  <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-navy/40 border border-champagne/20 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all text-sm font-light appearance-none cursor-pointer shadow-sm text-champagne">
                    <option value="" className="bg-midnight">Select Budget</option>
                    <option value="Under 10k" className="bg-midnight">Under ₹10,000</option>
                    <option value="10k-30k" className="bg-midnight">₹10,000 - ₹30,000</option>
                    <option value="30k-1L" className="bg-midnight">₹30,000 - ₹1,00,000</option>
                    <option value="1L+" className="bg-midnight">₹1,00,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-slate mb-3 pl-4 font-medium">Specific Request / Customization</label>
                <textarea rows="4" value={formData.request} onChange={e => setFormData({...formData, request: e.target.value})} className="w-full bg-navy/40 border border-champagne/20 rounded-3xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all text-sm font-light resize-none shadow-sm text-champagne"></textarea>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full mt-10 shadow-xl py-4 text-base relative overflow-hidden">
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"></motion.div>
                ) : 'Submit Enquiry'}
              </Button>
              <p className="text-[10px] text-center text-slate mt-6 tracking-[0.2em] uppercase font-medium">Your information is completely secure.</p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Enquire;
