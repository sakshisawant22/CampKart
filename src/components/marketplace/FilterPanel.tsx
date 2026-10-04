import React from 'react';
import { Category, ListingType, Condition, CampusLocation } from '../../types';
import { Filter, RotateCcw, X, SlidersHorizontal, Check } from 'lucide-react';
import { Button } from '../common/Button';

export interface FilterState {
  category: Category | 'All';
  listingType: ListingType | 'All';
  minPrice: number;
  maxPrice: number;
  condition: Condition | 'All';
  location: string | 'All';
  sortBy: 'recommended' | 'newest' | 'price-asc' | 'price-desc';
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  totalResultsCount?: number;
}

const CATEGORIES: (Category | 'All')[] = [
  'All',
  'Books',
  'Study Materials',
  'Electronics',
  'Clothing',
  'Stationery',
  'Hostel Essentials',
  'Accessories',
  'Rent / Swap',
];

const LISTING_TYPES: (ListingType | 'All')[] = ['All', 'Sell', 'Rent', 'Swap'];

const CONDITIONS: (Condition | 'All')[] = ['All', 'Like New', 'Excellent', 'Good', 'Used'];

const LOCATIONS: string[] = [
  'All',
  'Block A',
  'Block B',
  'Main Building',
  'Library',
  "Girls' Hostel",
  "Boys' Hostel",
  'Hostel Block',
  'Student Center',
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  isOpenMobile = false,
  onCloseMobile,
  totalResultsCount,
}) => {
  const handleChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const isFilterActive =
    filters.category !== 'All' ||
    filters.listingType !== 'All' ||
    filters.condition !== 'All' ||
    filters.location !== 'All' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 5000;

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-pastel-sage-dark" />
          <h3 className="font-bold text-sm sm:text-base text-brand-dark">Filter Marketplace</h3>
        </div>
        {isFilterActive && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            Reset all
          </button>
        )}
      </div>

      {/* Listing Type Filter (Sell / Rent / Swap) */}
      <div>
        <label className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2">
          Listing Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {LISTING_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleChange('listingType', type)}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all ${
                filters.listingType === type
                  ? 'bg-pastel-sage-dark text-white shadow-soft'
                  : 'bg-pastel-warm/70 text-brand-dark hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {type === 'All' ? 'All Types' : type === 'Swap' ? 'Kart Swap' : `For ${type}`}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2">
          Category
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleChange('category', cat)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-pastel-mint-light text-pastel-mint-dark font-bold'
                  : 'text-brand-dark hover:bg-pastel-warm/80 font-medium'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check size={14} className="text-pastel-mint-dark" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Price Range
          </label>
          <span className="text-xs font-bold text-brand-dark">
            ₹{filters.minPrice} — ₹{filters.maxPrice}
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="3000"
            step="50"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
            className="w-full accent-pastel-sage-dark cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-brand-muted font-medium">
            <span>₹0 (Free/Swap)</span>
            <span>Max ₹3,000+</span>
          </div>
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2">
          Item Condition
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map((cond) => (
            <button
              key={cond}
              type="button"
              onClick={() => handleChange('condition', cond)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filters.condition === cond
                  ? 'bg-brand-dark text-white font-bold shadow-xs'
                  : 'bg-white text-brand-dark hover:bg-pastel-warm border border-slate-200'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2">
          Campus Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-brand-border text-xs sm:text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-pastel-sage"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc === 'All' ? 'All Campus Spots' : loc}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value as FilterState['sortBy'])}
          className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-brand-border text-xs sm:text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-pastel-sage"
        >
          <option value="recommended">⭐ Recommended</option>
          <option value="newest">🕒 Newest First</option>
          <option value="price-asc">💵 Price: Low to High</option>
          <option value="price-desc">💎 Price: High to Low</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-3xl p-6 border border-brand-border/70 shadow-soft self-start sticky top-28">
        {content}
      </aside>

      {/* Mobile Modal Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-soft-xl max-h-[85vh] overflow-y-auto z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-brand-dark">Filters & Sorting</h3>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-full text-brand-muted hover:text-brand-dark"
              >
                <X size={20} />
              </button>
            </div>
            {content}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Button
                variant="primary"
                size="lg"
                className="w-full font-bold"
                onClick={onCloseMobile}
              >
                Show Results {totalResultsCount !== undefined ? `(${totalResultsCount})` : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
