import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'accent' | 'impostor';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  interactive = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-slate-900 border border-slate-800 shadow-xl',
    glass: 'glass-card',
    accent: 'glass-card border-indigo-500/40 glow-indigo',
    impostor: 'glass-card border-rose-500/40 glow-red',
  };

  return (
    <div
      className={`
        rounded-3xl p-6 transition-all duration-200
        ${variantStyles[variant]}
        ${interactive ? 'cursor-pointer hover:border-slate-500/50 active:scale-[0.99]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
