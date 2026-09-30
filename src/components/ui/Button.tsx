import React from 'react';
import { sounds } from '../../game/soundEffects';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  playSound?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  disabled,
  playSound = true,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playSound && !disabled) {
      sounds.playTap();
    }
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none rounded-2xl select-none';

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-3 text-base gap-2',
    lg: 'px-6 py-4 text-lg gap-2.5 shadow-lg',
    xl: 'px-8 py-5 text-xl tracking-wide gap-3 shadow-xl',
  };

  const variantStyles = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 focus:ring-indigo-500 border border-indigo-400/20 active:bg-indigo-700',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 shadow-slate-900/40 focus:ring-slate-400 active:bg-slate-800/80',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 focus:ring-rose-500 border border-rose-400/20 active:bg-rose-700',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white focus:ring-slate-500',
    glass:
      'glass-panel hover:bg-slate-700/50 text-white shadow-lg focus:ring-indigo-500 border border-white/10 active:bg-slate-800/70',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};
