import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sage' | 'mint' | 'lavender' | 'blue' | 'pink' | 'peach' | 'neutral' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'mint',
  size = 'md',
  className = '',
  icon,
}) => {
  const variantStyles = {
    sage: 'bg-pastel-sage-light text-pastel-sage-dark border-pastel-sage/40',
    mint: 'bg-pastel-mint-light text-pastel-mint-dark border-pastel-mint/60',
    lavender: 'bg-pastel-lavender-light text-pastel-lavender-dark border-pastel-lavender/60',
    blue: 'bg-pastel-blue-light text-pastel-blue-dark border-pastel-blue/60',
    pink: 'bg-pastel-pink-light text-pastel-pink-dark border-pastel-pink/60',
    peach: 'bg-pastel-peach-light text-pastel-peach-dark border-pastel-peach/60',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium gap-1',
    md: 'text-xs px-3 py-1 font-semibold gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 font-semibold gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} transition-colors ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
