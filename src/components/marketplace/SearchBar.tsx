import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSearchSubmit?: (q: string) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
}

const POPULAR_SEARCH_SUGGESTIONS = [
  'Scientific Calculator',
  'Accountancy Textbook',
  'Python Programming',
  'College Laptop Backpack',
  'Engineering Drawing Kit',
  'Fest Ethnic Dress',
  'Hostel Electric Kettle',
  'Bluetooth Earphones',
  'Lab Coat',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearchSubmit,
  placeholder = 'Search books, calculators, clothes, hostel essentials...',
  className = '',
  showSuggestions = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter matching suggestions
  const matchingSuggestions = POPULAR_SEARCH_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const handleSelectSuggestion = (suggestion: string) => {
    onQueryChange(suggestion);
    if (onSearchSubmit) {
      onSearchSubmit(suggestion);
    }
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit(query);
      setIsFocused(false);
    }
  };

  // Close suggestions when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div
        className={`relative flex items-center bg-white rounded-3xl border transition-all duration-200 shadow-soft ${
          isFocused
            ? 'border-pastel-sage-dark ring-4 ring-pastel-sage/20 shadow-soft-lg'
            : 'border-brand-border/80 hover:border-slate-300'
        }`}
      >
        <div className="pl-4 sm:pl-5 text-brand-muted">
          <Search size={20} className={isFocused ? 'text-pastel-sage-dark' : 'text-slate-400'} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full py-3.5 sm:py-4 pl-3 pr-10 bg-transparent text-sm sm:text-base text-brand-dark placeholder:text-brand-muted/70 focus:outline-none rounded-3xl"
        />

        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute right-3.5 p-1 rounded-full text-brand-muted hover:text-brand-dark hover:bg-slate-100 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Auto-suggestions Dropdown */}
      {showSuggestions && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-soft-xl border border-brand-border/80 overflow-hidden z-30 animate-scale-in">
          <div className="p-3 bg-pastel-warm/50 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-muted">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-pastel-sage-dark" />
              {query ? 'Matching campus suggestions' : 'Popular student searches'}
            </span>
          </div>

          <div className="py-1">
            {(query ? matchingSuggestions : POPULAR_SEARCH_SUGGESTIONS.slice(0, 5)).map((item) => (
              <button
                key={item}
                type="button"
                onMouseDown={() => handleSelectSuggestion(item)}
                className="w-full px-4 py-2.5 text-left text-xs sm:text-sm text-brand-dark hover:bg-pastel-warm/60 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Search size={14} className="text-brand-muted group-hover:text-pastel-sage-dark" />
                  <span className="font-medium">{item}</span>
                </div>
                <ArrowRight size={13} className="text-brand-muted group-hover:text-brand-dark opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
