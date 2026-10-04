import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  actionIcon,
  secondaryActionText,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-white/70 border border-brand-border/60 shadow-soft max-w-lg mx-auto ${className}`}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-pastel-mint-light border border-pastel-mint text-pastel-mint-dark flex items-center justify-center mb-4 shadow-sm">
          {icon}
        </div>
      )}
      <h4 className="text-xl font-bold text-brand-dark mb-2">{title}</h4>
      <p className="text-sm text-brand-muted mb-6 leading-relaxed max-w-sm">{description}</p>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionText && onAction && (
          <Button variant="primary" onClick={onAction} icon={actionIcon}>
            {actionText}
          </Button>
        )}
        {secondaryActionText && onSecondaryAction && (
          <Button variant="outline" onClick={onSecondaryAction}>
            {secondaryActionText}
          </Button>
        )}
      </div>
    </div>
  );
};
