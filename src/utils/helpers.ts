import { Condition, ListingType, Category } from '../types';

export const formatCurrency = (amount: number): string => {
  if (amount === 0) return 'Free / Swap';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const getConditionColor = (condition: Condition): { bg: string; text: string; border: string } => {
  switch (condition) {
    case 'Like New':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'Excellent':
      return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' };
    case 'Good':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'Used':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
  }
};

export const getListingTypeBadge = (type: ListingType): { bg: string; text: string; border: string; label: string } => {
  switch (type) {
    case 'Sell':
      return { bg: 'bg-pastel-mint-light', text: 'text-pastel-mint-dark', border: 'border-pastel-mint', label: 'For Sale' };
    case 'Rent':
      return { bg: 'bg-pastel-peach-light', text: 'text-pastel-peach-dark', border: 'border-pastel-peach', label: 'For Rent' };
    case 'Swap':
      return { bg: 'bg-pastel-lavender-light', text: 'text-pastel-lavender-dark', border: 'border-pastel-lavender', label: 'Kart Swap' };
  }
};

export const getCategoryMeta = (category: Category): { iconName: string; bg: string; text: string } => {
  switch (category) {
    case 'Books':
      return { iconName: 'BookOpen', bg: 'bg-emerald-100/60', text: 'text-emerald-800' };
    case 'Study Materials':
      return { iconName: 'FileText', bg: 'bg-blue-100/60', text: 'text-blue-800' };
    case 'Electronics':
      return { iconName: 'Cpu', bg: 'bg-purple-100/60', text: 'text-purple-800' };
    case 'Clothing':
      return { iconName: 'Shirt', bg: 'bg-pink-100/60', text: 'text-pink-800' };
    case 'Stationery':
      return { iconName: 'PenTool', bg: 'bg-amber-100/60', text: 'text-amber-800' };
    case 'Hostel Essentials':
      return { iconName: 'Home', bg: 'bg-orange-100/60', text: 'text-orange-800' };
    case 'Accessories':
      return { iconName: 'Watch', bg: 'bg-indigo-100/60', text: 'text-indigo-800' };
    case 'Rent / Swap':
      return { iconName: 'Repeat', bg: 'bg-teal-100/60', text: 'text-teal-800' };
    default:
      return { iconName: 'ShoppingBag', bg: 'bg-slate-100', text: 'text-slate-800' };
  }
};
