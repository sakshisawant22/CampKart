import React from 'react';
import { User, Product, Category, Condition } from '../../types';
import { Repeat, ShieldCheck, Star, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '../common/Button';

export interface SwapMatchItem {
  id: string;
  student: User;
  matchScore: number;
  hasItem: {
    title: string;
    category: Category;
    condition: Condition;
    image: string;
    estimatedValue: number;
  };
  wantsItem: {
    title: string;
    category: Category;
    condition: Condition;
    image: string;
    estimatedValue: number;
  };
  compatibilities: string[];
}

interface SwapMatchCardProps {
  match: SwapMatchItem;
  onRequestSwap: (match: SwapMatchItem) => void;
}

export const SwapMatchCard: React.FC<SwapMatchCardProps> = ({ match, onRequestSwap }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-pastel-lavender/80 shadow-soft hover:shadow-soft-xl transition-all duration-300 relative overflow-hidden group">
      {/* Background soft glow banner */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-pastel-lavender-light via-pastel-mint-light to-transparent rounded-bl-full pointer-events-none -z-0 opacity-60" />

      {/* Top Header: Match Badge & Student Profile */}
      <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={match.student.avatar}
              alt={match.student.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-pastel-lavender shadow-xs"
            />
            {match.student.isVerified && (
              <ShieldCheck size={14} className="text-pastel-mint-dark absolute -bottom-1 -right-1 bg-white rounded-full" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm sm:text-base text-brand-dark">{match.student.name}</h4>
              <span className="text-[10px] font-semibold bg-pastel-mint-light text-pastel-mint-dark px-2 py-0.5 rounded-full border border-pastel-mint/80">
                Verified
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <span>{match.student.department}</span>
              <span>•</span>
              <div className="flex items-center text-amber-500 font-bold">
                <Star size={11} className="fill-amber-400 mr-0.5" />
                <span>{match.student.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Match Percentage Pill */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-pastel-lavender to-pastel-mint text-brand-dark font-black text-xs sm:text-sm shadow-xs border border-pastel-lavender">
            <Sparkles size={14} className="text-purple-700 animate-pulse" />
            <span>{match.matchScore}% Match</span>
          </div>
          <span className="text-[10px] text-brand-muted mt-0.5 font-medium">Algorithmic Fit</span>
        </div>
      </div>

      {/* Swap Visual Exchange Box */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center p-4 rounded-2xl bg-pastel-warm/50 border border-brand-border/60 mb-5 relative z-10">
        
        {/* Has Item */}
        <div className="md:col-span-5 flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <img
            src={match.hasItem.image}
            alt={match.hasItem.title}
            className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase text-pastel-mint-dark tracking-wider block">
              They Have
            </span>
            <h5 className="text-xs font-bold text-brand-dark truncate">{match.hasItem.title}</h5>
            <div className="flex items-center gap-1.5 text-[10px] text-brand-muted mt-0.5">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded">{match.hasItem.condition}</span>
              <span>•</span>
              <span>Est. ₹{match.hasItem.estimatedValue}</span>
            </div>
          </div>
        </div>

        {/* Middle Exchange Indicator */}
        <div className="md:col-span-1 flex items-center justify-center py-1">
          <div className="w-8 h-8 rounded-full bg-pastel-lavender text-pastel-lavender-dark flex items-center justify-center shadow-xs">
            <Repeat size={15} />
          </div>
        </div>

        {/* Wants Item */}
        <div className="md:col-span-5 flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <img
            src={match.wantsItem.image}
            alt={match.wantsItem.title}
            className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase text-pastel-lavender-dark tracking-wider block">
              They Want
            </span>
            <h5 className="text-xs font-bold text-brand-dark truncate">{match.wantsItem.title}</h5>
            <div className="flex items-center gap-1.5 text-[10px] text-brand-muted mt-0.5">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded">{match.wantsItem.condition}</span>
              <span>•</span>
              <span>Est. ₹{match.wantsItem.estimatedValue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compatibility highlights */}
      <div className="flex flex-wrap items-center gap-2 mb-5 text-[11px] text-brand-muted">
        {match.compatibilities.map((tag, idx) => (
          <span key={idx} className="flex items-center gap-1 bg-pastel-warm px-2.5 py-1 rounded-xl font-medium border border-slate-200/60">
            <Check size={11} className="text-emerald-600" />
            {tag}
          </span>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs text-brand-muted font-medium">
          Zero cash required • Direct campus trade
        </span>
        <Button
          variant="lavender"
          size="md"
          icon={<Repeat size={16} />}
          onClick={() => onRequestSwap(match)}
          className="font-bold shadow-soft"
        >
          Request Swap
        </Button>
      </div>
    </div>
  );
};
