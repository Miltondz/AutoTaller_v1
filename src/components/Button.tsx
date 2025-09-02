import React from 'react';
import { cn } from '../lib/utils';
import { motion, MotionProps } from 'framer-motion';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tool' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none mechanical-hover';

  const variants = {
    primary: 'bg-accent-red text-white hover:bg-red-700 focus:ring-accent-red shadow-tool hover:shadow-tool active:shadow-pressed hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-tool hover:shadow-tool active:shadow-pressed hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white focus:ring-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-tool hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'text-primary-700 hover:bg-primary-100 focus:ring-primary-500 hover:shadow-sm',
    tool: 'bg-metallic text-white hover:bg-tool focus:ring-primary-500 shadow-tool hover:shadow-tool active:shadow-pressed hover:-translate-y-0.5 active:translate-y-0',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 shadow-tool hover:shadow-tool active:shadow-pressed hover:-translate-y-0.5 active:translate-y-0',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ 
        scale: variant === 'ghost' ? 1.02 : 1.05,
        rotate: variant === 'tool' ? 1 : 0
      }}
      whileTap={{ 
        scale: 0.98,
        rotate: 0
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 17,
        rotate: { duration: 0.2 }
      }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}