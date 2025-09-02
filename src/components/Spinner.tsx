import React from 'react'
import { Loader2, Settings, Wrench } from 'lucide-react'
import { cn } from '../lib/utils'
import { motion } from 'framer-motion'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gear' | 'wrench'
  className?: string
}

export function Spinner({ size = 'md', variant = 'default', className }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  if (variant === 'gear') {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className={cn('text-accent-600', sizes[size], className)}
      >
        <Settings className="w-full h-full" />
      </motion.div>
    )
  }

  if (variant === 'wrench') {
    return (
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        className={cn('text-accent-600', sizes[size], className)}
      >
        <Wrench className="w-full h-full" />
      </motion.div>
    )
  }

  return (
    <Loader2 
      className={cn('animate-spin text-accent-600', sizes[size], className)} 
    />
  )
}

// Industrial loading component with multiple gears
export function IndustrialLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="text-accent-600"
      >
        <Settings className="w-8 h-8" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="text-secondary-600"
      >
        <Settings className="w-6 h-6" />
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        className="text-accent-600"
      >
        <Settings className="w-4 h-4" />
      </motion.div>
    </div>
  )
}