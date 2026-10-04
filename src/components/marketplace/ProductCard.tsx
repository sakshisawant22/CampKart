import React from 'react';
import { Product } from '../../types';
import { useCampusKart } from '../../context/CampusKartContext';
import { Heart, MapPin, ShieldCheck, Star, Eye, Repeat } from 'lucide-react';
import { formatCurrency, getConditionColor, getListingTypeBadge } from '../../utils/helpers';
import { Badge } from '../common/Badge';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  className = '',
}) => {
  const { toggleWishlist, isWishlisted } = useCampusKart();
  const wishlisted = isWishlisted(product.id);

  const conditionColors = getConditionColor(product.condition);
  const typeBadge = getListingTypeBadge(product.listingType);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className={`group bg-white rounded-3xl border border-brand-border/70 overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer relative ${className}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-xs pointer-events-auto backdrop-blur-md ${typeBadge.bg} ${typeBadge.text} ${typeBadge.border}`}>
            {typeBadge.label}
          </span>

          {/* Heart Wishlist Button */}
          <button
            type="button"
            onClick={handleHeartClick}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 pointer-events-auto shadow-sm backdrop-blur-md ${
              wishlisted
                ? 'bg-rose-50 text-rose-500 scale-110'
                : 'bg-white/80 text-brand-muted hover:text-rose-500 hover:bg-white'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={17}
              className={`${wishlisted ? 'fill-rose-500 text-rose-500' : ''} transition-colors`}
            />
          </button>
        </div>

        {/* Bottom Badges on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${conditionColors.bg} ${conditionColors.text} ${conditionColors.border}`}>
            {product.condition}
          </span>
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] text-white/95">
            <MapPin size={11} className="text-pastel-mint" />
            {product.location}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between text-[11px] text-brand-muted mb-1.5">
            <span className="font-semibold text-pastel-sage-dark uppercase tracking-wider">
              {product.category}
            </span>
            {product.status === 'pending' && (
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Pending Request
              </span>
            )}
            {product.status === 'sold' && (
              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                Sold
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-brand-dark group-hover:text-pastel-sage-dark transition-colors line-clamp-2 leading-snug mb-2">
            {product.title}
          </h3>

          {/* Swap details if listingType === Swap */}
          {product.listingType === 'Swap' && product.swapWishlist && (
            <div className="text-[11px] font-medium text-purple-700 bg-purple-50/80 p-2 rounded-xl mb-2.5 border border-purple-100 flex items-start gap-1.5">
              <Repeat size={13} className="text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">Wants: {product.swapWishlist}</span>
            </div>
          )}
        </div>

        {/* Price & Seller Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-brand-dark tracking-tight">
                {formatCurrency(product.price)}
              </span>
              {product.rentalDuration && (
                <span className="text-[10px] font-medium text-brand-muted">
                  /{product.rentalDuration}
                </span>
              )}
            </div>
            {product.originalPrice && product.originalPrice > product.price && product.price > 0 && (
              <span className="text-[10px] text-brand-muted line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Seller Avatar & Rating */}
          <div className="flex items-center gap-2 text-right">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-[11px] font-bold text-brand-dark">
                <span>{product.seller?.name ? product.seller.name.split(' ')[0] : 'Student'}</span>
                {product.seller?.isVerified && (
                  <ShieldCheck size={12} className="text-pastel-mint-dark" />
                )}
              </div>
              <div className="flex items-center gap-0.5 text-[10px] text-amber-600 font-bold">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span>{product.seller?.rating || 4.8}</span>
              </div>
            </div>
            <img
              src={product.seller?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={product.seller?.name || 'Seller'}
              className="w-7 h-7 rounded-xl object-cover border border-pastel-mint/80 shadow-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
