import React from 'react'
import { cn } from '../lib/utils'
import { LucideProps } from 'lucide-react'

// Industrial Page Header
interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ComponentType<LucideProps>
  actions?: React.ReactNode
  breadcrumbs?: { label: string; href?: string }[]
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  actions,
  breadcrumbs,
  className
}) => {
  return (
    <div className={cn('border-b border-border bg-card/50 backdrop-blur-sm', className)}>
      <div className="container mx-auto px-4 py-6">
        {breadcrumbs && (
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-foreground transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="p-3 rounded-lg bg-automotive-metallic-blue text-white shadow-tool">
                <Icon className="w-6 h-6" />
              </div>
            )}
            <div>
              <h1 className="heading-automotive text-3xl">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Industrial Section Container
interface SectionProps {
  title?: string
  subtitle?: string
  icon?: React.ComponentType<LucideProps>
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'bordered' | 'elevated'
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  icon: Icon,
  actions,
  children,
  className,
  variant = 'default'
}) => {
  const variantClasses = {
    default: '',
    bordered: 'border border-border rounded-lg',
    elevated: 'card-automotive'
  }

  return (
    <section className={cn(variantClasses[variant], className)}>
      {(title || actions) && (
        <div className={cn(
          'flex items-center justify-between',
          variant === 'default' ? 'mb-6' : 'p-6 pb-0'
        )}>
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-md bg-muted">
                <Icon className="w-5 h-5 text-automotive-metallic-blue" />
              </div>
            )}
            <div>
              {title && (
                <h2 className="heading-automotive text-xl">{title}</h2>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className={cn(variant !== 'default' && 'p-6 pt-4')}>
        {children}
      </div>
    </section>
  )
}

// Industrial Grid Layout
interface GridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  gap = 'md',
  className
}) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12'
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  }

  return (
    <div className={cn('grid', colsClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  )
}

// Industrial Stats Grid
interface StatsGridProps {
  stats: Array<{
    label: string
    value: string | number
    icon?: React.ComponentType<LucideProps>
    trend?: {
      value: number
      direction: 'up' | 'down' | 'neutral'
      label: string
    }
  }>
  className?: string
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, className }) => {
  return (
    <Grid cols={stats.length <= 2 ? 2 : stats.length <= 4 ? 4 : 6} className={className}>
      {stats.map((stat, index) => (
        <div key={index} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">{stat.label}</p>
              <p className="metric-value">{stat.value}</p>
              {stat.trend && (
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend.direction === 'up' ? (
                    <svg className="w-3 h-3 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  ) : stat.trend.direction === 'down' ? (
                    <svg className="w-3 h-3 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  )}
                  <span className={cn(
                    'text-xs font-medium',
                    stat.trend.direction === 'up' ? 'text-success' : 
                    stat.trend.direction === 'down' ? 'text-destructive' : 'text-muted-foreground'
                  )}>
                    {stat.trend.direction !== 'neutral' && (stat.trend.direction === 'up' ? '+' : '')}{stat.trend.value}%
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.trend.label}</span>
                </div>
              )}
            </div>
            {stat.icon && (
              <div className="p-2 rounded-md bg-automotive-metallic-blue text-white">
                <stat.icon className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      ))}
    </Grid>
  )
}

// Industrial Empty State
interface EmptyStateProps {
  icon?: React.ComponentType<LucideProps>
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn('text-center py-12', className)}>
      {Icon && (
        <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-muted">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="heading-automotive text-lg mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            'btn-tool',
            action.variant === 'primary' && 'btn-primary-automotive'
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

// Industrial Loading State
interface LoadingStateProps {
  message?: string
  className?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <div className="loading-gear mb-4">
        <svg className="w-8 h-8 animate-spin text-automotive-safety-orange" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M12 1v6m0 6v6" stroke="currentColor" strokeWidth="2" />
          <path d="m15.5 3.5-3 3 3 3" stroke="currentColor" strokeWidth="2" />
          <path d="m8.5 20.5 3-3-3-3" stroke="currentColor" strokeWidth="2" />
          <path d="M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" />
          <path d="m3.5 8.5 3 3-3 3" stroke="currentColor" strokeWidth="2" />
          <path d="m20.5 15.5-3-3 3-3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  )
}

// Industrial Container
interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn('mx-auto px-4', sizeClasses[size], className)}>
      {children}
    </div>
  )
}