import React, { useContext, Component } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Providers and Contexts
import { AppProviders } from './providers/AppProviders';
import { AdminContext } from './contexts/AdminContext';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/shared/WhatsAppFloat';
import { CustomCursor } from './components/shared/CustomCursor';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Heritage from './pages/Heritage';
import Enquire from './pages/Enquire';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-midnight flex flex-col items-center justify-center p-6 text-center font-body border-4 border-champagne/10">
          <div className="max-w-md w-full bg-navy p-10 rounded-[3rem] border border-champagne/20 shadow-2xl space-y-8">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
              <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-heading text-champagne mb-4">Kuch Gadbad Ho Gayi</h1>
              <p className="text-slate text-sm leading-relaxed mb-6">
                Something went wrong while rendering this page. This usually happens if the storage is full or an image is corrupted.
              </p>
              <div className="bg-midnight/50 p-4 rounded-2xl border border-champagne/5 mb-8 overflow-hidden text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate mb-2 font-bold">Error Detail</p>
                <p className="text-xs text-red-400/80 font-mono break-all">{this.state.error?.toString()}</p>
              </div>
            </div>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              className="w-full bg-champagne text-midnight px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-[1.02] transition-all shadow-xl"
            >
              Reset Settings & Restart
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const { auth } = useContext(AdminContext);

  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-[#C9A84C] selection:text-white w-full max-w-[100vw] overflow-x-hidden">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          auth ? <AdminDashboard /> : <Navigate to="/admin" />
        } />
        
        {/* Public Routes */}
        <Route path="*" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/collections/:id" element={<ProductDetail />} />
                  <Route path="/heritage" element={<Heritage />} />
                  <Route path="/enquire" element={<Enquire />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <WhatsAppFloat />
          </>
        } />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}
