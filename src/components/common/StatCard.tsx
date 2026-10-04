import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  variant?: 'sage' | 'mint' | 'lavender' | 'peach' | 'blue' | 'white';
  change?: string;
  isPositive?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  variant = 'white',
  change,
  isPositive = true,
  className = '',
}) => {
  const variantStyles = {
    white: 'bg-white border-brand-border/70',
    sage: 'bg-pastel-sage-light/60 border-pastel-sage/40',
    mint: 'bg-pastel-mint-light/70 border-pastel-mint/60',
    lavender: 'bg-pastel-lavender-light/70 border-pastel-lavender/60',
    peach: 'bg-pastel-peach-light/70 border-pastel-peach/60',
    blue: 'bg-pastel-blue-light/70 border-pastel-blue/60',
  };

  const iconBgStyles = {
    white: 'bg-pastel-warm text-brand-dark',
    sage: 'bg-pastel-sage text-pastel-sage-dark',
    mint: 'bg-pastel-mint text-pastel-mint-dark',
    lavender: 'bg-pastel-lavender text-pastel-lavender-dark',
    peach: 'bg-pastel-peach text-pastel-peach-dark',
    blue: 'bg-pastel-blue text-pastel-blue-dark',
  };

  return (
    <div className={`p-5 rounded-3xl border shadow-soft transition-all duration-200 hover:shadow-soft-lg ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">{label}</span>
        {icon && (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBgStyles[variant]}`}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">{value}</span>
        {change && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {change}
          </span>
        )}
      </div>
      {subtext && <p className="text-xs text-brand-muted mt-1.5">{subtext}</p>}
    </div>
  );
};
