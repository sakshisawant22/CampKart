import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { 
  ShieldCheck, 
  Star, 
  ShoppingBag, 
  Repeat, 
  Tag, 
  Heart, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  UserCheck, 
  Building2, 
  MapPin, 
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { RatingStars } from '../components/common/RatingStars';
import { DEMO_USERS } from '../data/demoUsers';

export const ProfilePage: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    isVerified, 
    reviews, 
    demoCampus, 
    showToast 
  } = useCampusKart();
  
  const navigate = useNavigate();

  const handleSwitchUser = (userId: string) => {
    const user = DEMO_USERS[userId];
    if (user) {
      setCurrentUser(user);
      showToast(`Switched active profile to ${user.name} (${user.department})`, 'success');
    }
  };

  const myReviews = reviews.filter((r) => r.targetUserId === currentUser.id);

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. PROFILE HEADER CARD */}
      <div className="p-6 sm:p-10 rounded-4xl bg-gradient-to-r from-pastel-sage-light via-pastel-mint-light to-pastel-warm border border-brand-border/80 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-soft"
            />
            {isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-pastel-mint text-pastel-mint-dark p-1.5 rounded-full border-2 border-white shadow-xs">
                <ShieldCheck size={18} />
              </div>
            )}
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-xs font-bold bg-pastel-mint-light text-pastel-mint-dark px-3 py-1 rounded-full border border-pastel-mint">
                Verified Student
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-brand-dark">
              {currentUser.department} • {currentUser.year}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-brand-muted">
              <span className="flex items-center gap-1">
                <Building2 size={13} className="text-pastel-sage-dark" />
                {demoCampus}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {currentUser.rating} ({currentUser.reviewCount} reviews)
              </span>
            </div>

            {currentUser.bio && (
              <p className="text-xs text-brand-muted italic max-w-xl">
                “{currentUser.bio}”
              </p>
            )}
          </div>

          {/* Quick Stats Box */}
          <div className="grid grid-cols-3 gap-3 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-brand-border/70 shadow-xs text-center w-full sm:w-auto">
            <div>
              <span className="text-base sm:text-lg font-black text-brand-dark block">12</span>
              <span className="text-[10px] text-brand-muted font-semibold">Sold</span>
            </div>
            <div className="border-x border-slate-100 px-3">
              <span className="text-base sm:text-lg font-black text-brand-dark block">8</span>
              <span className="text-[10px] text-brand-muted font-semibold">Bought</span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-purple-700 block">5</span>
              <span className="text-[10px] text-brand-muted font-semibold">Swaps</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. PROFILE MENU & REVIEWS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Menu Links */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider px-2">
            Account & Hub
          </h3>

          <div className="bg-white rounded-3xl border border-brand-border/80 shadow-soft overflow-hidden divide-y divide-slate-100">
            {[
              { label: 'My Listings', desc: 'Active & sold marketplace items', icon: Tag, path: '/my-campuskart' },
              { label: 'My Purchases', desc: 'Orders and transaction history', icon: ShoppingBag, path: '/my-campuskart' },
              { label: 'My Kart Swaps', desc: 'Direct 1-to-1 swap trades', icon: Repeat, path: '/my-campuskart' },
              { label: 'Wishlist & Alerts', desc: 'Saved products and price drops', icon: Heart, path: '/wishlist' },
              { label: 'In-App Messages', desc: 'Chat with campus peers', icon: MessageSquare, path: '/messages' },
              { label: 'College Partnerships', desc: 'Proposal for student councils', icon: Building2, path: '/partner' },
              { label: 'Admin Dashboard', desc: 'Moderation & analytics', icon: TrendingUp, path: '/admin' },
            ].map((menuItem, idx) => {
              const Icon = menuItem.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(menuItem.path)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-pastel-warm/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-pastel-warm text-brand-dark flex items-center justify-center group-hover:bg-pastel-mint-light group-hover:text-pastel-mint-dark transition-colors">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-brand-dark">{menuItem.label}</h4>
                      <p className="text-[11px] text-brand-muted">{menuItem.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-brand-dark group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>

          {/* Switch Student Demo Identity */}
          <div className="p-4 rounded-3xl bg-pastel-warm/60 border border-brand-border space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-brand-dark">
              <span>Switch Demo Persona</span>
              <span className="text-[10px] text-brand-muted font-normal">For Hackathon Testing</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(DEMO_USERS).map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSwitchUser(user.id)}
                  className={`p-2 rounded-xl text-left border text-xs transition-all flex items-center gap-2 ${
                    currentUser.id === user.id
                      ? 'bg-white border-pastel-sage-dark font-bold text-brand-dark shadow-xs'
                      : 'bg-white/60 border-slate-200 text-brand-muted hover:bg-white'
                  }`}
                >
                  <img src={user.avatar} alt="" className="w-5 h-5 rounded-md object-cover" />
                  <span className="truncate">{user.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Peer Reviews Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Student Reviews & Feedback ({myReviews.length})
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              100% Positive Recommendation
            </span>
          </div>

          <div className="space-y-3">
            {myReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-3xl bg-white border border-brand-border/80 shadow-soft space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.reviewerAvatar}
                      alt={rev.reviewerName}
                      className="w-10 h-10 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-brand-dark">{rev.reviewerName}</h4>
                      <p className="text-[10px] text-brand-muted">Item: <em>"{rev.itemTitle}"</em></p>
                    </div>
                  </div>

                  <div className="text-right">
                    <RatingStars rating={rev.rating} size={13} showScore={true} />
                    <span className="text-[10px] text-brand-muted block mt-0.5">{rev.date}</span>
                  </div>
                </div>

                <p className="text-xs text-brand-dark bg-pastel-warm/40 p-3.5 rounded-2xl leading-relaxed border border-slate-100">
                  “{rev.comment}”
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
