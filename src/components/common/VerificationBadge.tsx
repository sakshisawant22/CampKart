import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const textStyles = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold bg-pastel-mint-light text-pastel-mint-dark border border-pastel-mint/80 rounded-full shadow-xs ${textStyles[size]} ${className}`}
      title="Verified Student via College Email & ID"
    >
      <ShieldCheck size={iconSizes[size]} className="text-pastel-mint-dark flex-shrink-0" />
      {showText && <span>Verified Student</span>}
    </span>
  );
};
