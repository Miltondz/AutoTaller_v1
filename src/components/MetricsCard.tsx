import React from 'react'
import { cn } from '../lib/utils'
import { LucideProps } from 'lucide-react'
import { AutomotiveCard } from './AutomotiveForm'

// Basic Metrics Card
interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ComponentType<LucideProps>
  trend?: {
    value: number
    label: string
    direction: 'up' | 'down' | 'neutral'
  }
  className?: string
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning'
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'border-l-automotive-medium-gray',
    primary: 'border-l-automotive-metallic-blue bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
    accent: 'border-l-automotive-safety-orange bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900',
    success: 'border-l-success bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900',
    warning: 'border-l-warning bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900'
  }

  const getTrendIcon = () => {
    if (!trend) return null
    
    if (trend.direction === 'up') {
      return (
        <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      )
    } else if (trend.direction === 'down') {
      return (
        <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
        </svg>
      )
    } else {
      return (
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      )
    }
  }

  return (
    <AutomotiveCard className={cn('metric-card border-l-4', variantClasses[variant], className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="metric-label">{title}</h3>
          <div className="mt-2">
            <p className="metric-value">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {trend && (
            <div className="mt-3 flex items-center gap-2">
              {getTrendIcon()}
              <span className={cn(
                'text-sm font-medium',
                trend.direction === 'up' ? 'text-success' : 
                trend.direction === 'down' ? 'text-destructive' : 'text-muted-foreground'
              )}>
                {trend.direction !== 'neutral' && (trend.direction === 'up' ? '+' : '')}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn(
            'p-3 rounded-lg shadow-tool',
            variant === 'primary' ? 'bg-automotive-metallic-blue text-white' :
            variant === 'accent' ? 'bg-automotive-safety-orange text-white' :
            variant === 'success' ? 'bg-success text-white' :
            variant === 'warning' ? 'bg-warning text-automotive-charcoal' :
            'bg-muted text-muted-foreground'
          )}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </AutomotiveCard>
  )
}

// Specialized metrics cards for different contexts
interface SimpleMetricsCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<LucideProps>
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
  className?: string
}

export const SimpleMetricsCard: React.FC<SimpleMetricsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'gray',
  className
}) => {
  const colorVariants = {
    blue: 'primary',
    green: 'success',
    yellow: 'warning',
    red: 'default',
    gray: 'default'
  } as const

  return (
    <MetricsCard
      title={title}
      value={value}
      icon={Icon}
      variant={colorVariants[color]}
      className={className}
    />
  )
}

// Revenue/Financial Metrics Card
interface RevenueMetricsCardProps {
  title: string
  amount: number
  currency?: string
  period?: string
  trend?: {
    value: number
    direction: 'up' | 'down' | 'neutral'
    label: string
  }
  className?: string
}

export const RevenueMetricsCard: React.FC<RevenueMetricsCardProps> = ({
  title,
  amount,
  currency = '$',
  period,
  trend,
  className
}) => {
  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${currency}${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `${currency}${(amount / 1000).toFixed(1)}K`
    } else {
      return `${currency}${amount.toFixed(0)}`
    }
  }

  return (
    <MetricsCard
      title={title}
      value={formatAmount(amount)}
      subtitle={period}
      trend={trend}
      variant="success"
      className={className}
      icon={({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )}
    />
  )
}

// Service Status Overview Card
interface ServiceStatusCardProps {
  scheduled: number
  inProgress: number
  completed: number
  cancelled: number
  className?: string
}

export const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({
  scheduled,
  inProgress,
  completed,
  cancelled,
  className
}) => {
  const total = scheduled + inProgress + completed + cancelled

  return (
    <AutomotiveCard className={cn('p-4', className)}>
      <h3 className="metric-label mb-4">Resumen de Estado de Servicios</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-scheduled"></div>
            <span className="text-sm">Programados</span>
          </div>
          <span className="font-medium">{scheduled}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-in-progress"></div>
            <span className="text-sm">En Progreso</span>
          </div>
          <span className="font-medium">{inProgress}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-completed"></div>
            <span className="text-sm">Completados</span>
          </div>
          <span className="font-medium">{completed}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-cancelled"></div>
            <span className="text-sm">Cancelados</span>
          </div>
          <span className="font-medium">{cancelled}</span>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            <span>{total}</span>
          </div>
        </div>
      </div>
    </AutomotiveCard>
  )
}

// Loading state for metrics cards
export const MetricsCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('metric-card border-l-4 border-l-muted', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-muted rounded animate-pulse mb-3"></div>
          <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
          <div className="h-3 bg-muted/50 rounded animate-pulse w-2/3"></div>
        </div>
        <div className="w-12 h-12 bg-muted rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}