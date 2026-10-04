import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { Product, Category, ListingType, Condition } from '../types';
import { 
  SlidersHorizontal, 
  Search, 
  RotateCcw, 
  Sparkles, 
  PackageOpen, 
  PlusCircle, 
  Compass 
} from 'lucide-react';
import { SearchBar } from '../components/marketplace/SearchBar';
import { FilterPanel, FilterState } from '../components/marketplace/FilterPanel';
import { ProductCard } from '../components/marketplace/ProductCard';
import { ProductDetailsModal } from '../components/marketplace/ProductDetailsModal';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export const ExplorePage: React.FC = () => {
  const { products } = useCampusKart();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('search') || '';
  const urlCategory = (searchParams.get('category') as Category) || 'All';
  const urlType = (searchParams.get('type') as ListingType) || 'All';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    category: urlCategory,
    listingType: urlType,
    minPrice: 0,
    maxPrice: 3000,
    condition: 'All',
    location: 'All',
    sortBy: 'recommended',
  });

  // Sync URL search params
  useEffect(() => {
    if (urlQuery) setSearchQuery(urlQuery);
    if (urlCategory && urlCategory !== filters.category) {
      setFilters((prev) => ({ ...prev, category: urlCategory }));
    }
    if (urlType && urlType !== filters.listingType) {
      setFilters((prev) => ({ ...prev, listingType: urlType }));
    }
  }, [urlQuery, urlCategory, urlType]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'All',
      listingType: 'All',
      minPrice: 0,
      maxPrice: 3000,
      condition: 'All',
      location: 'All',
      sortBy: 'recommended',
    });
    setSearchParams({});
  };

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(q));
        const matchesLoc = product.location.toLowerCase().includes(q);
        const matchesSeller = product.seller.name.toLowerCase().includes(q);

        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesTags && !matchesLoc && !matchesSeller) {
          return false;
        }
      }

      // 2. Category
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // 3. Listing Type
      if (filters.listingType !== 'All' && product.listingType !== filters.listingType) {
        return false;
      }

      // 4. Price range
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // 5. Condition
      if (filters.condition !== 'All' && product.condition !== filters.condition) {
        return false;
      }

      // 6. Location
      if (filters.location !== 'All' && product.location !== filters.location) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'recommended':
        default:
          return (b.likesCount || 0) - (a.likesCount || 0);
      }
    });
  }, [products, searchQuery, filters]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-pastel-sage-light via-pastel-mint-light to-pastel-warm border border-brand-border/80 shadow-soft">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full border border-pastel-mint text-xs font-bold text-pastel-mint-dark shadow-xs">
            <Compass size={14} />
            <span>Campus Marketplace Catalog</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Explore CampusKart
          </h1>

          <p className="text-xs sm:text-sm text-brand-muted">
            Find textbooks, scientific calculators, stationery, festive clothing, and hostel essentials listed by verified students.
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-xl">
            <SearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              placeholder="Search books, calculators, clothes, drawing kits..."
            />
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Products Grid */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
        
        {/* Desktop Filter Sidebar & Mobile Drawer */}
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
          totalResultsCount={filteredProducts.length}
        />

        {/* Right Content Area */}
        <main className="flex-1 w-full space-y-5">
          
          {/* Controls bar above grid */}
          <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-brand-border/70 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-brand-dark">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'} Found
              </span>
              {searchQuery && (
                <span className="text-xs text-brand-muted truncate max-w-[150px]">
                  for "{searchQuery}"
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-pastel-warm text-brand-dark text-xs font-bold border border-slate-200"
              >
                <SlidersHorizontal size={14} className="text-pastel-sage-dark" />
                <span>Filters</span>
              </button>

              {/* Reset if active */}
              {(searchQuery || filters.category !== 'All' || filters.listingType !== 'All' || filters.condition !== 'All') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="hidden sm:flex items-center gap-1 text-xs text-rose-600 hover:underline font-semibold"
                >
                  <RotateCcw size={12} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Products Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<PackageOpen size={28} />}
              title="No items found matching your filters"
              description="Try changing your search query, selecting another campus category, or adjusting the price filter."
              actionText="Reset All Filters"
              onAction={handleResetFilters}
              actionIcon={<RotateCcw size={15} />}
            />
          )}

        </main>

      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
