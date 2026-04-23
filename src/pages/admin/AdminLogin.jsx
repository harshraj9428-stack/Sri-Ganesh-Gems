import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Edit, Lock, Mail } from 'lucide-react';
import { AdminContext } from '../../contexts/AdminContext';
import { Button } from '../../components/shared/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminLogin = () => {
  useDocumentTitle('Admin Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-midnight flex items-center justify-center p-4 relative overflow-hidden text-champagne">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-champagne rounded-full blur-[150px] opacity-20"></div>
      <div className="bg-navy/80 backdrop-blur-xl p-12 max-w-md w-full rounded-[3rem] shadow-2xl text-center relative z-10 border border-champagne/10">
        <div className="w-16 h-16 bg-midnight rounded-full flex items-center justify-center mx-auto mb-6 text-champagne"><Edit size={24}/></div>
        <h2 className="heading-card mb-2 text-3xl">Admin Access</h2>
        <p className="text-[10px] text-slate uppercase tracking-[0.3em] mb-12 font-medium">Sri Ganesh Gems</p>
        
        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-widest text-slate pl-4 font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate" size={16} />
              <input 
                type="email" 
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-champagne/20 bg-midnight rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne text-sm transition-all shadow-inner text-champagne placeholder:text-slate/30"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-widest text-slate pl-4 font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate" size={16} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-champagne/20 bg-midnight rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne text-sm transition-all shadow-inner text-champagne placeholder:text-slate/30"
                required
              />
            </div>
          </div>

          {error && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[10px] font-medium bg-red-400/10 p-3 rounded-xl text-center">{error}</motion.p>}
          <Button type="submit" disabled={loading} className="w-full shadow-xl py-4 mt-4">
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>
        <Link to="/" className="text-[10px] uppercase tracking-[0.2em] text-slate mt-10 inline-block hover:text-champagne transition-colors font-medium">← Back to Website</Link>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
