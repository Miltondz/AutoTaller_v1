import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Wrench,
  Calendar
} from 'lucide-react';

type AppointmentStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
type PaymentStatus = 'pending' | 'completed' | 'failed';

interface StatusBadgeProps {
  status: AppointmentStatus | PaymentStatus;
  type?: 'appointment' | 'payment';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({ 
  status, 
  type = 'appointment', 
  size = 'md', 
  showIcon = true,
  className 
}: StatusBadgeProps) {
  const getStatusConfig = () => {
    const configs = {
      // Appointment statuses
      scheduled: {
        label: 'Programada',
        icon: Calendar,
        className: 'bg-secondary-100 text-secondary-800 border-secondary-200',
        dotColor: 'bg-secondary-500'
      },
      in_progress: {
        label: 'En Progreso',
        icon: Wrench,
        className: 'bg-warning-100 text-warning-800 border-warning-200',
        dotColor: 'bg-warning-500'
      },
      completed: {
        label: 'Completada',
        icon: CheckCircle,
        className: 'bg-success-100 text-success-800 border-success-200',
        dotColor: 'bg-success-500'
      },
      cancelled: {
        label: 'Cancelada',
        icon: XCircle,
        className: 'bg-danger-100 text-danger-800 border-danger-200',
        dotColor: 'bg-danger-500'
      },
      // Payment statuses
      pending: {
        label: 'Pendiente',
        icon: Clock,
        className: 'bg-warning-100 text-warning-800 border-warning-200',
        dotColor: 'bg-warning-500'
      },
      failed: {
        label: 'Fallido',
        icon: AlertCircle,
        className: 'bg-danger-100 text-danger-800 border-danger-200',
        dotColor: 'bg-danger-500'
      }
    };

    return configs[status] || configs.scheduled;
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        config.className,
        sizes[size],
        className
      )}
    >
      {showIcon && (
        <motion.div
          animate={{ rotate: status === 'in_progress' ? 360 : 0 }}
          transition={{ 
            duration: status === 'in_progress' ? 2 : 0,
            repeat: status === 'in_progress' ? Infinity : 0,
            ease: 'linear'
          }}
        >
          <Icon className={iconSizes[size]} />
        </motion.div>
      )}
      <span>{config.label}</span>
      <motion.div
        className={cn('w-2 h-2 rounded-full', config.dotColor)}
        animate={{ 
          scale: status === 'in_progress' ? [1, 1.2, 1] : 1,
          opacity: status === 'in_progress' ? [1, 0.7, 1] : 1
        }}
        transition={{ 
          duration: 1.5,
          repeat: status === 'in_progress' ? Infinity : 0,
          ease: 'easeInOut'
        }}
      />
    </motion.span>
  );
}

// Specialized status badges for different contexts
export function AppointmentStatusBadge({ 
  status, 
  size = 'md', 
  className 
}: { 
  status: AppointmentStatus; 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <StatusBadge 
      status={status} 
      type="appointment" 
      size={size} 
      className={className}
    />
  );
}

export function PaymentStatusBadge({ 
  status, 
  size = 'md', 
  className 
}: { 
  status: PaymentStatus; 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <StatusBadge 
      status={status} 
      type="payment" 
      size={size} 
      className={className}
    />
  );
}