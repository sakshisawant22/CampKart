import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { Category, Condition, ListingType, CampusLocation } from '../types';
import { 
  PlusCircle, 
  Image as ImageIcon, 
  DollarSign, 
  Repeat, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Upload,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { triggerCelebration } from '../utils/confetti';

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

const CONDITIONS: Condition[] = ['Like New', 'Excellent', 'Good', 'Used'];

const LOCATIONS: CampusLocation[] = [
  'Block A',
  'Block B',
  'Main Building',
  'Library',
  "Girls' Hostel",
  "Boys' Hostel",
  'Hostel Block',
  'Student Center',
];

const PRESET_SAMPLE_PHOTOS = [
  { name: 'Python Book', url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd3?w=600&auto=format&fit=crop&q=80' },
  { name: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80' },
  { name: 'Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80' },
  { name: 'Drawing Kit', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Hostel Kettle', url: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80' },
];

export const SellItemPage: React.FC = () => {
  const { addProduct, showToast } = useCampusKart();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Books');
  const [condition, setCondition] = useState<Condition>('Like New');
  const [listingType, setListingType] = useState<ListingType>('Sell');
  
  const [price, setPrice] = useState<number | string>('280');
  const [rentalDuration, setRentalDuration] = useState('per week');
  const [swapWishlist, setSwapWishlist] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<string>('Library');
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_SAMPLE_PHOTOS[0].url);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdItemId, setCreatedItemId] = useState<string | null>(null);

  // Pre-fill Demo Flow B Helper
  const handlePreFillDemoB = () => {
    setTitle('Python Programming & Data Structures (2nd Edition)');
    setCategory('Books');
    setCondition('Like New');
    setListingType('Sell');
    setPrice(280);
    setLocation('Library');
    setDescription('Comprehensive Python textbook with clean code examples, algorithms, and OOP exercises. Zero pen markings, spine intact, like new condition.');
    setSelectedPhoto('https://images.unsplash.com/photo-1532012164546-f432f2e3edd3?w=600&auto=format&fit=crop&q=80');
    showToast('Form pre-filled with Python Programming Book (Demo Flow B)!', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Please enter an item name.', 'warning');
      return;
    }

    if (listingType === 'Sell' && (!price || Number(price) <= 0)) {
      showToast('Please enter a valid selling price.', 'warning');
      return;
    }

    if (listingType === 'Swap' && !swapWishlist.trim()) {
      showToast('Please specify what you are looking to swap for.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newProduct = addProduct({
        title: title.trim(),
        category,
        condition,
        listingType,
        price: listingType === 'Swap' ? 0 : Number(price) || 0,
        rentalDuration: listingType === 'Rent' ? rentalDuration : undefined,
        swapWishlist: listingType === 'Swap' ? swapWishlist.trim() : undefined,
        description: description.trim() || 'No additional description provided.',
        location,
        images: [selectedPhoto],
      });

      setIsSubmitting(false);
      setCreatedItemId(newProduct.id);
      setIsSuccessModalOpen(true);
      triggerCelebration();
      showToast('🎉 Item listed successfully on CampusKart!', 'success');
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-14">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-pastel-sage-light via-pastel-mint-light to-pastel-warm border border-brand-border/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full border border-pastel-mint text-xs font-bold text-pastel-mint-dark shadow-xs">
              <PlusCircle size={14} />
              <span>Post to Verified Campus</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
              Sell an Item
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Turn unused items into money — or swap them for something you need.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handlePreFillDemoB}
            icon={<Sparkles size={14} />}
            className="font-bold border border-pastel-mint shadow-xs whitespace-nowrap self-start sm:self-center"
          >
            Demo Auto-Fill (Flow B)
          </Button>
        </div>
      </div>

      {/* Main Listing Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-4xl p-6 sm:p-10 border border-brand-border/80 shadow-soft space-y-8">
        
        {/* 1. PHOTO SELECTION */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider flex items-center justify-between">
            <span>1. Product Photos</span>
            <span className="text-brand-muted normal-case font-medium text-[11px]">Select photo or preset</span>
          </label>

          {/* Active Preview */}
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-slate-100 border-2 border-dashed border-pastel-mint flex-shrink-0 relative group">
              <img src={selectedPhoto} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold">
                Selected
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-brand-dark">Choose Sample Photo Preset:</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_SAMPLE_PHOTOS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhoto(sample.url)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      selectedPhoto === sample.url
                        ? 'bg-pastel-mint-light border-pastel-mint-dark text-brand-dark font-bold ring-1 ring-pastel-mint-dark'
                        : 'bg-pastel-warm/60 border-slate-200 text-brand-muted hover:border-slate-300'
                    }`}
                  >
                    📷 {sample.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. ITEM NAME */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
            2. Item Name *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Python Programming Book / Casio Scientific Calculator"
            className="w-full px-4 py-3 rounded-2xl bg-pastel-warm/50 border border-brand-border text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage focus:outline-none"
          />
        </div>

        {/* 3. CATEGORY & CONDITION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
              3. Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-3 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm font-medium text-brand-dark focus:ring-2 focus:ring-pastel-sage"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
              4. Condition *
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as Condition)}
              className="w-full px-4 py-3 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm font-medium text-brand-dark focus:ring-2 focus:ring-pastel-sage"
            >
              {CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. WHAT DO YOU WANT? (SELL / RENT / SWAP) */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
            5. What do you want to do? *
          </label>

          <div className="grid grid-cols-3 gap-3">
            {/* SELL */}
            <button
              type="button"
              onClick={() => setListingType('Sell')}
              className={`p-4 rounded-3xl border text-center transition-all ${
                listingType === 'Sell'
                  ? 'bg-pastel-mint-light border-pastel-mint-dark ring-2 ring-pastel-mint shadow-soft'
                  : 'bg-pastel-warm/40 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-pastel-mint text-pastel-mint-dark flex items-center justify-center mx-auto mb-1.5 shadow-xs font-black">
                ₹
              </div>
              <span className="font-extrabold text-xs sm:text-sm text-brand-dark block">Sell</span>
              <span className="text-[10px] text-brand-muted">Get Cash</span>
            </button>

            {/* RENT */}
            <button
              type="button"
              onClick={() => setListingType('Rent')}
              className={`p-4 rounded-3xl border text-center transition-all ${
                listingType === 'Rent'
                  ? 'bg-pastel-peach-light border-pastel-peach-dark ring-2 ring-pastel-peach shadow-soft'
                  : 'bg-pastel-warm/40 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-pastel-peach text-pastel-peach-dark flex items-center justify-center mx-auto mb-1.5 shadow-xs">
                <Clock size={18} />
              </div>
              <span className="font-extrabold text-xs sm:text-sm text-brand-dark block">Rent</span>
              <span className="text-[10px] text-brand-muted">Temporary</span>
            </button>

            {/* SWAP */}
            <button
              type="button"
              onClick={() => setListingType('Swap')}
              className={`p-4 rounded-3xl border text-center transition-all ${
                listingType === 'Swap'
                  ? 'bg-pastel-lavender-light border-pastel-lavender-dark ring-2 ring-pastel-lavender shadow-soft'
                  : 'bg-pastel-warm/40 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-pastel-lavender text-pastel-lavender-dark flex items-center justify-center mx-auto mb-1.5 shadow-xs">
                <Repeat size={18} />
              </div>
              <span className="font-extrabold text-xs sm:text-sm text-brand-dark block">Kart Swap</span>
              <span className="text-[10px] text-brand-muted">Zero Cash</span>
            </button>
          </div>
        </div>

        {/* DYNAMIC FIELDS ACCORDING TO LISTING TYPE */}
        {listingType === 'Sell' && (
          <div className="space-y-2 p-4 rounded-3xl bg-pastel-mint-light/40 border border-pastel-mint">
            <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
              Selling Price (₹) *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-brand-dark">₹</span>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="280"
                className="w-full pl-9 pr-4 py-3 rounded-2xl bg-white border border-brand-border text-sm font-bold text-brand-dark focus:ring-2 focus:ring-pastel-sage"
              />
            </div>
          </div>
        )}

        {listingType === 'Rent' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-3xl bg-pastel-peach-light/40 border border-pastel-peach">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
                Rental Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-brand-dark">₹</span>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="150"
                  className="w-full pl-9 pr-4 py-3 rounded-2xl bg-white border border-brand-border text-sm font-bold text-brand-dark"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
                Rental Duration *
              </label>
              <select
                value={rentalDuration}
                onChange={(e) => setRentalDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-border text-sm font-medium text-brand-dark"
              >
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per semester">Per Semester</option>
              </select>
            </div>
          </div>
        )}

        {listingType === 'Swap' && (
          <div className="space-y-2 p-4 rounded-3xl bg-pastel-lavender-light/40 border border-pastel-lavender">
            <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
              What are you looking to swap for? *
            </label>
            <input
              type="text"
              required
              value={swapWishlist}
              onChange={(e) => setSwapWishlist(e.target.value)}
              placeholder="e.g. Scientific Calculator or Data Structures textbook"
              className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-border text-sm font-medium text-brand-dark"
            />
          </div>
        )}

        {/* 6. DESCRIPTION */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
            6. Item Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mention condition, course code, number of pages, or reason for selling..."
            className="w-full p-4 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage focus:outline-none"
          />
        </div>

        {/* 7. PICKUP LOCATION */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-brand-dark uppercase tracking-wider flex items-center gap-1.5">
            <MapPin size={14} className="text-pastel-sage-dark" />
            <span>7. Preferred Campus Pickup Spot</span>
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm font-medium text-brand-dark"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            icon={<PlusCircle size={18} />}
            className="w-full font-black text-base justify-center shadow-soft-lg"
          >
            Post Item to Marketplace
          </Button>
        </div>
      </form>

      {/* SUCCESS MODAL */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        maxWidth="md"
      >
        <div className="text-center space-y-5 py-4">
          <div className="w-16 h-16 rounded-3xl bg-pastel-mint-light text-pastel-mint-dark flex items-center justify-center mx-auto border-2 border-pastel-mint shadow-soft animate-bounce">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-brand-dark">
              🎉 Item Listed Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xs mx-auto leading-relaxed">
              Your item <strong>"{title}"</strong> is now live and visible to verified students on your campus.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setIsSuccessModalOpen(false);
                navigate('/my-campuskart');
              }}
              className="flex-1 font-bold"
            >
              View in My Listings
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              onClick={() => {
                setIsSuccessModalOpen(false);
                navigate('/explore');
              }}
              className="flex-1 font-bold"
            >
              See in Marketplace
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
