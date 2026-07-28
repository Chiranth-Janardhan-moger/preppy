import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, ArrowRight, KeyRound, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin, navigateTo } = useShop();
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Please enter your admin passcode.');
      return;
    }

    const success = adminLogin(passcode.trim());
    if (success) {
      navigateTo('admin');
    } else {
      setErrorMsg('Invalid passcode. Default passcode is: preppy2026');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0A0A] text-[#121212] dark:text-white flex flex-col justify-center items-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8"
      >
        {/* Header Icon & Title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#C5A880]/15 dark:bg-[#C5A880]/20 flex items-center justify-center mx-auto text-[#C5A880] shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold block">
            Maison PREPPY Security
          </span>
          <h1 className="font-serif-luxury text-3xl font-medium tracking-tight">
            Admin Portal Access
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-sans max-w-xs mx-auto">
            Manage homepage banners, upload high-resolution collection images, and generate public Supabase URLs.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#C5A880]" /> Security Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter passcode (e.g. preppy2026)"
                className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-3.5 pl-11 text-sm font-mono focus:outline-none focus:border-[#C5A880] transition-colors"
                autoFocus
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            {errorMsg && (
              <p className="text-xs text-red-500 font-medium pl-1 animate-shake">
                {errorMsg}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#121212] dark:bg-white text-white dark:text-black font-medium py-3.5 rounded-xl hover:bg-[#C5A880] dark:hover:bg-[#C5A880] dark:hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold shadow-lg group"
          >
            <span>Authenticate &amp; Enter Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Helpful Passcode hint */}
        <div className="bg-stone-50 dark:bg-neutral-800/50 rounded-2xl p-4 border border-stone-200/80 dark:border-neutral-700/60 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-[#C5A880]">
            <Sparkles className="w-3.5 h-3.5" /> Quick Access Passcode:
          </div>
          <p className="text-stone-600 dark:text-stone-300 font-mono text-[11px]">
            Passcode: <code className="font-bold text-stone-900 dark:text-white">preppy2026</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
