import React, { useState } from 'react';
import { Product } from '../../types';
import { useCampusKart } from '../../context/CampusKartContext';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Star, 
  MessageSquare, 
  ShoppingBag, 
  Repeat, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Shield,
  Eye
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatCurrency, getConditionColor, getListingTypeBadge } from '../../utils/helpers';
import { RequestBuyModal } from './RequestBuyModal';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSwap?: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenSwap,
}) => {
  const { toggleWishlist, isWishlisted, getOrCreateConversation, currentUser, showToast } = useCampusKart();
  const navigate = useNavigate();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);
  const conditionMeta = getConditionColor(product.condition);
  const typeBadge = getListingTypeBadge(product.listingType);
  const isOwner = currentUser.id === product.seller.id;

  const handleChatSeller = () => {
    onClose();
    const convId = getOrCreateConversation(product.seller, product);
    navigate(`/messages?conv=${convId}`);
  };

  const handleBuyClick = () => {
    if (product.listingType === 'Swap') {
      onClose();
      if (onOpenSwap) {
        onOpenSwap(product);
      } else {
        navigate('/swap');
      }
      return;
    }
    setIsBuyModalOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('CampusKart link copied to clipboard!', 'info');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen && !isBuyModalOpen} onClose={onClose} maxWidth="3xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 flex flex-col gap-3">
            {/* Main Active Image */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-xs backdrop-blur-md ${typeBadge.bg} ${typeBadge.text} ${typeBadge.border}`}>
                  {typeBadge.label}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-xs backdrop-blur-md ${conditionMeta.bg} ${conditionMeta.text} ${conditionMeta.border}`}>
                  {product.condition}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-pastel-sage-dark ring-2 ring-pastel-sage/40 scale-105'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Indicators Box */}
            <div className="p-4 rounded-2xl bg-pastel-mint-light/60 border border-pastel-mint/80 space-y-2 text-xs text-pastel-mint-dark font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-pastel-mint-dark flex-shrink-0" />
                <span>Verified College Student Listing</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-pastel-mint-dark flex-shrink-0" />
                <span>Direct Campus Pickup: <strong>{product.location}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-pastel-mint-dark flex-shrink-0" />
                <span>No delivery charges or shipping delay</span>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Action Top */}
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-pastel-sage-dark mb-1.5">
                <span className="uppercase tracking-wider">{product.category}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-full text-brand-muted hover:text-brand-dark hover:bg-slate-100 transition-colors"
                    title="Share item"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-1.5 rounded-full transition-colors ${
                      wishlisted ? 'text-rose-500 bg-rose-50' : 'text-brand-muted hover:text-rose-500 hover:bg-slate-100'
                    }`}
                    title={wishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart size={18} className={wishlisted ? 'fill-rose-500' : ''} />
                  </button>
                </div>
              </div>

              {/* Product Title */}
              <h2 className="text-xl sm:text-2xl font-black text-brand-dark leading-snug tracking-tight mb-3">
                {product.title}
              </h2>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-slate-100">
                <span className="text-3xl font-black text-brand-dark tracking-tight">
                  {formatCurrency(product.price)}
                </span>
                {product.rentalDuration && (
                  <span className="text-xs font-semibold text-pastel-peach-dark bg-pastel-peach-light px-2.5 py-1 rounded-full border border-pastel-peach">
                    {product.rentalDuration}
                  </span>
                )}
                {product.originalPrice && product.originalPrice > product.price && product.price > 0 && (
                  <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save ₹{product.originalPrice - product.price} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2 mb-5">
                <h4 className="text-xs font-bold text-brand-muted uppercase tracking-wider">Item Details</h4>
                <p className="text-xs sm:text-sm text-brand-dark leading-relaxed whitespace-pre-line bg-pastel-warm/40 p-3.5 rounded-2xl border border-slate-100">
                  {product.description}
                </p>
              </div>

              {/* Swap Wishlist Details if applicable */}
              {product.listingType === 'Swap' && (
                <div className="mb-5 p-3.5 rounded-2xl bg-pastel-lavender-light border border-pastel-lavender space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-pastel-lavender-dark">
                    <Repeat size={14} />
                    <span>Seller is looking to swap for:</span>
                  </div>
                  <p className="text-xs text-brand-dark font-medium">
                    {product.swapWishlist || 'Open to tech gadgets, books, or hostel essentials.'}
                  </p>
                </div>
              )}

              {/* Seller Profile Card */}
              <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-xs flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-pastel-mint shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-brand-dark">{product.seller.name}</span>
                      {product.seller.isVerified && (
                        <ShieldCheck size={14} className="text-pastel-mint-dark" />
                      )}
                    </div>
                    <p className="text-[11px] text-brand-muted">
                      {product.seller.department} • {product.seller.year}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex items-center text-amber-500 text-xs font-bold">
                        <Star size={12} className="fill-amber-400 text-amber-400 mr-0.5" />
                        <span>{product.seller.rating}</span>
                      </div>
                      <span className="text-[10px] text-brand-muted">
                        • {product.seller.successfulTransactions || 12} transactions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] bg-slate-100 font-semibold text-slate-700 px-2 py-1 rounded-full">
                    Member since {product.seller.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  icon={<MessageSquare size={17} />}
                  onClick={handleChatSeller}
                  className="font-bold border-brand-border hover:border-pastel-sage"
                >
                  Chat Seller
                </Button>

                <Button
                  variant={product.listingType === 'Swap' ? 'lavender' : 'primary'}
                  size="lg"
                  icon={product.listingType === 'Swap' ? <Repeat size={17} /> : <ShoppingBag size={17} />}
                  onClick={handleBuyClick}
                  className="font-bold"
                >
                  {product.listingType === 'Swap' 
                    ? 'Request Swap' 
                    : product.listingType === 'Rent' 
                    ? 'Rent Item' 
                    : 'Buy / Request Item'}
                </Button>
              </div>

              <p className="text-[10px] text-center text-brand-muted">
                🛡️ Campus Safety: Always meet in public campus zones (Library, Main Building, Canteen).
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Buy Confirmation Modal */}
      <RequestBuyModal
        product={product}
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onSuccess={() => {
          setIsBuyModalOpen(false);
          onClose();
        }}
      />
    </>
  );
};
