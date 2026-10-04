import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, GraduationCap, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';
import { useCampusKart } from '../../context/CampusKartContext';

export const Footer: React.FC = () => {
  const { demoCampus } = useCampusKart();

  return (
    <footer className="bg-white border-t border-brand-border/80 pt-14 pb-24 lg:pb-12 text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-border/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pastel-sage to-pastel-mint flex items-center justify-center shadow-soft border border-pastel-mint">
                <div className="relative">
                  <ShoppingBag size={18} className="text-pastel-mint-dark" />
                  <GraduationCap size={11} className="text-pastel-sage-dark absolute -top-1.5 -right-1.5" />
                </div>
              </div>
              <span className="text-2xl font-black text-brand-dark tracking-tight">
                Campus<span className="text-pastel-sage-dark">Kart</span>
              </span>
            </Link>

            <p className="text-sm font-semibold text-brand-dark">
              “Buy. Sell. Swap. Right on Campus.”
            </p>

            <p className="text-xs text-brand-muted leading-relaxed max-w-sm">
              The exclusive verified student-only marketplace empowering college communities to save money, reuse resources, and exchange items safely with zero shipping hassle.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-pastel-mint-dark bg-pastel-mint-light px-3 py-1.5 rounded-full border border-pastel-mint w-fit">
              <MapPin size={13} />
              <span>Active on: {demoCampus}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-dark">Marketplace</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>
                <Link to="/home" className="hover:text-pastel-sage-dark transition-colors">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-pastel-sage-dark transition-colors">Explore All Items</Link>
              </li>
              <li>
                <Link to="/swap" className="hover:text-pastel-lavender-dark font-semibold text-pastel-lavender-dark transition-colors flex items-center gap-1">
                  <span>Kart Swap Hub</span>
                  <span className="text-[9px] bg-pastel-lavender px-1.5 py-0.2 rounded-full font-bold">New</span>
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-pastel-sage-dark transition-colors">Post a Listing</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-pastel-sage-dark transition-colors">Saved Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Startup & Pitch */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-dark">Startup & Pitch</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>
                <a href="#problem-solution" className="hover:text-pastel-sage-dark transition-colors">Problem & Solution</a>
              </li>
              <li>
                <a href="#business-model" className="hover:text-pastel-sage-dark transition-colors">Business Model</a>
              </li>
              <li>
                <a href="#social-impact" className="hover:text-pastel-sage-dark transition-colors">Social Impact & Circularity</a>
              </li>
              <li>
                <a href="#future-expansion" className="hover:text-pastel-sage-dark transition-colors">Pan-India Expansion</a>
              </li>
              <li>
                <Link to="/partner" className="hover:text-pastel-sage-dark transition-colors">College Partnerships</Link>
              </li>
            </ul>
          </div>

          {/* Trust & Administration */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-dark">Administration</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>
                <Link to="/admin" className="hover:text-pastel-sage-dark font-semibold text-purple-700 transition-colors">
                  Admin Analytics & Moderation
                </Link>
              </li>
              <li>
                <Link to="/my-campuskart" className="hover:text-pastel-sage-dark transition-colors">My Transactions</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-pastel-sage-dark transition-colors">Student Profile</Link>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-1.5 text-xs text-pastel-mint-dark font-bold bg-pastel-mint-light/60 p-2 rounded-xl border border-pastel-mint/60">
                  <ShieldCheck size={16} />
                  <span>100% Verified Campus Only</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div className="flex items-center gap-2">
            <span>© 2026 CampusKart Inc.</span>
            <span>•</span>
            <span className="font-semibold text-brand-dark">Buy. Sell. Swap. Right on Campus.</span>
          </div>

          <div className="flex items-center gap-2 bg-pastel-warm px-3.5 py-1.5 rounded-full border border-brand-border/80 text-[11px] font-semibold text-brand-dark shadow-xs">
            <Sparkles size={13} className="text-pastel-sage-dark" />
            <span>Marathwada Mitra Mandal's College of Commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
