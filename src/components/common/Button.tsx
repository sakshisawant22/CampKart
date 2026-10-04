import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'lavender' | 'peach' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm';

  const variants = {
    primary: 'bg-gradient-to-r from-[#F7B46F] via-[#F39B5A] to-[#EA7C4B] text-white hover:brightness-110 focus:ring-[#F2A76B] shadow-soft hover:shadow-soft-lg',
    secondary: 'bg-[#FDE7DA] text-[#A5532B] hover:bg-[#F9D7BF] focus:ring-[#F7B46F] font-semibold shadow-soft hover:shadow-glow-peach',
    lavender: 'bg-pastel-lavender text-pastel-lavender-dark hover:bg-[#C9B5E0] focus:ring-pastel-lavender font-semibold shadow-soft hover:shadow-glow-lavender',
    peach: 'bg-[#F8C7AE] text-[#8F4B2D] hover:bg-[#F4AF87] focus:ring-[#F7B46F] font-semibold shadow-soft hover:shadow-glow-peach',
    outline: 'bg-white text-brand-dark border border-[#F4C7A5] hover:bg-[#FFF4EC] hover:border-[#E9A56E] focus:ring-[#F7B46F]/40 shadow-none',
    ghost: 'bg-transparent text-brand-dark hover:bg-[#FFF4EC] focus:ring-[#F7B46F]/30 shadow-none',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-400',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 rounded-xl',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-2xl',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-2xl font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
