import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

/**
 * Industrial Component Library
 * Tool-inspired components with metallic effects and mechanical animations
 */

// Industrial Button Component
interface IndustrialButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'metallic' | 'tool';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function IndustrialButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
}: IndustrialButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-3 text-base gap-2',
    lg: 'px-6 py-4 text-lg gap-3',
    xl: 'px-8 py-5 text-xl gap-3',
  };

  const variantClasses = {
    primary: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500 shadow-tool hover:shadow-pressed active:shadow-pressed transform hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-tool hover:shadow-pressed active:shadow-pressed transform hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white focus:ring-primary-500 bg-metallic shadow-tool hover:shadow-pressed',
    metallic: 'bg-metallic text-white hover:bg-tool focus:ring-primary-500 shadow-tool hover:shadow-pressed transform hover:-translate-y-0.5 active:translate-y-0',
    tool: 'bg-gradient-to-br from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-tool hover:shadow-pressed transform hover:-translate-y-0.5 active:translate-y-0',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
}

// Industrial Card Component
interface IndustrialCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'metallic' | 'tool' | 'service' | 'appointment';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export function IndustrialCard({
  children,
  variant = 'default',
  hover = false,
  className = '',
  onClick,
}: IndustrialCardProps) {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white border border-primary-200 shadow-industrial',
    metallic: 'bg-metallic text-white shadow-tool',
    tool: 'bg-tool text-white shadow-tool',
    service: 'bg-white border border-primary-200 shadow-industrial hover:border-accent-300 hover:shadow-lg',
    appointment: 'bg-white border border-primary-200 shadow-industrial hover:border-secondary-300 hover:shadow-lg',
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  );
}

// Industrial Form Input
interface IndustrialInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function IndustrialInput({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon,
  className = '',
}: IndustrialInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-primary-800 text-industrial-bold">
          {label}
          {required && <span className="text-accent-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3 border border-primary-300 rounded-lg 
            focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
            transition-all duration-200 shadow-industrial
            bg-white text-primary-800 placeholder-primary-400
            disabled:bg-primary-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500' : ''}
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-danger-600 font-medium">{error}</p>
      )}
    </div>
  );
}

// Industrial Select Component
interface IndustrialSelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function IndustrialSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
}: IndustrialSelectProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-primary-800 text-industrial-bold">
          {label}
          {required && <span className="text-accent-600 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-3 border border-primary-300 rounded-lg 
          focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
          transition-all duration-200 shadow-industrial
          bg-white text-primary-800
          disabled:bg-primary-50 disabled:cursor-not-allowed
          ${error ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500' : ''}
        `}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-danger-600 font-medium">{error}</p>
      )}
    </div>
  );
}

// Industrial Badge Component
interface IndustrialBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'metallic';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function IndustrialBadge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: IndustrialBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variantClasses = {
    default: 'bg-primary-100 text-primary-800 border border-primary-200',
    success: 'bg-success-100 text-success-800 border border-success-200',
    warning: 'bg-warning-100 text-warning-800 border border-warning-200',
    danger: 'bg-danger-100 text-danger-800 border border-danger-200',
    info: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
    metallic: 'bg-metallic text-white shadow-tool',
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Industrial Progress Bar
interface IndustrialProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function IndustrialProgress({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'default',
  className = '',
}: IndustrialProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantClasses = {
    default: 'bg-accent-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    danger: 'bg-danger-600',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm font-semibold text-primary-800">{label}</span>}
          {showPercentage && <span className="text-sm text-primary-600">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="w-full bg-primary-200 rounded-full h-3 shadow-inner">
        <motion.div
          className={`h-3 rounded-full ${variantClasses[variant]} shadow-tool`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Industrial Alert Component
interface IndustrialAlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function IndustrialAlert({
  children,
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
}: IndustrialAlertProps) {
  const variantClasses = {
    info: 'bg-secondary-50 border-secondary-200 text-secondary-800',
    success: 'bg-success-50 border-success-200 text-success-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    danger: 'bg-danger-50 border-danger-200 text-danger-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-4 border rounded-lg shadow-industrial ${variantClasses[variant]} ${className}`}
    >
      <div className="flex items-start">
        {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <div>{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 ml-3 text-current hover:opacity-70 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Industrial Loading Spinner
interface IndustrialSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'metallic';
  className?: string;
}

export function IndustrialSpinner({
  size = 'md',
  variant = 'default',
  className = '',
}: IndustrialSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    default: 'text-accent-600',
    metallic: 'text-primary-400',
  };

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}