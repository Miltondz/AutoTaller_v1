import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'industrial' | 'tool' | 'elevated';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-white rounded-xl shadow-industrial border border-primary-200/80 overflow-hidden',
    industrial: 'bg-white rounded-xl shadow-tool border border-primary-300 overflow-hidden',
    tool: 'bg-metallic text-white rounded-xl shadow-tool border border-primary-600 overflow-hidden',
    elevated: 'bg-white rounded-xl shadow-industrial border border-primary-200/80 overflow-hidden hover:shadow-tool',
  };

  const hoverEffects = {
    default: { y: -3, scale: 1.02 },
    industrial: { y: -2, rotate: 0.5 },
    tool: { y: -2, rotate: -0.5 },
    elevated: { y: -5, scale: 1.03 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={hoverEffects[variant]}
      className={cn(variants[variant], className)}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className, variant = 'default' }: CardProps) {
  const variants = {
    default: 'px-6 py-5 border-b border-primary-200',
    industrial: 'px-6 py-5 border-b border-primary-300 bg-primary-50',
    tool: 'px-6 py-5 border-b border-primary-500 bg-primary-800',
    elevated: 'px-6 py-5 border-b border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50',
  };

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, variant = 'default' }: CardProps) {
  const variants = {
    default: 'px-6 py-5',
    industrial: 'px-6 py-5',
    tool: 'px-6 py-5 text-white',
    elevated: 'px-6 py-5',
  };

  return <div className={cn(variants[variant], className)}>{children}</div>;
}

export function CardFooter({ children, className, variant = 'default' }: CardProps) {
  const variants = {
    default: 'px-6 py-5 bg-primary-50 border-t border-primary-200',
    industrial: 'px-6 py-5 bg-primary-100 border-t border-primary-300',
    tool: 'px-6 py-5 bg-primary-900 border-t border-primary-500',
    elevated: 'px-6 py-5 bg-gradient-to-r from-primary-50 to-accent-50 border-t border-primary-200',
  };

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
}
