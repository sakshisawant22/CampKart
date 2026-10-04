import React from 'react';
import { Category } from '../../types';
import { 
  BookOpen, 
  FileText, 
  Cpu, 
  Shirt, 
  PenTool, 
  Home, 
  Watch, 
  Repeat,
  ShoppingBag
} from 'lucide-react';

interface CategoryCardProps {
  category: Category | 'All';
  isSelected?: boolean;
  onClick: () => void;
  count?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onClick,
  count,
}) => {
  const getCategoryDetails = (cat: Category | 'All') => {
    switch (cat) {
      case 'All':
        return {
          icon: ShoppingBag,
          color: 'from-pastel-sage to-pastel-mint',
          bgColor: 'bg-pastel-sage-light',
          textColor: 'text-pastel-sage-dark',
        };
      case 'Books':
        return {
          icon: BookOpen,
          color: 'from-emerald-400 to-teal-300',
          bgColor: 'bg-emerald-50',
          textColor: 'text-emerald-800',
        };
      case 'Study Materials':
        return {
          icon: FileText,
          color: 'from-blue-400 to-cyan-300',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800',
        };
      case 'Electronics':
        return {
          icon: Cpu,
          color: 'from-purple-400 to-indigo-300',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-800',
        };
      case 'Clothing':
        return {
          icon: Shirt,
          color: 'from-pink-400 to-rose-300',
          bgColor: 'bg-pink-50',
          textColor: 'text-pink-800',
        };
      case 'Stationery':
        return {
          icon: PenTool,
          color: 'from-amber-400 to-yellow-300',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-800',
        };
      case 'Hostel Essentials':
        return {
          icon: Home,
          color: 'from-orange-400 to-amber-300',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-800',
        };
      case 'Accessories':
        return {
          icon: Watch,
          color: 'from-indigo-400 to-blue-300',
          bgColor: 'bg-indigo-50',
          textColor: 'text-indigo-800',
        };
      case 'Rent / Swap':
        return {
          icon: Repeat,
          color: 'from-teal-400 to-emerald-300',
          bgColor: 'bg-teal-50',
          textColor: 'text-teal-800',
        };
      default:
        return {
          icon: ShoppingBag,
          color: 'from-slate-400 to-slate-300',
          bgColor: 'bg-slate-50',
          textColor: 'text-slate-800',
        };
    }
  };

  const { icon: Icon, color, bgColor, textColor } = getCategoryDetails(category);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-3xl border transition-all duration-200 min-w-[90px] sm:min-w-[110px] text-center group ${
        isSelected
          ? 'bg-white border-pastel-sage-dark shadow-soft-lg ring-2 ring-pastel-sage/50 scale-105'
          : 'bg-white/80 border-brand-border/70 hover:bg-white hover:border-slate-300 hover:shadow-soft'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110 shadow-xs ${
          isSelected ? 'bg-gradient-to-tr ' + color + ' text-white' : bgColor + ' ' + textColor
        }`}
      >
        <Icon size={22} />
      </div>
      <span className={`text-xs font-bold truncate max-w-[90px] ${isSelected ? 'text-brand-dark' : 'text-brand-muted group-hover:text-brand-dark'}`}>
        {category}
      </span>
      {count !== undefined && (
        <span className="text-[10px] font-medium text-brand-muted mt-0.5">
          {count} items
        </span>
      )}
    </button>
  );
};
