import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { 
  Clock, 
  Wrench, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Calendar,
  Settings,
  Zap
} from 'lucide-react';

type AppointmentStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
type PaymentStatus = 'pending' | 'completed' | 'failed';
type ServiceStatus = 'active' | 'inactive' | 'maintenance';

interface StatusIndicatorProps {
  status: AppointmentStatus | PaymentStatus | ServiceStatus;
  type: 'appointment' | 'payment' | 'service';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showLabel?: boolean;
  animate?: boolean;
  className?: string;
}

const statusConfig = {
  appointment: {
    scheduled: {
      label: 'Programada',
      icon: Calendar,
      color: 'bg-secondary-100 text-secondary-800 border-secondary-200',
      dotColor: 'bg-secondary-500'
    },
    in_progress: {
      label: 'En Progreso',
      icon: Wrench,
      color: 'bg-warning-100 text-warning-800 border-warning-200',
      dotColor: 'bg-warning-500'
    },
    completed: {
      label: 'Completada',
      icon: CheckCircle,
      color: 'bg-success-100 text-success-800 border-success-200',
      dotColor: 'bg-success-500'
    },
    cancelled: {
      label: 'Cancelada',
      icon: XCircle,
      color: 'bg-danger-100 text-danger-800 border-danger-200',
      dotColor: 'bg-danger-500'
    },
    unknown: {
      label: 'Desconocido',
      icon: AlertTriangle,
      color: 'bg-primary-100 text-primary-800 border-primary-200',
      dotColor: 'bg-primary-500'
    }
  },
  payment: {
    pending: {
      label: 'Pendiente',
      icon: Clock,
      color: 'bg-warning-100 text-warning-800 border-warning-200',
      dotColor: 'bg-warning-500'
    },
    completed: {
      label: 'Pagado',
      icon: CheckCircle,
      color: 'bg-success-100 text-success-800 border-success-200',
      dotColor: 'bg-success-500'
    },
    failed: {
      label: 'Fallido',
      icon: AlertTriangle,
      color: 'bg-danger-100 text-danger-800 border-danger-200',
      dotColor: 'bg-danger-500'
    },
    unknown: {
      label: 'Desconocido',
      icon: AlertTriangle,
      color: 'bg-primary-100 text-primary-800 border-primary-200',
      dotColor: 'bg-primary-500'
    }
  },
  service: {
    active: {
      label: 'Activo',
      icon: Zap,
      color: 'bg-success-100 text-success-800 border-success-200',
      dotColor: 'bg-success-500'
    },
    inactive: {
      label: 'Inactivo',
      icon: XCircle,
      color: 'bg-primary-100 text-primary-800 border-primary-200',
      dotColor: 'bg-primary-500'
    },
    maintenance: {
      label: 'Mantenimiento',
      icon: Settings,
      color: 'bg-warning-100 text-warning-800 border-warning-200',
      dotColor: 'bg-warning-500'
    },
    unknown: {
      label: 'Desconocido',
      icon: AlertTriangle,
      color: 'bg-primary-100 text-primary-800 border-primary-200',
      dotColor: 'bg-primary-500'
    }
  }
} as const;

const sizeConfig = {
  sm: {
    container: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3',
    dot: 'w-2 h-2'
  },
  md: {
    container: 'px-3 py-1 text-sm',
    icon: 'w-4 h-4',
    dot: 'w-2.5 h-2.5'
  },
  lg: {
    container: 'px-4 py-2 text-base',
    icon: 'w-5 h-5',
    dot: 'w-3 h-3'
  }
};

export function StatusIndicator({
  status,
  type,
  size = 'md',
  showIcon = true,
  showLabel = true,
  animate = true,
  className
}: StatusIndicatorProps) {
  const config = statusConfig[type][status as keyof typeof statusConfig[typeof type]] || statusConfig[type]['unknown' as keyof typeof statusConfig[typeof type]];
  const sizeStyles = sizeConfig[size];
  
  if (!config) {
    console.warn(`Invalid status "${status}" for type "${type}"`);
    return null;
  }

  const Icon = config.icon;

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-medium border',
        config.color,
        sizeStyles.container,
        className
      )}
    >
      {showIcon && (
        <motion.div
          animate={animate && status === 'in_progress' ? { rotate: 360 } : {}}
          transition={animate && status === 'in_progress' ? { 
            duration: 2, 
            repeat: Infinity, 
            ease: 'linear' 
          } : {}}
        >
          <Icon className={sizeStyles.icon} />
        </motion.div>
      )}
      {showLabel && <span>{config.label}</span>}
      {!showIcon && !showLabel && (
        <motion.div
          animate={animate && status === 'in_progress' ? { scale: [1, 1.2, 1] } : {}}
          transition={animate && status === 'in_progress' ? { 
            duration: 1.5, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          } : {}}
          className={cn('rounded-full', config.dotColor, sizeStyles.dot)}
        />
      )}
    </motion.div>
  );
}

// Specialized status indicators for different contexts
export function AppointmentStatusIndicator({ 
  status, 
  size = 'md', 
  className 
}: { 
  status: AppointmentStatus; 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <StatusIndicator
      status={status}
      type="appointment"
      size={size}
      className={className}
    />
  );
}

export function PaymentStatusIndicator({ 
  status, 
  size = 'md', 
  className 
}: { 
  status: PaymentStatus; 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <StatusIndicator
      status={status}
      type="payment"
      size={size}
      className={className}
    />
  );
}

export function ServiceStatusIndicator({ 
  status, 
  size = 'md', 
  className 
}: { 
  status: ServiceStatus; 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <StatusIndicator
      status={status}
      type="service"
      size={size}
      className={className}
    />
  );
}

// Status badge with custom styling
interface StatusBadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ children, variant, size = 'md', className }: StatusBadgeProps) {
  const variants = {
    success: 'bg-success-100 text-success-800 border-success-200',
    warning: 'bg-warning-100 text-warning-800 border-warning-200',
    danger: 'bg-danger-100 text-danger-800 border-danger-200',
    info: 'bg-secondary-100 text-secondary-800 border-secondary-200',
    neutral: 'bg-primary-100 text-primary-800 border-primary-200'
  };

  const sizeStyles = sizeConfig[size];

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium border',
      variants[variant],
      sizeStyles.container,
      className
    )}>
      {children}
    </span>
  );
}