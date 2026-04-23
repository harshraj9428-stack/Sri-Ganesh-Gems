import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Plus, X, CheckCircle, Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../contexts/AdminContext';
import { GemsContext } from '../../contexts/GemsContext';
import { SiteContext } from '../../contexts/SiteContext';
import { ToastContext } from '../../contexts/ToastContext';
import { Button } from '../../components/shared/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { db } from '../../config/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

const SectionImageUploader = ({ label, value, onUpdate, id, onError }) => (
  <div className="bg-navy/30 p-8 rounded-[2.5rem] shadow-sm border border-champagne/10 flex flex-col md:flex-row gap-8 items-center">
    <div className="w-full md:w-64 h-40 rounded-3xl overflow-hidden border border-champagne/20 shadow-inner bg-midnight flex-shrink-0">
      {value ? <img src={value} alt={label} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate"><ImageIcon size={40}/></div>}
    </div>
    <div className="flex-grow space-y-4 w-full">
      <div>
        <h3 className="text-lg font-heading text-champagne mb-1">{label}</h3>
        <p className="text-xs text-slate">Change the section's main image from here.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-champagne"><LinkIcon size={14}/></div>
          <input 
            placeholder="Paste Image URL..." 
            className="w-full bg-midnight border border-champagne/20 rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-champagne/50 transition-all text-champagne"
            value={(typeof value === 'string' && value.startsWith('data:')) ? '' : (value || '')}
            onChange={(e) => onUpdate(e.target.value)}
          />
        </div>
        <div className="relative">
          <input 
            type="file" id={id} accept="image/*" className="hidden" 
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 1200; // Larger for banners
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > height && width > MAX_SIZE) {
                      height *= MAX_SIZE / width;
                      width = MAX_SIZE;
                    } else if (height > MAX_SIZE) {
                      width *= MAX_SIZE / height;
                      height = MAX_SIZE;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    const dataUrl = canvas.toDataURL('image/webp', 0.8);
                    onUpdate(dataUrl);
                  };
                  img.src = event.target.result;
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <label htmlFor={id} className="flex items-center justify-center gap-2 bg-champagne text-midnight px-6 py-3 rounded-full cursor-pointer hover:bg-champagne/80 transition-all text-sm font-medium whitespace-nowrap shadow-md">
            <Upload size={16}/> Upload
          </label>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  useDocumentTitle('Admin Dashboard');
  const { setAuth } = useContext(AdminContext);
  const { gems, setGems } = useContext(GemsContext);
  const { siteSettings, setSiteSettings } = useContext(SiteContext);
  const { addToast } = useContext(ToastContext);
  const [editingGem, setEditingGem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'sections'
  

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      addToast("Processing and compressing image...", "info");
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 800; // Compress gems to max 800px
          let width = img.width;
          let height = img.height;
          
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to webp quality 0.7 (approx 30kb-80kb usually)
          const dataUrl = canvas.toDataURL('image/webp', 0.7);
          setEditingGem({ ...editingGem, placeholderUrl: dataUrl });
          addToast("Image processed successfully.");
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.removeItem('isAdmin');
    addToast("You have successfully logged out.");
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this gem?')) {
      try {
        await deleteDoc(doc(db, 'gems', id));
        addToast("Gem deleted successfully.");
      } catch(error) {
        addToast("Failed to delete gem.", "error");
      }
    }
  };

  const openModal = (gem = null) => {
    setEditingGem(gem || {
      id: `gem-${Date.now()}`, name: '', hindiName: '', category: 'Precious', subcategory: 'Rashi Ratna',
      origin: '', color: '', hardness: '', caratRange: '', startingPrice: '', priceUnit: 'per carat',
      planet: '', rashi: [], benefits: '', description: '', placeholderUrl: '', featured: false, inStock: true,
      // Rudraksh fields
      face: '', deity: '', mantra: '',
      // Jewellery fields
      material: '', purity: '', weight: '', gemstone: ''
    });
    setIsModalOpen(true);
  };

  const saveGem = async (savedGem) => {
    try {
      await setDoc(doc(db, 'gems', savedGem.id), savedGem);
      addToast("Item saved to inventory.");
      setIsModalOpen(false);
    } catch(error) {
      console.error(error);
      addToast("Failed to save item.", "error");
    }
  };

  const handleSectionImageChange = async (section, value) => {
    try {
      await setDoc(doc(db, 'settings', 'site'), { [section]: value }, { merge: true });
      addToast(`${section === 'heroImage' ? 'Hero' : 'Heritage'} image updated successfully.`);
    } catch (error) {
      addToast("Failed to update section image.", "error");
    }
  };



  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-midnight pb-20 font-body text-champagne">
      {/* Top Navbar */}
      <div className="bg-navy text-champagne py-5 px-8 flex justify-between items-center sticky top-0 z-30 shadow-lg border-b border-champagne/10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center border border-champagne/50"><Edit size={14} className="text-champagne"/></div>
          <span className="font-heading text-2xl text-champagne tracking-wide">SG AdminPanel</span>
        </div>
        <div className="flex gap-8 items-center">
          <Link to="/" className="text-xs uppercase tracking-[0.15em] text-champagne opacity-70 hover:opacity-100 transition-all">View Site</Link>
          <button onClick={handleLogout} className="text-[10px] uppercase tracking-[0.2em] font-medium bg-red-900/60 border border-red-500/30 hover:bg-red-800 px-6 py-2.5 rounded-full text-red-100 transition-all shadow-md">Logout</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-10 bg-navy/50 p-1.5 rounded-full w-fit border border-champagne/10 shadow-inner">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-8 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${activeTab === 'inventory' ? 'bg-champagne text-midnight shadow-md' : 'text-slate hover:text-champagne'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('sections')}
            className={`px-8 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${activeTab === 'sections' ? 'bg-champagne text-midnight shadow-md' : 'text-slate hover:text-champagne'}`}
          >
            Section Images
          </button>
        </div>

        {activeTab === 'inventory' ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
              <div>
                <h1 className="text-4xl font-heading text-champagne mb-2">Inventory Management</h1>
                <p className="text-sm text-slate font-light">A total of {gems?.length || 0} gems are listed.</p>
              </div>
              <Button onClick={() => openModal()} className="py-3 px-8 text-sm gap-2 shadow-[0_10px_20px_rgba(232,213,163,0.15)] bg-champagne text-midnight rounded-full hover:scale-105 transition-transform"><Plus size={18}/> Add New Gem</Button>
            </div>

        <div className="bg-navy/30 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden border border-champagne/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-midnight text-slate text-[10px] uppercase tracking-[0.2em] border-b border-champagne/10">
                  <th className="p-6 font-medium pl-8">Image</th>
                  <th className="p-6 font-medium">Gem Name</th>
                  <th className="p-6 font-medium">Category</th>
                  <th className="p-6 font-medium">Price</th>
                  <th className="p-6 font-medium text-center">Featured</th>
                  <th className="p-6 font-medium text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-champagne/5">
                <AnimatePresence>
                  {(gems || []).map((gem, i) => (
                    <motion.tr 
                      key={gem.id} 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.05 }}
                      className="hover:bg-midnight/50 transition-colors group"
                    >
                      <td className="p-4 pl-8 py-5">
                        <div className="w-16 h-20 rounded-[1.2rem] overflow-hidden shadow-sm border border-champagne/10 bg-midnight">
                          <img src={gem.placeholderUrl} alt={gem.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </td>
                      <td className="p-4 font-medium text-champagne text-base">
                        {gem.name} <br/><span className="text-slate text-xs font-light italic">({gem.hindiName})</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-midnight px-3 py-1 rounded-full text-xs text-slate font-medium tracking-wide border border-champagne/20">{gem.category}</span>
                      </td>
                      <td className="p-4 text-champagne font-semibold text-base">₹{gem.startingPrice?.toLocaleString()}</td>
                      <td className="p-4 text-center">
                        {gem.featured ? <span className="w-8 h-8 rounded-full bg-champagne/10 text-champagne flex items-center justify-center mx-auto shadow-sm border border-champagne/30"><CheckCircle size={16}/></span> : <span className="text-slate">-</span>}
                      </td>
                      <td className="p-4 pr-8 text-right">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => openModal(gem)} className="p-2.5 text-steel bg-steel/10 hover:bg-steel hover:text-white rounded-full transition-colors shadow-sm"><Edit size={16}/></button>
                          <button onClick={() => handleDelete(gem.id)} className="p-2.5 text-red-400 bg-red-400/10 hover:bg-red-500 hover:text-white rounded-full transition-colors shadow-sm"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </>
        ) : (
          <div className="space-y-10">
            <div className="mb-12">
              <h1 className="text-4xl font-heading text-champagne mb-2">Section Management</h1>
              <p className="text-sm text-slate font-light">Change the main website banners and section images here.</p>
            </div>
            
            <SectionImageUploader 
              label="Hero Section Background" 
              value={siteSettings?.heroImage} 
              onUpdate={(val) => handleSectionImageChange('heroImage', val)}
              onError={(msg) => addToast(msg, 'error')}
              id="hero-upload"
            />
            
            <div className="space-y-6 pt-6 border-t border-champagne/10">
              <div>
                <h3 className="text-xl font-heading text-champagne mb-1">Heritage Section Slideshow</h3>
                <p className="text-sm text-slate font-light mb-6">Upload up to 4 images to create a smooth slideshow. Leave fields empty to use fewer images.</p>
              </div>
              {[0, 1, 2, 3].map((index) => {
                let currentImg = '';
                if (siteSettings?.heritageImages && siteSettings.heritageImages[index] !== undefined) {
                  currentImg = siteSettings.heritageImages[index];
                } else if (index === 0 && siteSettings?.heritageImage) {
                  currentImg = siteSettings.heritageImage;
                }

                return (
                  <SectionImageUploader 
                    key={index}
                    label={`Slideshow Image ${index + 1}`} 
                    value={currentImg} 
                    onUpdate={(val) => {
                      const newImages = [...(siteSettings?.heritageImages || [siteSettings?.heritageImage || '', '', '', ''])];
                      newImages[index] = val;
                      handleSectionImageChange('heritageImages', newImages);
                    }}
                    onError={(msg) => addToast(msg, 'error')}
                    id={`heritage-upload-${index}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", bounce: 0.3 }}
              className="bg-navy rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-champagne/20"
            >
              <div className="p-8 pb-6 border-b border-champagne/10 flex justify-between items-center bg-navy z-10">
                <h2 className="text-3xl font-heading text-champagne">{editingGem.name ? 'Edit Gem' : 'Add New Gem'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-midnight flex items-center justify-center text-slate hover:bg-red-900/50 hover:text-red-400 transition-colors shadow-sm border border-champagne/10"><X size={20}/></button>
              </div>
              
              <form className="p-8 overflow-y-auto space-y-8 custom-scrollbar" onSubmit={(e) => { e.preventDefault(); saveGem(editingGem); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Name</label><input required className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.name} onChange={e => setEditingGem({...editingGem, name: e.target.value})} /></div>
                  <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Hindi Name</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.hindiName} onChange={e => setEditingGem({...editingGem, hindiName: e.target.value})} /></div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Category</label>
                    <select className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all appearance-none cursor-pointer shadow-sm text-champagne" value={editingGem.category} onChange={e => {
                      const newCat = e.target.value;
                      setEditingGem({
                        ...editingGem, 
                        category: newCat,
                        priceUnit: (newCat === 'Jewellery' || newCat === 'Rudraksh') ? '' : 'per carat'
                      });
                    }}>
                      <option>Precious</option>
                      <option>Semi-Precious</option>
                      <option>Rudraksh</option>
                      <option>Jewellery</option>
                    </select>
                  </div>
                  <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Origin</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.origin} onChange={e => setEditingGem({...editingGem, origin: e.target.value})} /></div>
                  <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Color</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.color} onChange={e => setEditingGem({...editingGem, color: e.target.value})} /></div>
                  <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Starting Price (₹)</label><input type="number" required className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.startingPrice} onChange={e => setEditingGem({...editingGem, startingPrice: Number(e.target.value)})} /></div>
                  <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Price Unit (e.g. per carat)</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.priceUnit || ''} onChange={e => setEditingGem({...editingGem, priceUnit: e.target.value})} placeholder={editingGem.category === 'Jewellery' ? 'Leave empty or enter "per piece"' : 'per carat'} /></div>
                  <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Ruling Planet</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.planet || ''} onChange={e => setEditingGem({...editingGem, planet: e.target.value})} /></div>
                  <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Rashi (comma separated)</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={Array.isArray(editingGem.rashi) ? editingGem.rashi.join(', ') : ''} onChange={e => setEditingGem({...editingGem, rashi: e.target.value.split(',').map(s=>s.trim())})} /></div>
                  
                  {/* Category Specific Fields */}
                  {editingGem.category === 'Rudraksh' && (
                    <>
                      <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Face (Mukhi)</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.face || ''} onChange={e => setEditingGem({...editingGem, face: e.target.value})} /></div>
                      <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Ruling Deity</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.deity || ''} onChange={e => setEditingGem({...editingGem, deity: e.target.value})} /></div>
                      <div className="md:col-span-2"><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Mantra</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.mantra || ''} onChange={e => setEditingGem({...editingGem, mantra: e.target.value})} /></div>
                    </>
                  )}

                  {editingGem.category === 'Jewellery' && (
                    <>
                      <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Material (Gold/Silver/etc.)</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.material || ''} onChange={e => setEditingGem({...editingGem, material: e.target.value})} /></div>
                      <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Purity (22K/925/etc.)</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.purity || ''} onChange={e => setEditingGem({...editingGem, purity: e.target.value})} /></div>
                      <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Weight (grams)</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.weight || ''} onChange={e => setEditingGem({...editingGem, weight: e.target.value})} /></div>
                      <div><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Gemstone (if any)</label><input className="w-full bg-midnight border border-champagne/20 rounded-full px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-champagne" value={editingGem.gemstone || ''} onChange={e => setEditingGem({...editingGem, gemstone: e.target.value})} /></div>
                    </>
                  )}
                  <div className="md:col-span-2 space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Product Image</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Current Image Preview */}
                      <div className="relative group">
                        <div className="w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-midnight border-2 border-dashed border-champagne/20 flex items-center justify-center shadow-inner">
                          {editingGem.placeholderUrl ? (
                            <img src={editingGem.placeholderUrl} alt="Preview" className="w-full h-full object-contain p-4" />
                          ) : (
                            <div className="text-center p-6">
                              <ImageIcon className="mx-auto text-slate mb-2" size={40} />
                              <p className="text-xs text-slate/70">No image selected</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Upload Options */}
                      <div className="space-y-4">
                        {/* File Upload */}
                        <div className="relative">
                          <input 
                            type="file" 
                            id="image-upload" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange}
                          />
                          <label 
                            htmlFor="image-upload" 
                            className="flex items-center justify-center gap-3 w-full bg-champagne text-midnight py-4 rounded-full cursor-pointer hover:bg-champagne/80 transition-all shadow-md group"
                          >
                            <Upload size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Upload Local Image</span>
                          </label>
                        </div>

                        <div className="flex items-center gap-4 py-1">
                          <div className="h-[1px] flex-grow bg-champagne/20"></div>
                          <span className="text-[9px] uppercase tracking-widest text-slate font-bold">OR</span>
                          <div className="h-[1px] flex-grow bg-champagne/20"></div>
                        </div>

                        {/* URL Input */}
                        <div className="relative">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-champagne">
                            <LinkIcon size={14} />
                          </div>
                          <input 
                            placeholder="Paste external Image URL..." 
                            className="w-full bg-midnight border border-champagne/20 rounded-full pl-12 pr-5 py-4 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all shadow-sm text-sm text-champagne"
                            value={editingGem.placeholderUrl?.startsWith('data:') ? '' : editingGem.placeholderUrl} 
                            onChange={e => setEditingGem({...editingGem, placeholderUrl: e.target.value})} 
                          />
                        </div>
                        <p className="text-[9px] text-slate px-4 leading-relaxed italic">
                          Note: Local uploads are stored in browser memory. Professional sites recommend external links for performance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2"><label className="block text-[10px] uppercase tracking-widest text-slate mb-2 pl-2 font-medium">Description</label><textarea className="w-full bg-midnight border border-champagne/20 rounded-3xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne h-32 resize-none transition-all shadow-sm text-champagne" value={editingGem.description} onChange={e => setEditingGem({...editingGem, description: e.target.value})} /></div>
                  <div className="md:col-span-2 flex items-center gap-4 bg-midnight/50 p-5 rounded-[2rem] border border-champagne/10 shadow-inner">
                    <input type="checkbox" id="featured" checked={editingGem.featured} onChange={e => setEditingGem({...editingGem, featured: e.target.checked})} className="w-6 h-6 accent-champagne cursor-pointer rounded" />
                    <label htmlFor="featured" className="text-sm font-medium text-champagne cursor-pointer pt-0.5">Show this in the "Signature Collection" on the homepage</label>
                  </div>
                </div>
                <div className="pt-6 flex justify-end gap-5 border-t border-champagne/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3.5 text-sm font-medium text-slate bg-midnight hover:bg-midnight/80 rounded-full transition-colors border border-champagne/20">Cancel</button>
                  <Button type="submit" className="shadow-xl px-10">Save Masterpiece</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;
