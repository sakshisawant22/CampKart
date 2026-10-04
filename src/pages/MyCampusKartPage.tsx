import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { 
  ShoppingBag, 
  Repeat, 
  Tag, 
  TrendingUp, 
  Star, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  ArrowRight,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { RateSellerModal } from '../components/marketplace/RateSellerModal';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency } from '../utils/helpers';

export const MyCampusKartPage: React.FC = () => {
  const { 
    purchases, 
    completePurchase, 
    products, 
    currentUser, 
    swapOffers, 
    updateProductStatus 
  } = useCampusKart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'purchases' | 'listings' | 'swaps' | 'earnings'>('purchases');
  const [ratingTarget, setRatingTarget] = useState<{ sellerId: string; sellerName: string; itemTitle: string } | null>(null);

  // My listings
  const myListings = products.filter((p) => p.seller.id === currentUser.id);

  // Total Earnings
  const totalEarnings = 750 + myListings.filter((p) => p.status === 'sold').reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-pastel-sage-light via-pastel-mint-light to-pastel-warm border border-brand-border/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full border border-pastel-mint text-xs font-bold text-pastel-mint-dark shadow-xs">
              <ShoppingBag size={14} />
              <span>Campus Transaction Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
              My CampusKart
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Manage your purchases, active listings, swap proposals, and student earnings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-3xl bg-white border border-brand-border shadow-xs text-right">
              <span className="text-[10px] uppercase font-bold text-brand-muted block">Total Earned</span>
              <span className="text-lg sm:text-xl font-black text-emerald-700">₹{totalEarnings}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'purchases', label: 'Purchases & Requests', icon: ShoppingBag, count: purchases.length },
          { id: 'listings', label: 'My Listings', icon: Tag, count: myListings.length },
          { id: 'swaps', label: 'Kart Swaps', icon: Repeat, count: swapOffers.length },
          { id: 'earnings', label: 'Earnings Overview', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-pastel-sage-dark text-white shadow-soft'
                  : 'bg-white text-brand-muted hover:text-brand-dark hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PURCHASES */}
      {activeTab === 'purchases' && (
        <div className="space-y-4">
          {purchases.length > 0 ? (
            <div className="space-y-3">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="p-5 rounded-3xl bg-white border border-brand-border/80 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={purchase.productImage}
                      alt={purchase.productTitle}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-brand-dark">
                          {purchase.productTitle}
                        </h3>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          purchase.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {purchase.status === 'completed' ? '✓ Completed' : '⏳ Pending Pickup'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-brand-muted">
                        <span>Seller: <strong>{purchase.sellerName}</strong></span>
                        <span>•</span>
                        <span>Pickup: <strong>{purchase.pickupLocation}</strong></span>
                        <span>•</span>
                        <span className="font-black text-brand-dark">{formatCurrency(purchase.price)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {purchase.status === 'pending' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<CheckCircle2 size={15} />}
                        onClick={() => completePurchase(purchase.id)}
                        className="font-bold text-xs"
                      >
                        Confirm Received
                      </Button>
                    )}

                    {purchase.status === 'completed' && !purchase.isRated && (
                      <Button
                        variant="lavender"
                        size="sm"
                        icon={<Star size={14} className="fill-amber-400 text-amber-400" />}
                        onClick={() =>
                          setRatingTarget({
                            sellerId: purchase.sellerId,
                            sellerName: purchase.sellerName,
                            itemTitle: purchase.productTitle,
                          })
                        }
                        className="font-bold text-xs"
                      >
                        Rate Seller
                      </Button>
                    )}

                    {purchase.status === 'completed' && purchase.isRated && (
                      <span className="text-xs font-bold text-pastel-mint-dark bg-pastel-mint-light px-3 py-1 rounded-full border border-pastel-mint">
                        ⭐ Rated
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<ShoppingBag size={28} />}
              title="No purchases yet"
              description="Browse the campus catalog to find textbooks, electronics, and study essentials."
              actionText="Explore Marketplace"
              onAction={() => navigate('/explore')}
            />
          )}
        </div>
      )}

      {/* TAB 2: MY LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Your active & sold campus listings
            </span>
            <Button
              variant="secondary"
              size="sm"
              icon={<PlusCircle size={15} />}
              onClick={() => navigate('/sell')}
              className="font-bold text-xs"
            >
              + Post New Item
            </Button>
          </div>

          {myListings.length > 0 ? (
            <div className="space-y-3">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-white border border-brand-border/80 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-brand-dark">{item.title}</h3>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          item.status === 'sold'
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-brand-muted">
                        <span>Category: {item.category}</span>
                        <span>•</span>
                        <span>Pickup: {item.location}</span>
                        <span>•</span>
                        <span className="font-black text-brand-dark">{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status !== 'sold' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateProductStatus(item.id, 'sold')}
                        className="text-xs font-bold hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        Mark as Sold
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateProductStatus(item.id, 'active')}
                        className="text-xs font-bold"
                      >
                        Relist Active
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Tag size={28} />}
              title="You haven't listed anything yet"
              description="Turn unused books, calculators, and instruments into cash or swap for what you need."
              actionText="Sell an Item"
              onAction={() => navigate('/sell')}
              actionIcon={<PlusCircle size={16} />}
            />
          )}
        </div>
      )}

      {/* TAB 3: MY SWAPS */}
      {activeTab === 'swaps' && (
        <div className="space-y-4">
          {swapOffers.length > 0 ? (
            <div className="space-y-3">
              {swapOffers.map((swap) => (
                <div
                  key={swap.id}
                  className="p-5 rounded-3xl bg-white border border-pastel-lavender shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-2 bg-pastel-warm/60 p-2 rounded-2xl border border-slate-200">
                      <img src={swap.offeredItem.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <span className="text-[9px] font-black uppercase text-pastel-sage-dark block">Offered</span>
                        <h4 className="text-xs font-bold text-brand-dark truncate max-w-[140px]">{swap.offeredItem.title}</h4>
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-pastel-lavender text-purple-900 flex items-center justify-center mx-auto sm:mx-0">
                      <Repeat size={12} />
                    </div>

                    <div className="flex items-center gap-2 bg-pastel-warm/60 p-2 rounded-2xl border border-slate-200">
                      <img src={swap.requestedItem.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <span className="text-[9px] font-black uppercase text-pastel-lavender-dark block">Requested</span>
                        <h4 className="text-xs font-bold text-brand-dark truncate max-w-[140px]">{swap.requestedItem.title}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0">
                    <span className="text-xs font-bold bg-pastel-lavender-light text-purple-900 px-3 py-1 rounded-full border border-pastel-lavender">
                      {swap.matchScore}% Match • {swap.status.toUpperCase()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/messages')}
                      className="text-xs font-bold"
                    >
                      Chat Peer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Repeat size={28} />}
              title="No swap matches yet"
              description="Try changing what you have or what you are looking for in the Kart Swap Hub."
              actionText="Find Matches"
              onAction={() => navigate('/swap')}
            />
          )}
        </div>
      )}

      {/* TAB 4: EARNINGS OVERVIEW */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Total Student Earnings</span>
              <div className="text-3xl font-black text-emerald-700">₹{totalEarnings}</div>
              <p className="text-xs text-brand-muted">From 3 completed campus textbook sales</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Money Saved via Swaps</span>
              <div className="text-3xl font-black text-purple-700">₹1,250</div>
              <p className="text-xs text-brand-muted">Estimated retail value of swapped gear</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Circular Reuse Score</span>
              <div className="text-3xl font-black text-pastel-sage-dark">94 / 100</div>
              <p className="text-xs text-brand-muted">Top 5% sustainability champion</p>
            </div>
          </div>
        </div>
      )}

      {/* Rate Seller Modal */}
      {ratingTarget && (
        <RateSellerModal
          sellerId={ratingTarget.sellerId}
          sellerName={ratingTarget.sellerName}
          itemTitle={ratingTarget.itemTitle}
          isOpen={Boolean(ratingTarget)}
          onClose={() => setRatingTarget(null)}
        />
      )}

    </div>
  );
};
