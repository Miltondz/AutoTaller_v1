import { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

// Industrial-styled form input
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, success, hint, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-primary-700">
            {label}
            {required && <span className="text-accent-600 ml-1">*</span>}
          </label>
        )}
        <motion.input
          ref={ref}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn(
            'form-input',
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500',
            success && 'border-success-500 focus:border-success-500 focus:ring-success-500',
            className
          )}
          {...(props as any)}
        />
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-danger-600"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-success-600"
          >
            <CheckCircle className="w-4 h-4" />
            {success}
          </motion.div>
        )}
        {hint && !error && !success && (
          <div className="flex items-center gap-2 text-sm text-primary-500">
            <Info className="w-4 h-4" />
            {hint}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

// Industrial-styled textarea
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  required?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, success, hint, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-primary-700">
            {label}
            {required && <span className="text-accent-600 ml-1">*</span>}
          </label>
        )}
        <motion.textarea
          ref={ref}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn(
            'form-input min-h-[100px] resize-y',
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500',
            success && 'border-success-500 focus:border-success-500 focus:ring-success-500',
            className
          )}
          {...(props as any)}
        />
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-danger-600"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-success-600"
          >
            <CheckCircle className="w-4 h-4" />
            {success}
          </motion.div>
        )}
        {hint && !error && !success && (
          <div className="flex items-center gap-2 text-sm text-primary-500">
            <Info className="w-4 h-4" />
            {hint}
          </div>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

// Industrial-styled select
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, error, success, hint, required, options, placeholder, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-primary-700">
            {label}
            {required && <span className="text-accent-600 ml-1">*</span>}
          </label>
        )}
        <motion.select
          ref={ref}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn(
            'form-input',
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500',
            success && 'border-success-500 focus:border-success-500 focus:ring-success-500',
            className
          )}
          {...(props as any)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-danger-600"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-success-600"
          >
            <CheckCircle className="w-4 h-4" />
            {success}
          </motion.div>
        )}
        {hint && !error && !success && (
          <div className="flex items-center gap-2 text-sm text-primary-500">
            <Info className="w-4 h-4" />
            {hint}
          </div>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

// Industrial-styled checkbox
interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ className, label, description, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <motion.input
            ref={ref}
            type="checkbox"
            whileTap={{ scale: 0.9 }}
            className={cn(
              'mt-1 w-5 h-5 text-accent-600 border-primary-300 rounded focus:ring-accent-500 focus:ring-2 shadow-sm',
              error && 'border-danger-500',
              className
            )}
            {...(props as any)}
          />
          <div className="flex-1">
            <label className="text-sm font-medium text-primary-700 cursor-pointer">
              {label}
            </label>
            {description && (
              <p className="text-sm text-primary-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-danger-600"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

// Industrial Card Component
interface AutomotiveCardProps {
  children: React.ReactNode
  variant?: 'default' | 'metallic' | 'service'
  className?: string
  hover?: boolean
}

export const AutomotiveCard: React.FC<AutomotiveCardProps> = ({
  children,
  variant = 'default',
  className,
  hover = false
}) => {
  const variantClasses = {
    default: 'card-automotive',
    metallic: 'card-metallic',
    service: 'service-card'
  }
  
  return (
    <div className={cn(
      variantClasses[variant],
      hover && 'hover:scale-[1.02] transition-transform duration-300',
      className
    )}>
      {children}
    </div>
  )
}

// Form section wrapper
interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('space-y-6', className)}
    >
      <div className="border-b border-primary-200 pb-4">
        <h3 className="text-lg font-semibold text-primary-900 heading-industrial">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-primary-600 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
}

// Industrial Button Components
interface AutomotiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'tool'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
}

export const AutomotiveButton: React.FC<AutomotiveButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  onClick,
  type,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    outline: 'btn-outline',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 shadow-tool hover:shadow-pressed',
    tool: 'bg-metallic text-white hover:bg-tool focus:ring-primary-500 shadow-tool hover:shadow-pressed'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
        />
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  )
}

// Industrial Status Badge
interface StatusBadgeProps {
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'pending'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  const statusClasses = {
    scheduled: 'status-scheduled',
    in_progress: 'status-in-progress', 
    completed: 'status-completed',
    cancelled: 'status-cancelled',
    pending: 'status-scheduled'
  }
  
  const statusLabels = {
    scheduled: 'Programado',
    in_progress: 'En Progreso',
    completed: 'Completado', 
    cancelled: 'Cancelado',
    pending: 'Pendiente'
  }
  
  return (
    <span className={cn(
      'status-indicator',
      statusClasses[status],
      sizeClasses[size],
      className
    )}>
      {statusLabels[status]}
    </span>
  )
}

// Industrial Progress Bar
interface ProgressBarProps {
  progress: number
  variant?: 'default' | 'service' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'default',
  size = 'md',
  showLabel = false,
  className
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const variantClasses = {
    default: 'bg-accent-600',
    service: 'bg-secondary-600',
    danger: 'bg-danger-600'
  }
  
  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-primary-600">
          <span>Progreso</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className={cn('bg-primary-200 rounded-full overflow-hidden shadow-inner', sizeClasses[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full shadow-sm', variantClasses[variant])}
        />
      </div>
    </div>
  )
}

// Industrial Alert/Notification
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  children,
  dismissible = false,
  onDismiss,
  className
}) => {
  const typeClasses = {
    info: 'bg-secondary-50 border-secondary-200 text-secondary-800',
    success: 'bg-success-50 border-success-200 text-success-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    error: 'bg-danger-50 border-danger-200 text-danger-800'
  }
  
  const iconClasses = {
    info: 'text-secondary-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    error: 'text-danger-600'
  }
  
  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'border rounded-lg p-4 shadow-sm',
        typeClasses[type],
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('flex-shrink-0', iconClasses[type])}>
          {icons[type]}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  )
}

// Industrial Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'accent' | 'white'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3'
  }
  
  const variantClasses = {
    primary: 'border-primary-600 border-t-transparent',
    accent: 'border-accent-600 border-t-transparent',
    white: 'border-white border-t-transparent'
  }
  
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={cn(
        'rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  )
}