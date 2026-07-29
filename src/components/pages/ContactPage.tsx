import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  CalendarDays,
  User,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CalendarPicker } from '../CalendarPicker';

export const ContactPage: React.FC = () => {
  const { showToast, user } = useShop();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setFormSubmitted(true);
    showToast('Your request has been assigned to our Senior Atelier Director.');
  };

  return (
    <div className="pt-28 pb-28 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-stone-200 dark:border-neutral-800 pb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Client Concierge
        </span>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
          Connect With Our Ateliers
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
          Reserve a private appointment with our senior master tailors or consult with our global client relation directors.
        </p>
      </div>

      {/* Main Grid: Form Left, Info & Ateliers Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Container (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 p-6 md:p-10 rounded-3xl border border-stone-200 dark:border-neutral-800 shadow-xl space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
              Personalized Request
            </span>
            <h2 className="font-serif-luxury text-2xl font-semibold text-stone-900 dark:text-stone-100">
              Submit Concierge Inquiry
            </h2>
            <p className="text-xs text-stone-500">
              Complete your preference details below and a senior director will reach out within 24 hours.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-6 bg-stone-50 dark:bg-neutral-800/50 rounded-2xl p-8 border border-[#C5A880]/30"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Inquiry Confirmed
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-stone-900 dark:text-stone-100 font-semibold">{form.name}</strong>. Your inquiry has been routed to our Senior Atelier Concierge.
                  </p>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        preferredDate: '',
                        message: ''
                      });
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:underline flex items-center gap-1.5"
                  >
                    <span>Submit Another Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C5A880]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3.5 text-xs bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl outline-none focus:border-[#C5A880] text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full p-3.5 text-xs bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl outline-none focus:border-[#C5A880] text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-3.5 text-xs bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl outline-none focus:border-[#C5A880] text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-[#C5A880]" />
                      Preferred Date
                    </label>

                    {/* Clickable Date Input Field */}
                    <button
                      type="button"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="w-full p-3.5 text-xs bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl text-left flex items-center justify-between outline-none focus:border-[#C5A880] text-stone-900 dark:text-stone-100 hover:border-[#C5A880] transition-colors"
                    >
                      <span className={form.preferredDate ? 'font-semibold text-[#C5A880]' : 'text-stone-400'}>
                        {form.preferredDate ? form.preferredDate : 'Click to pick consultation date'}
                      </span>
                      <CalendarDays className="w-4 h-4 text-[#C5A880]" />
                    </button>

                    {/* Popover Month Grid Calendar */}
                    <AnimatePresence>
                      {isCalendarOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-40 top-full right-0 left-0 sm:left-auto sm:w-[320px] mt-2 shadow-2xl rounded-2xl"
                        >
                          <CalendarPicker
                            value={form.preferredDate}
                            onChange={(dateStr) => {
                              setForm({ ...form, preferredDate: dateStr });
                              setIsCalendarOpen(false);
                              showToast(`Selected appointment date: ${dateStr}`, 'info');
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                    Message / Special Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding your upcoming occasion, measurement requirements, or custom design aspirations..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3.5 text-xs bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl outline-none resize-none focus:border-[#C5A880] text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-[#C5A880] dark:hover:bg-[#C5A880] dark:hover:text-stone-950 py-4 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-xl"
                  >
                    <Send className="w-4 h-4" /> Send Request To Concierge
                  </button>
                </div>

                <p className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1 opacity-80 pt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Protected under strict confidentiality
                </p>
              </form>
            )}
          </AnimatePresence>
        </div>

        {/* Right Info Sidebar (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick VIP Direct Channels */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-stone-200 dark:border-neutral-800 shadow-lg space-y-4">
            <h3 className="font-serif-luxury text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              Direct VIP Channels
            </h3>

            <div className="space-y-3 text-xs">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/40 hover:border-emerald-500 flex items-center gap-3.5 transition-all group shadow-sm"
              >
                <div className="p-2.5 rounded-full bg-emerald-500 text-white shrink-0 shadow-md">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">WhatsApp Instant Concierge</p>
                  <p className="font-bold text-emerald-900 dark:text-emerald-100 group-hover:text-emerald-600 transition-colors">+91 98765 43210</p>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 flex items-center gap-3.5">
                <div className="p-2.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Official Concierge Email</p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">concierge@maisonpreppy.com</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 flex items-center gap-3.5">
                <div className="p-2.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Concierge Service Hours</p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">Mon – Sat: 10:00 – 20:00 CET</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


