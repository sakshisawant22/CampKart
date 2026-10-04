import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { Category, Product } from '../types';
import { 
  Sparkles, 
  Search, 
  Repeat, 
  PlusCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  MapPin
} from 'lucide-react';
import { SearchBar } from '../components/marketplace/SearchBar';
import { CategoryCard } from '../components/marketplace/CategoryCard';
import { ProductCard } from '../components/marketplace/ProductCard';
import { ProductDetailsModal } from '../components/marketplace/ProductDetailsModal';
import { Button } from '../components/common/Button';

const CATEGORIES: Category[] = [
  'Books',
  'Study Materials',
  'Electronics',
  'Clothing',
  'Stationery',
  'Hostel Essentials',
  'Accessories',
  'Rent / Swap',
];

export const HomePage: React.FC = () => {
  const { currentUser, products, demoCampus } = useCampusKart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleCategoryClick = (cat: Category | 'All') => {
    if (cat === 'All') {
      setSelectedCategory('All');
    } else {
      navigate(`/explore?category=${encodeURIComponent(cat)}`);
    }
  };

  // Filter trending products by category if selected
  const displayProducts = selectedCategory === 'All'
    ? products.slice(0, 8)
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-10 sm:space-y-14 pb-12">
      
      {/* 1. TOP GREETING & SEARCH HERO */}
      <section className="relative rounded-4xl bg-gradient-to-br from-pastel-sage-light via-white to-pastel-mint-light p-6 sm:p-10 border border-brand-border/80 shadow-soft overflow-hidden">
        {/* Soft background circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pastel-mint/30 rounded-full blur-2xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pastel-lavender/30 rounded-full blur-2xl pointer-events-none -z-0" />

        <div className="max-w-3xl mx-auto text-center space-y-5 relative z-10">
          
          {/* Greeting Tag */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-pastel-mint text-xs font-bold text-pastel-mint-dark shadow-xs">
            <span className="text-base">👋</span>
            <span>Hey, {currentUser.name.split(' ')[0]}!</span>
            <span className="text-brand-muted">•</span>
            <span>{currentUser.department}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tight leading-tight">
            Find what you need on your campus.
          </h1>

          <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto">
            Explore verified student listings at <strong>{demoCampus}</strong>. Buy, sell, or swap with zero shipping hassle.
          </p>

          {/* Large Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <SearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              placeholder="Search books, calculators, clothes, drawing kits..."
            />
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-brand-muted font-bold mr-1">Quick:</span>
            {['All', 'Books', 'Electronics', 'Clothing', 'Stationery', 'Hostel', 'Rent', 'Swap'].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  if (chip === 'All') setSelectedCategory('All');
                  else if (chip === 'Swap') navigate('/swap');
                  else if (chip === 'Rent') navigate('/explore?type=Rent');
                  else if (chip === 'Hostel') navigate('/explore?category=Hostel+Essentials');
                  else navigate(`/explore?category=${encodeURIComponent(chip)}`);
                }}
                className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
                  chip === 'Swap'
                    ? 'bg-pastel-lavender-light border-pastel-lavender text-pastel-lavender-dark hover:bg-pastel-lavender'
                    : 'bg-white/80 border-slate-200 text-brand-dark hover:bg-white hover:border-slate-300'
                }`}
              >
                {chip === 'Swap' ? '🔄 Kart Swap' : chip}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES BROWSER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight">
              Explore by Category
            </h2>
            <p className="text-xs text-brand-muted">
              Select a category to filter listings
            </p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-bold text-pastel-sage-dark hover:underline flex items-center gap-1"
          >
            All Categories <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
              count={products.filter((p) => p.category === category).length}
            />
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE KART SWAP BANNER */}
      <section className="rounded-3xl bg-gradient-to-r from-pastel-lavender via-white to-pastel-mint p-6 sm:p-8 border border-pastel-lavender shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-soft text-pastel-lavender-dark flex items-center justify-center flex-shrink-0">
            <Repeat size={28} className="animate-pulse" />
          </div>
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                Signature Feature
              </span>
              <span className="text-xs text-brand-muted font-bold">Zero Cash Needed</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-brand-dark">
              Have textbooks or gadgets you don't need? Try Kart Swap!
            </h3>
            <p className="text-xs text-brand-muted">
              Our intelligent algorithm matches what you have with what classmates are looking for.
            </p>
          </div>
        </div>

        <Button
          variant="lavender"
          size="md"
          icon={<Repeat size={16} />}
          onClick={() => navigate('/swap')}
          className="whitespace-nowrap font-bold shadow-soft"
        >
          Find Swap Match
        </Button>
      </section>

      {/* 4. TRENDING ON CAMPUS PRODUCTS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-pastel-sage-dark" />
              <h2 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight">
                Trending on Campus
              </h2>
            </div>
            <p className="text-xs text-brand-muted">
              Popular items students are checking out right now
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/explore')}
              icon={<ArrowRight size={14} />}
              iconPosition="right"
              className="text-xs font-bold"
            >
              Explore All ({products.length})
            </Button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      </section>

      {/* 5. POST ITEM CALLOUT */}
      <section className="rounded-3xl bg-pastel-warm/80 border border-brand-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-brand-dark">
            Got items from last semester lying in your hostel room?
          </h3>
          <p className="text-xs text-brand-muted">
            Turn unused books, instruments, and calculators into instant cash or swap for what you need.
          </p>
        </div>

        <Button
          variant="secondary"
          size="lg"
          icon={<PlusCircle size={18} />}
          onClick={() => navigate('/sell')}
          className="whitespace-nowrap font-bold border border-pastel-mint shadow-soft"
        >
          Post a Listing (+₹)
        </Button>
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
