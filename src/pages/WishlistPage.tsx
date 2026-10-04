import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { Product } from '../types';
import { Heart, Trash2, ArrowRight, Sparkles, Eye, ShoppingBag } from 'lucide-react';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { ProductCard } from '../components/marketplace/ProductCard';
import { ProductDetailsModal } from '../components/marketplace/ProductDetailsModal';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, products, toggleWishlist } = useCampusKart();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-pastel-pink-light via-white to-pastel-lavender-light border border-pastel-pink/60 shadow-soft">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 text-xs font-bold text-rose-600 shadow-xs">
            <Heart size={14} className="fill-rose-500" />
            <span>Saved Campus Items</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
            My Wishlist ({wishlistedProducts.length})
          </h1>

          <p className="text-xs sm:text-sm text-brand-muted">
            Track price drops and get notified when matching campus items are posted by peers.
          </p>
        </div>
      </div>

      {/* Dynamic Match Alert Banner */}
      {wishlistedProducts.length > 0 && (
        <div className="p-4 rounded-3xl bg-pastel-mint-light/70 border border-pastel-mint flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-pastel-mint-dark flex items-center justify-center shadow-xs">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">New wishlist match alert!</h4>
              <p className="text-xs text-pastel-mint-dark font-medium">
                A Scientific Calculator matching your wishlist has been listed near Main Building for ₹500.
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/explore?search=calculator')}
            className="whitespace-nowrap font-bold text-xs"
          >
            Check Offer
          </Button>
        </div>
      )}

      {/* Wishlist Grid or Empty State */}
      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Heart size={28} className="text-rose-500" />}
          title="Your wishlist is empty"
          description="Save items you love while browsing, and we will notify you when similar student products or price drops appear."
          actionText="Explore Items"
          onAction={() => navigate('/explore')}
          actionIcon={<ShoppingBag size={16} />}
        />
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
