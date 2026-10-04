import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCampusKart } from '../../context/CampusKartContext';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  MessageSquare, 
  Repeat, 
  PlusCircle, 
  Bell, 
  Menu, 
  X, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles,
  LayoutDashboard,
  Building2,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { Button } from '../common/Button';
import { NotificationDropdown } from './NotificationDropdown';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    isVerified, 
    wishlistIds, 
    conversations, 
    unreadNotificationsCount,
    demoCampus 
  } = useCampusKart();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Explore', path: '/explore' },
    { 
      name: 'Kart Swap', 
      path: '/swap', 
      highlight: true,
      badge: 'Signature' 
    },
    { 
      name: 'Wishlist', 
      path: '/wishlist', 
      count: wishlistIds.length 
    },
    { 
      name: 'Messages', 
      path: '/messages', 
      count: totalUnreadMessages 
    },
  ];

  const isActive = (path: string) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-brand-border/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Logo & Campus Selector */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pastel-sage to-pastel-mint flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-200 border border-pastel-mint">
                <div className="relative">
                  <ShoppingBag size={20} className="text-pastel-mint-dark" />
                  <GraduationCap size={12} className="text-pastel-sage-dark absolute -top-1.5 -right-1.5" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight">
                    Campus<span className="text-pastel-sage-dark">Kart</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-pastel-mint-light text-pastel-mint-dark px-2 py-0.5 rounded-full border border-pastel-mint/80">
                    Live
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] font-semibold text-brand-muted truncate max-w-[170px]">
                  📍 {demoCampus}
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-pastel-warm/60 p-1.5 rounded-3xl border border-brand-border/50">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'bg-white text-brand-dark shadow-soft'
                      : 'text-brand-muted hover:text-brand-dark hover:bg-white/50'
                  } ${link.highlight ? 'text-pastel-lavender-dark font-bold' : ''}`}
                >
                  {link.name === 'Kart Swap' && (
                    <Repeat size={14} className="text-pastel-lavender-dark animate-pulse" />
                  )}
                  {link.name}
                  {link.badge && (
                    <span className="text-[9px] bg-gradient-to-r from-pastel-lavender to-pastel-mint text-brand-dark font-extrabold px-1.5 py-0.2 rounded-full border border-pastel-lavender">
                      {link.badge}
                    </span>
                  )}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="w-5 h-5 rounded-full bg-pastel-mint-dark text-white text-[10px] font-bold flex items-center justify-center">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Notifications, Profile, + Sell Item Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="w-10 h-10 rounded-2xl bg-pastel-warm/80 hover:bg-slate-100 flex items-center justify-center text-brand-muted hover:text-brand-dark transition-colors border border-brand-border/60 relative"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
              <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            {/* Profile Avatar Quick Button */}
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1.5 rounded-2xl bg-pastel-warm/70 hover:bg-slate-100 border border-brand-border/60 transition-colors group"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover border border-pastel-mint"
                />
                {isVerified && (
                  <ShieldCheck size={12} className="text-pastel-mint-dark absolute -bottom-1 -right-1 bg-white rounded-full" />
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left pr-1">
                <span className="text-xs font-bold text-brand-dark leading-tight group-hover:text-pastel-sage-dark transition-colors truncate max-w-[90px]">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-brand-muted font-medium">
                  ⭐ {currentUser.rating}
                </span>
              </div>
            </Link>

            {/* Large + Sell an Item Button */}
            <Link to="/sell" className="hidden sm:block">
              <Button
                variant="secondary"
                size="md"
                icon={<PlusCircle size={18} className="text-pastel-mint-dark" />}
                className="font-bold border border-pastel-mint"
              >
                Sell an Item
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-2xl bg-pastel-warm flex items-center justify-center text-brand-dark hover:bg-slate-100 transition-colors border border-brand-border"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border/60 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 animate-slide-down">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                    active ? 'bg-pastel-mint-light text-pastel-mint-dark font-bold' : 'text-brand-dark hover:bg-pastel-warm'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {link.name === 'Kart Swap' && <Repeat size={16} className="text-pastel-lavender-dark" />}
                    <span>{link.name}</span>
                  </div>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="w-5 h-5 rounded-full bg-pastel-mint-dark text-white text-xs font-bold flex items-center justify-center">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              to="/my-campuskart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-brand-dark hover:bg-pastel-warm rounded-2xl"
            >
              <LayoutDashboard size={15} className="text-pastel-sage-dark" />
              My CampusKart Hub (Purchases & Swaps)
            </Link>
            <Link
              to="/partner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-brand-dark hover:bg-pastel-warm rounded-2xl"
            >
              <Building2 size={15} className="text-blue-600" />
              College Partnership Inquiry
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-brand-dark hover:bg-pastel-warm rounded-2xl"
            >
              <TrendingUp size={15} className="text-purple-600" />
              Admin Moderation & Analytics
            </Link>
            <div className="pt-2">
              <Button
                variant="secondary"
                size="md"
                icon={<PlusCircle size={18} />}
                className="w-full font-bold justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/sell');
                }}
              >
                + Sell an Item
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
