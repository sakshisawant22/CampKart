import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { 
  ShoppingBag, 
  Repeat, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  Leaf, 
  BookOpen, 
  Coins, 
  Building2, 
  Users, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  Cpu, 
  Shirt, 
  MapPin,
  Play
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { StatCard } from '../components/common/StatCard';
import { ProductCard } from '../components/marketplace/ProductCard';
import { ProductDetailsModal } from '../components/marketplace/ProductDetailsModal';
import { Product } from '../types';

export const LandingPage: React.FC = () => {
  const { products, isVerified, demoCampus } = useCampusKart();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Animated counters state
  const [statsCount, setStatsCount] = useState({
    students: 0,
    items: 0,
    transactions: 0,
    reused: 0,
  });

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStatsCount({
        students: Math.min(1250, Math.floor((1250 / steps) * step)),
        items: Math.min(3800, Math.floor((3800 / steps) * step)),
        transactions: Math.min(2100, Math.floor((2100 / steps) * step)),
        reused: Math.min(850, Math.floor((850 / steps) * step)),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const trendingProducts = products.slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Soft Pastel Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pastel-mint-light/80 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-pastel-lavender-light/70 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-pastel-peach-light/70 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 bg-pastel-mint-light px-4 py-1.5 rounded-full border border-pastel-mint shadow-xs text-pastel-mint-dark text-xs font-bold">
                <Sparkles size={14} className="text-pastel-mint-dark animate-pulse" />
                <span>Exclusive Verified Campus Marketplace</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-brand-dark tracking-tight leading-[1.1]">
                Your Campus. <br />
                <span className="bg-gradient-to-r from-pastel-sage-dark via-pastel-mint-dark to-purple-800 bg-clip-text text-transparent">
                  Your Marketplace.
                </span>
              </h1>

              {/* Tagline & Subheading */}
              <div className="space-y-2 max-w-xl mx-auto lg:mx-0">
                <p className="text-lg sm:text-xl font-extrabold text-brand-dark">
                  “Buy. Sell. Swap. Right on Campus.”
                </p>
                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  Buy, sell, rent and swap textbooks, calculators, electronics, fest wear, and hostel essentials with verified students at {demoCampus}.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                  onClick={() => navigate('/verify')}
                  className="w-full sm:w-auto font-bold px-8 shadow-soft-lg"
                >
                  Get Started (Demo Login)
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ShoppingBag size={18} />}
                  onClick={() => navigate('/explore')}
                  className="w-full sm:w-auto font-bold px-8 border border-pastel-mint"
                >
                  Explore CampusKart
                </Button>
              </div>

              {/* Micro Trust Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 text-xs text-brand-muted font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-pastel-mint-dark" />
                  <span>100% Student Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Repeat size={16} className="text-pastel-lavender-dark" />
                  <span>Kart Swap Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-pastel-peach-dark" />
                  <span>Zero Delivery Fees</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Soft Illustration & Floating Badges */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Main Card Composite */}
              <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-4xl p-6 shadow-soft-xl border border-brand-border/80 space-y-4">
                
                {/* Product Teaser Preview */}
                <div className="aspect-[16/10] rounded-3xl overflow-hidden relative bg-slate-100 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80"
                    alt="Scientific Calculator"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-pastel-mint-dark border border-pastel-mint">
                    Featured Item
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between border border-slate-200">
                    <div>
                      <h4 className="text-xs font-bold text-brand-dark">Casio Scientific Calculator</h4>
                      <p className="text-[10px] text-brand-muted">Library Pickup • Like New</p>
                    </div>
                    <span className="text-sm font-black text-brand-dark">₹500</span>
                  </div>
                </div>

                {/* Quick Interactive Items strip */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  {[
                    { label: 'Books', icon: '📚' },
                    { label: 'Calculators', icon: '🧮' },
                    { label: 'Bags', icon: '🎒' },
                    { label: 'Wear', icon: '👗' },
                  ].map((cat, i) => (
                    <div key={i} className="p-2 rounded-2xl bg-pastel-warm/60 border border-brand-border text-xs font-bold text-brand-dark">
                      <span className="text-base block">{cat.icon}</span>
                      <span className="text-[10px]">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge 1: Verified Student */}
              <div className="absolute -top-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-soft-lg border border-pastel-mint flex items-center gap-2.5 animate-float">
                <div className="w-8 h-8 rounded-xl bg-pastel-mint-light flex items-center justify-center text-pastel-mint-dark">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-dark block">Verified Student</span>
                  <span className="text-[10px] text-pastel-mint-dark font-semibold">@campus.edu.in</span>
                </div>
              </div>

              {/* Floating Badge 2: ₹250 Saved */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-soft-lg border border-pastel-sage flex items-center gap-2.5 animate-float-slow">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
                  ₹
                </div>
                <div>
                  <span className="text-xs font-extrabold text-emerald-700 block">₹250 Saved</span>
                  <span className="text-[10px] text-brand-muted font-medium">Textbook Deal</span>
                </div>
              </div>

              {/* Floating Badge 3: Swap Successful */}
              <div className="absolute -top-4 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-soft-lg border border-pastel-lavender flex items-center gap-2.5 animate-float-slow">
                <div className="w-8 h-8 rounded-xl bg-pastel-lavender-light text-pastel-lavender-dark flex items-center justify-center">
                  <Repeat size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-dark block">Swap Successful</span>
                  <span className="text-[10px] text-pastel-lavender-dark font-semibold">Zero Cash Spent</span>
                </div>
              </div>

              {/* Floating Badge 4: 4.8 Rating */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-soft-lg border border-amber-200 flex items-center gap-1.5 animate-float">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-black text-brand-dark">4.8 Rating</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROBLEM & SOLUTION SECTION */}
      <section id="problem-solution" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-pastel-sage-dark bg-pastel-sage-light px-3 py-1 rounded-full border border-pastel-sage">
            The Campus Marketplace Solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Everything you need. Right around you.
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Students struggle with overpriced retail books, non-returnable semester lab kits, and clutter left behind after graduation. CampusKart unifies your college community in one trusted circle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Save More */}
          <div className="bg-white rounded-3xl p-7 border border-brand-border shadow-soft hover:shadow-soft-lg transition-all duration-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-pastel-mint-light text-pastel-mint-dark flex items-center justify-center shadow-xs border border-pastel-mint">
              <DollarSign size={26} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark">Save More</h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Find affordable pre-owned textbooks, calculators, lab coats, and hostel appliances from students who took the same course last semester. Save up to 70% compared to retail.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-pastel-mint-dark">✓ 50-70% Cheaper than stores</span>
            </div>
          </div>

          {/* Card 2: Reuse More */}
          <div className="bg-white rounded-3xl p-7 border border-brand-border shadow-soft hover:shadow-soft-lg transition-all duration-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-pastel-sage-light text-pastel-sage-dark flex items-center justify-center shadow-xs border border-pastel-sage">
              <Leaf size={26} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark">Reuse More</h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Give unused drawing instruments, semester notes, and traditional fest wear a second life instead of letting them collect dust in hostel rooms.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-pastel-sage-dark">✓ Reduces campus e-waste & clutter</span>
            </div>
          </div>

          {/* Card 3: Connect Locally */}
          <div className="bg-white rounded-3xl p-7 border border-brand-border shadow-soft hover:shadow-soft-lg transition-all duration-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-pastel-peach-light text-pastel-peach-dark flex items-center justify-center shadow-xs border border-pastel-peach">
              <Users size={26} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark">Connect Locally</h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Buy and exchange directly on campus within minutes. Meet at the library, canteen, or hostel block with zero shipping waits, zero package damage, and zero courier fees.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-pastel-peach-dark">✓ Same-day direct campus meetups</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SIGNATURE FEATURE: KART SWAP HERO TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-4xl bg-gradient-to-br from-pastel-lavender-light via-white to-pastel-mint-light p-8 sm:p-12 border-2 border-pastel-lavender shadow-soft-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 bg-pastel-lavender px-4 py-1.5 rounded-full border border-pastel-lavender-dark/30 text-pastel-lavender-dark text-xs font-black uppercase tracking-wider">
                <Repeat size={14} className="animate-spin" />
                <span>Kart Swap — Signature Feature</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tight">
                Don’t buy it. <br />
                <span className="text-purple-800">Swap it.</span>
              </h2>

              <p className="text-sm sm:text-base text-brand-dark font-medium leading-relaxed">
                Exchange what you don’t need for something you actually want — without spending extra money.
              </p>

              <div className="p-4 rounded-2xl bg-white/80 border border-pastel-lavender/60 text-xs text-brand-muted space-y-2">
                <div className="flex items-center gap-2 font-bold text-brand-dark">
                  <Sparkles size={14} className="text-purple-600" />
                  <span>Smart Algorithmic Matching Matrix</span>
                </div>
                <p>
                  Input the textbook or gadget you have, choose what you need for this semester, and let CampusKart find instant 90%+ compatible matches with classmates.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="lavender"
                  size="lg"
                  icon={<Repeat size={18} />}
                  onClick={() => navigate('/swap')}
                  className="font-black px-8 shadow-soft"
                >
                  Try Kart Swap Live Matcher
                </Button>
              </div>
            </div>

            {/* Visual Swap Pipeline Illustration */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              
              {/* Box 1: You Have */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl">
                    📖
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-pastel-sage-dark tracking-wider block">YOU HAVE</span>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark">Economics Textbook</h4>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Like New</span>
              </div>

              {/* Connector line */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pastel-lavender to-pastel-mint text-brand-dark flex items-center justify-center shadow-xs">
                  <Repeat size={16} />
                </div>
              </div>

              {/* Box 2: You Want */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xl">
                    🧮
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-pastel-lavender-dark tracking-wider block">YOU WANT</span>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark">Scientific Calculator</h4>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">Casio / Sharp</span>
              </div>

              {/* Connector line */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pastel-mint to-pastel-sage text-white flex items-center justify-center shadow-xs">
                  <Sparkles size={16} />
                </div>
              </div>

              {/* Box 3: CampusKart Match Found */}
              <div className="bg-gradient-to-r from-pastel-mint-light to-pastel-lavender-light p-4 rounded-3xl border-2 border-pastel-mint shadow-soft flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                    alt="Priya"
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-black text-brand-dark">Priya (ECE • 3rd Year)</h4>
                      <ShieldCheck size={13} className="text-pastel-mint-dark" />
                    </div>
                    <p className="text-[11px] text-brand-muted">Has Calculator • Wants Economics Book</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-purple-900 bg-white px-3 py-1 rounded-full border border-purple-200 block shadow-xs">
                    92% Match
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. STUDENT VERIFICATION & TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-4xl p-8 sm:p-12 border border-brand-border shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-pastel-mint-dark bg-pastel-mint-light px-3 py-1 rounded-full border border-pastel-mint">
                Zero Strangers. Zero Scams.
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
                A marketplace made ONLY for students.
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Unlike open classifieds or generic social media groups, CampusKart requires university credentials. You always know the exact department, semester, and verified status of every person you trade with.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-pastel-warm/60 border border-brand-border space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-brand-dark">
                    <CheckCircle2 size={15} className="text-pastel-mint-dark" />
                    <span>College Email Verification</span>
                  </div>
                  <p className="text-[11px] text-brand-muted">Restricted to official college domain emails (.edu / .ac.in / .edu.in).</p>
                </div>

                <div className="p-4 rounded-2xl bg-pastel-warm/60 border border-brand-border space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-brand-dark">
                    <CheckCircle2 size={15} className="text-pastel-mint-dark" />
                    <span>Peer Ratings & Reviews</span>
                  </div>
                  <p className="text-[11px] text-brand-muted">Transparent 5-star ratings from verified campus buyers and sellers.</p>
                </div>
              </div>
            </div>

            {/* Example Profile Card: Priyanka */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-gradient-to-br from-white to-pastel-warm p-6 rounded-3xl border border-brand-border shadow-soft-lg space-y-5">
                
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Priyanka"
                    className="w-16 h-16 rounded-3xl object-cover border-2 border-pastel-mint shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-extrabold text-brand-dark">Priyanka</h4>
                      <ShieldCheck size={16} className="text-pastel-mint-dark" />
                    </div>
                    <p className="text-xs text-brand-muted">CSE • 2nd Year</p>
                    <span className="text-[10px] font-bold bg-pastel-mint-light text-pastel-mint-dark px-2 py-0.5 rounded-full border border-pastel-mint mt-1 inline-block">
                      Verified Student
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs font-black text-brand-dark block">4.8 ⭐</span>
                    <span className="text-[10px] text-brand-muted">Seller Rating</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs font-black text-brand-dark block">12 Done</span>
                    <span className="text-[10px] text-brand-muted">Campus Exchanges</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="md"
                  className="w-full font-bold justify-center"
                  onClick={() => navigate('/verify')}
                >
                  Test Student Verification Flow
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TRENDING ON CAMPUS MARKETPLACE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-pastel-sage-dark bg-pastel-sage-light px-3 py-1 rounded-full border border-pastel-sage">
              Live Campus Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight mt-2">
              Trending on Campus
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Popular textbooks, calculators, and essentials listed by students today.
            </p>
          </div>

          <Link to="/explore">
            <Button variant="outline" size="md" icon={<ArrowRight size={15} />} iconPosition="right">
              View All 12+ Listings
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      </section>

      {/* 6. BUSINESS MODEL (INVESTOR READY PITCH SECTION) */}
      <section id="business-model" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Hackathon Startup Pitch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            How CampusKart Makes Money
          </h2>
          <p className="text-sm text-brand-muted">
            A diversified multi-stream revenue model designed for sustainable hyper-local monetization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Revenue Stream 1 */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <span className="text-2xl font-black text-pastel-sage-dark">01</span>
            <h4 className="font-bold text-base text-brand-dark">Transaction Fee</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              CampusKart takes a micro 3-5% fee from high-ticket certified electronics and escrow rentals.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-pastel-sage-dark">
              Core Marketplace Monetization
            </div>
          </div>

          {/* Revenue Stream 2 */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <span className="text-2xl font-black text-pastel-lavender-dark">02</span>
            <h4 className="font-bold text-base text-brand-dark">Featured Listings</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Students can pay a small amount (₹29 - ₹49) to boost urgent textbook or gadget listings to the top.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-pastel-lavender-dark">
              High-Velocity Listing Promos
            </div>
          </div>

          {/* Revenue Stream 3 */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <span className="text-2xl font-black text-pastel-blue-dark">03</span>
            <h4 className="font-bold text-base text-brand-dark">College Partnerships</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Universities partner with CampusKart to power their official student sustainability & book exchange network.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-pastel-blue-dark">
              B2B SaaS / Campus Licensing
            </div>
          </div>

          {/* Revenue Stream 4 */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <span className="text-2xl font-black text-pastel-peach-dark">04</span>
            <h4 className="font-bold text-base text-brand-dark">Local Business Ads</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Nearby stationery shops, printing kiosks, cafés, and PG accommodations advertise tailored student discounts.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-pastel-peach-dark">
              Hyper-Local Geo Advertising
            </div>
          </div>

        </div>

        {/* Visual Revenue Flow */}
        <div className="mt-8 p-4 rounded-3xl bg-pastel-warm/60 border border-brand-border text-center text-xs font-bold text-brand-dark flex flex-wrap items-center justify-center gap-3">
          <span>Verified Students</span>
          <span className="text-pastel-sage-dark">➔</span>
          <span className="bg-white px-3 py-1 rounded-xl shadow-xs border">CampusKart Hyper-Local Network</span>
          <span className="text-pastel-sage-dark">➔</span>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl">Recurring Sustainable Revenue</span>
        </div>
      </section>

      {/* 7. SOCIAL IMPACT & CIRCULAR ECONOMY */}
      <section id="social-impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-4xl bg-gradient-to-br from-pastel-sage-light/70 via-pastel-mint-light/40 to-white p-8 sm:p-12 border border-pastel-sage/50 shadow-soft">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-pastel-sage-dark bg-white px-3 py-1 rounded-full border border-pastel-sage">
              Social & Environmental Circularity
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              More Reuse. Less Waste.
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              CampusKart creates a self-sustaining circular economy inside every college campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
            {[
              { title: 'Save Money', desc: 'Affordable pre-owned study essentials', icon: '💰' },
              { title: 'Earn Money', desc: 'Monetize unused books & gadgets', icon: '📈' },
              { title: 'Reduce Waste', desc: 'Prevent landfill dumping of electronics', icon: '🌱' },
              { title: 'Reuse Materials', desc: 'Educational gear stays in campus cycle', icon: '📚' },
              { title: 'Build Community', desc: 'Students help juniors & fellow peers', icon: '🤝' },
            ].map((impact, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-3xl block mb-1">{impact.icon}</span>
                <h4 className="font-bold text-sm text-brand-dark">{impact.title}</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed">{impact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LIVE CAMPUS IMPACT COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
            Live Platform Traction
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            label="Verified Students"
            value={`${statsCount.students.toLocaleString()}+`}
            subtext="Campus registered users"
            variant="mint"
            icon={<Users size={20} />}
          />
          <StatCard
            label="Items Listed"
            value={`${statsCount.items.toLocaleString()}+`}
            subtext="Across 8 key categories"
            variant="lavender"
            icon={<BookOpen size={20} />}
          />
          <StatCard
            label="Transactions"
            value={`${statsCount.transactions.toLocaleString()}+`}
            subtext="Completed zero-delay trades"
            variant="peach"
            icon={<ShoppingBag size={20} />}
          />
          <StatCard
            label="Items Reused"
            value={`${statsCount.reused.toLocaleString()}+`}
            subtext="Given a second life"
            variant="sage"
            icon={<Leaf size={20} />}
          />
        </div>
      </section>

      {/* 9. FUTURE EXPANSION ROADMAP */}
      <section id="future-expansion" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-pastel-blue-dark bg-pastel-blue-light px-3 py-1 rounded-full border border-pastel-blue">
            Scalability & Future Growth
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            From One Campus to Every Campus.
          </h2>
          <p className="text-sm text-brand-muted">
            A modular hyper-local expansion blueprint scaling across Tier 1, Tier 2, and university hubs nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {[
            {
              phase: 'PHASE 1',
              title: 'One College',
              desc: 'Launch MVP within single campus, refine student trust & Kart Swap mechanics.',
              status: 'Live Pilot',
              color: 'border-pastel-mint bg-pastel-mint-light/40',
            },
            {
              phase: 'PHASE 2',
              title: 'Multiple Colleges',
              desc: 'Connect nearby clusters & sister universities for wider textbook and fest catalog.',
              status: 'Next 6 Months',
              color: 'border-pastel-sage bg-pastel-sage-light/40',
            },
            {
              phase: 'PHASE 3',
              title: 'Entire City',
              desc: 'City-wide student inter-college transit nodes & university festival integrations.',
              status: 'Year 2',
              color: 'border-pastel-lavender bg-pastel-lavender-light/40',
            },
            {
              phase: 'PHASE 4',
              title: 'Pan-India',
              desc: 'Build India’s #1 verified collegiate marketplace network across 500+ universities.',
              status: 'Vision 2028',
              color: 'border-pastel-peach bg-pastel-peach-light/40',
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border ${step.color} shadow-soft flex flex-col justify-between space-y-3`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-brand-muted tracking-wider uppercase">
                    {step.phase}
                  </span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full border shadow-xs">
                    {step.status}
                  </span>
                </div>
                <h4 className="font-extrabold text-base text-brand-dark mb-1">{step.title}</h4>
                <p className="text-xs text-brand-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. COLLEGE PARTNERSHIP CTA CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-4xl bg-gradient-to-r from-pastel-sage-dark to-pastel-mint-dark p-8 sm:p-12 text-white shadow-soft-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Bring CampusKart to Your College Campus
            </h3>
            <p className="text-xs sm:text-sm text-pastel-mint-light/90 leading-relaxed">
              Are you a College Administrator, Student Council Representative, or Club Leader? Partner with CampusKart to launch an official verified sustainability marketplace.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="secondary"
              size="lg"
              icon={<Building2 size={18} />}
              onClick={() => navigate('/partner')}
              className="font-bold whitespace-nowrap shadow-soft"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Product Details Modal if clicked */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
