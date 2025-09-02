import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';

interface ToolPanelProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'default' | 'dark' | 'accent';
  className?: string;
}

export function ToolPanel({ 
  title, 
  children, 
  icon: Icon, 
  variant = 'default',
  className 
}: ToolPanelProps) {
  const variants = {
    default: 'bg-primary-700 text-white',
    dark: 'bg-primary-900 text-white',
    accent: 'bg-accent-600 text-white'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-lg p-6 shadow-tool',
        variants[variant],
        className
      )}
      style={{
        background: variant === 'default' 
          ? 'linear-gradient(145deg, #475569, #334155)'
          : variant === 'dark'
          ? 'linear-gradient(145deg, #0f172a, #1e293b)'
          : 'linear-gradient(145deg, #ea580c, #c2410c)'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="p-2 bg-white/10 rounded-lg"
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

// Quick action button for tool panels
interface ToolActionProps {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export function ToolAction({ 
  label, 
  onClick, 
  icon: Icon, 
  variant = 'primary',
  disabled = false,
  className 
}: ToolActionProps) {
  const variants = {
    primary: 'bg-white/20 hover:bg-white/30 text-white',
    secondary: 'bg-white/10 hover:bg-white/20 text-white/80',
    danger: 'bg-danger-600/80 hover:bg-danger-600 text-white'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
        variants[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </motion.button>
  );
}

// Tool panel with collapsible sections
interface CollapsibleToolPanelProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  defaultExpanded?: boolean;
  variant?: 'default' | 'dark' | 'accent';
  className?: string;
}

export function CollapsibleToolPanel({
  title,
  children,
  icon: Icon,
  defaultExpanded = true,
  variant = 'default',
  className
}: CollapsibleToolPanelProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <ToolPanel title={title} icon={Icon} variant={variant} className={className}>
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2 rounded hover:bg-white/10 transition-colors"
      >
        <span className="font-medium">Opciones</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ↓
        </motion.div>
      </motion.button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-2">
          {children}
        </div>
      </motion.div>
    </ToolPanel>
  );
}

import React from 'react';