import React, { useState } from 'react';
import { useCampusKart } from '../context/CampusKartContext';
import { 
  Repeat, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Search, 
  Filter, 
  Compass, 
  TrendingUp, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SwapMatchCard, SwapMatchItem } from '../components/swap/SwapMatchCard';
import { SwapRequestModal } from '../components/swap/SwapRequestModal';
import { DEMO_USERS, CURRENT_DEMO_USER } from '../data/demoUsers';
import { triggerCelebration } from '../utils/confetti';

const MY_SWAP_ITEMS = [
  {
    id: 'my-1',
    title: 'Principles of Microeconomics (Mankiw / Koutsoyiannis)',
    category: 'Books' as const,
    condition: 'Like New' as const,
    estimatedValue: 320,
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'my-2',
    title: 'Data Structures & Algorithms in C++ Guide',
    category: 'Study Materials' as const,
    condition: 'Good' as const,
    estimatedValue: 280,
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd3?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'my-3',
    title: 'College Fest Traditional Embroidered Kurti',
    category: 'Clothing' as const,
    condition: 'Excellent' as const,
    estimatedValue: 400,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
  },
];

const DESIRED_SWAP_CATEGORIES = [
  'Scientific Calculator (Casio / Sharp)',
  'Laptop Backpack / Daily College Bag',
  'Engineering Drawing Kit / Mini-Drafter',
  'Python / Java Algorithms Books',
  'Hostel Study Lamp / Kettle',
];

export const KartSwapPage: React.FC = () => {
  const { showToast } = useCampusKart();

  const [selectedHaveItem, setSelectedHaveItem] = useState(MY_SWAP_ITEMS[0]);
  const [selectedWantItem, setSelectedWantItem] = useState(DESIRED_SWAP_CATEGORIES[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<SwapMatchItem | null>(null);

  // Dynamic Matches based on selection
  const swapMatches: SwapMatchItem[] = [
    {
      id: 'match-priya-92',
      student: DEMO_USERS['user-priya'],
      matchScore: 92,
      hasItem: {
        title: 'Casio FX-991EX ClassWiz Scientific Calculator',
        category: 'Electronics',
        condition: 'Like New',
        estimatedValue: 500,
        image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80',
      },
      wantsItem: {
        title: selectedHaveItem.title,
        category: selectedHaveItem.category,
        condition: selectedHaveItem.condition,
        estimatedValue: selectedHaveItem.estimatedValue,
        image: selectedHaveItem.image,
      },
      compatibilities: [
        'Equal value range (±₹150)',
        '3rd Year ECE Student looking for 2nd Year Economics',
        'Same campus meetup zone (Library / Main Building)',
      ],
    },
    {
      id: 'match-rahul-84',
      student: DEMO_USERS['user-rahul'],
      matchScore: 84,
      hasItem: {
        title: 'Durable Waterproof College Laptop Backpack (30L)',
        category: 'Accessories',
        condition: 'Good',
        estimatedValue: 350,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      },
      wantsItem: {
        title: selectedHaveItem.title,
        category: selectedHaveItem.category,
        condition: selectedHaveItem.condition,
        estimatedValue: selectedHaveItem.estimatedValue,
        image: selectedHaveItem.image,
      },
      compatibilities: [
        'Complementary semester items',
        'Direct hostel exchange availability',
        'Verified 4.6 star peer rating',
      ],
    },
    {
      id: 'match-rohan-78',
      student: DEMO_USERS['user-rohan'],
      matchScore: 78,
      hasItem: {
        title: 'Complete Engineering Drawing Mini-Drafter & Kit',
        category: 'Study Materials',
        condition: 'Good',
        estimatedValue: 300,
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
      },
      wantsItem: {
        title: selectedHaveItem.title,
        category: selectedHaveItem.category,
        condition: selectedHaveItem.condition,
        estimatedValue: selectedHaveItem.estimatedValue,
        image: selectedHaveItem.image,
      },
      compatibilities: [
        '1st/2nd Year Engineering crossover',
        'Block B Pickup spot',
        'High swap history (20+ exchanges)',
      ],
    },
  ];

  const handleFindMatches = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      triggerCelebration();
      showToast('Found 3 high-compatibility swap matches on campus!', 'success');
    }, 600);
  };

  return (
    <div className="space-y-10 sm:space-y-14 pb-12">
      
      {/* 1. HERO SIGNATURE HEADER */}
      <section className="relative rounded-4xl bg-gradient-to-br from-pastel-lavender via-white to-pastel-mint p-8 sm:p-12 border-2 border-pastel-lavender shadow-soft-xl overflow-hidden">
        {/* Decorative ambient elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pastel-mint-light/60 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pastel-lavender-light/60 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-pastel-lavender text-xs font-black uppercase tracking-wider text-pastel-lavender-dark shadow-xs">
            <Repeat size={14} className="animate-spin" />
            <span>KART SWAP • SIGNATURE DIFFERENTIATOR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-brand-dark tracking-tight leading-tight">
            Don’t buy it. <span className="text-purple-800">Swap it.</span>
          </h1>

          <p className="text-sm sm:text-base text-brand-dark font-medium max-w-2xl mx-auto leading-relaxed">
            Exchange what you don’t need for something you actually want — without spending extra money. Our smart algorithm matches compatible campus students automatically.
          </p>

          {/* Quick value badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-brand-dark">
            <span className="bg-white/80 px-3 py-1 rounded-full border border-purple-200">
              ⚡ 0 Cash Required
            </span>
            <span className="bg-white/80 px-3 py-1 rounded-full border border-purple-200">
              🎯 90%+ Algorithmic Matching
            </span>
            <span className="bg-white/80 px-3 py-1 rounded-full border border-purple-200">
              🤝 Same-Day Campus Trade
            </span>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE SWAP MATCHER SELECTOR */}
      <section className="bg-white rounded-4xl p-6 sm:p-10 border border-brand-border/80 shadow-soft space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
            Find Your Swap Match
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Select an item from your locker and tell us what you need this semester.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          
          {/* I HAVE COLUMN */}
          <div className="md:col-span-5 bg-pastel-warm/50 p-5 sm:p-6 rounded-3xl border border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-pastel-sage-dark flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pastel-sage-dark" />
                <span>I HAVE (My Items)</span>
              </label>
              <span className="text-[11px] text-brand-muted font-medium">Select item</span>
            </div>

            <div className="space-y-2">
              {MY_SWAP_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedHaveItem(item)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    selectedHaveItem.id === item.id
                      ? 'bg-white border-pastel-sage-dark ring-2 ring-pastel-sage/50 shadow-soft'
                      : 'bg-white/70 border-slate-200 hover:bg-white'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-brand-dark truncate">{item.title}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-brand-muted mt-0.5">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium">{item.condition}</span>
                      <span>•</span>
                      <span>Est. ₹{item.estimatedValue}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CONNECTING ARROW */}
          <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pastel-lavender to-pastel-mint text-brand-dark flex items-center justify-center shadow-soft">
              <Repeat size={20} className="text-purple-900" />
            </div>
          </div>

          {/* I WANT COLUMN */}
          <div className="md:col-span-5 bg-pastel-warm/50 p-5 sm:p-6 rounded-3xl border border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-pastel-lavender-dark flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pastel-lavender-dark" />
                <span>I WANT (Need this Semester)</span>
              </label>
              <span className="text-[11px] text-brand-muted font-medium">Select requirement</span>
            </div>

            <div className="space-y-2">
              {DESIRED_SWAP_CATEGORIES.map((category, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedWantItem(category)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    selectedWantItem === category
                      ? 'bg-white border-pastel-lavender-dark ring-2 ring-pastel-lavender/50 shadow-soft'
                      : 'bg-white/70 border-slate-200 hover:bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-brand-dark truncate">{category}</span>
                  {selectedWantItem === category && (
                    <CheckCircle2 size={16} className="text-pastel-lavender-dark flex-shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Find Matches Trigger */}
        <div className="text-center pt-2">
          <Button
            variant="lavender"
            size="lg"
            isLoading={isSearching}
            icon={<Sparkles size={18} />}
            onClick={handleFindMatches}
            className="font-black px-10 shadow-soft-lg"
          >
            Find Swap Matches
          </Button>
        </div>
      </section>

      {/* 3. MATCHING RESULTS STREAM */}
      {hasSearched && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600" />
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight">
                  Top Intelligent Swap Matches
                </h3>
              </div>
              <p className="text-xs text-brand-muted">
                Matched based on item category compatibility, estimated value parity, and campus location.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-pastel-lavender text-purple-900 font-bold px-3 py-1 rounded-full border border-pastel-lavender">
                3 Verified Peers Found
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {swapMatches.map((match) => (
              <SwapMatchCard
                key={match.id}
                match={match}
                onRequestSwap={(m) => setSelectedMatch(m)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Swap Request Modal */}
      <SwapRequestModal
        match={selectedMatch}
        isOpen={Boolean(selectedMatch)}
        onClose={() => setSelectedMatch(null)}
      />

    </div>
  );
};
