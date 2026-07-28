import React from 'react';
import { 
  ArrowUp, 
  Instagram, 
  MapPin, 
  Mail,
  ExternalLink,
  Phone 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import preppyLogo from '../assets/logo-preppy.png';
import pallaviLogo from '../assets/pallavi-logo.jpeg';

export const Footer: React.FC = () => {
  const { navigateTo, isAdminLoggedIn } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#FAF8F5] pt-20 pb-12 border-t border-[#C5A880]/30 relative overflow-hidden">
      {/* Subtle luxury glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#C5A880]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-6">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="cursor-pointer flex items-center flex-wrap gap-2.5" onClick={() => navigateTo('home')}>
              <img src={preppyLogo} alt="PREPPY" className="h-10 md:h-12 w-auto object-contain bg-white/95 p-1 rounded-lg shadow-sm" />
              <span className="text-base font-serif-luxury font-semibold tracking-wider text-white uppercase">preppy</span>
              <img src={pallaviLogo} alt="Pallavi Designer Studio" className="h-10 md:h-12 w-auto object-contain rounded-lg shadow-sm border border-white/20" />
              <span className="text-sm font-semibold tracking-wider text-[#C5A880]">Pallavi designer Studio</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Established in Bengaluru and redefined globally. Crafting heirloom fashion, bespoke hand-draped silk sarees, Aari needlework, and imperial tailoring designed to transcend generations.
            </p>

            <div className="flex gap-4 pt-2">
  <a
    href="https://www.instagram.com/preppy.in?igsh=MWttMnNpaHpkdm44NQ=="
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#C5A880] hover:text-black transition-colors flex items-center justify-center text-gray-300"
    aria-label="Instagram"
  >
    <Instagram className="w-4 h-4" />
  </a>
</div>
          </div>

          {/* Flagship Ateliers */}
          <div className="space-y-4 ml-0 lg:-ml-4">
            <h4 className="font-serif-luxury text-sm font-semibold text-[#C5A880] uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                <strong className="text-white block font-medium">Address</strong>
                  <span>Bhuvaneswari Nagar, Hebbal Kempapura, Bengaluru, Karnataka 560024</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Email</strong>
                  <span>preppy@gmail.com</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Phone No</strong>
                  <span>+91 98765 43210</span>
                </div>
                
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="lg:col-span-2 -mt-4">
            <a
              href="https://www.google.com/maps/dir//Pallavi+Designer+Studio,+Bhuvaneswari+Nagar,+Hebbal+Kempapura,+Bengaluru,+Karnataka+560024/@13.290905,77.5365978,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae17803379ae79:0x42cb400c68726732!2m2!1d77.6068185!2d13.055621?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/80 shadow-md bg-slate-100 group block cursor-pointer"
              aria-label="Open location in Google Maps"
            >
              {/* Google Maps Embed iframe */}
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248627.75432476492!2d77.40962469005422!3d13.174460971949875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17803379ae79%3A0x42cb400c68726732!2sPallavi%20Designer%20Studio!5e0!3m2!1sen!2sin!4v1785175766704!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale-[0.05] contrast-[1.02] pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Top-Left Glass Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-white/95 shadow-md text-xs font-extrabold text-blue-700 group-hover:bg-white group-hover:scale-105 flex items-center gap-1.5 transition-all">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors pointer-events-none" />
            </a>
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 PREPPY Haute Couture Maison. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Shipping &amp; Return Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Haute Service</a>
            <button 
              onClick={() => navigateTo(isAdminLoggedIn ? 'admin' : 'admin-login')} 
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#C5A880] hover:text-white transition-colors group uppercase tracking-widest font-semibold"
          >
            <span>Back To Top</span>
            <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-[#C5A880] group-hover:text-black flex items-center justify-center transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
