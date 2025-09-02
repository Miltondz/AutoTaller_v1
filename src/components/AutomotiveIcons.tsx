import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface IconProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

// Custom automotive SVG icons
export function WrenchIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { rotate: [0, 15, -15, 0] } : {}}
      transition={animate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </motion.svg>
  );
}

export function GearIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { rotate: 360 } : {}}
      transition={animate ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
    >
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6"/>
      <path d="m15.14 7.14-4.28 4.28m0 0L6.58 15.7"/>
      <path d="m20.485 7.515-4.242 4.242m0 0-4.243 4.243"/>
      <path d="m7.515 3.515 4.242 4.242m0 0 4.243 4.243"/>
      <path d="m3.515 16.485 4.242-4.242m0 0 4.243-4.243"/>
    </motion.svg>
  );
}

export function CarIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { x: [0, 5, 0] } : {}}
      transition={animate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 9.6a2 2 0 0 0-1.6-1.4L15 7.8V6.3c0-.7-.6-1.3-1.3-1.3H10.3C9.6 5 9 5.6 9 6.3v1.5l-1.8.4c-.7.1-1.3.7-1.6 1.4L3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </motion.svg>
  );
}

export function OilDropIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { y: [0, -3, 0] } : {}}
      transition={animate ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </motion.svg>
  );
}

export function BrakeIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { scale: [1, 1.1, 1] } : {}}
      transition={animate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </motion.svg>
  );
}

export function EngineIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { rotate: [0, 5, -5, 0] } : {}}
      transition={animate ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <rect x="6" y="8" width="12" height="8" rx="2"/>
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <path d="M10 16v2"/>
      <path d="M14 16v2"/>
      <path d="M6 12h2"/>
      <path d="M16 12h2"/>
    </motion.svg>
  );
}

export function TireIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { rotate: 360 } : {}}
      transition={animate ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
    >
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <path d="M12 2v4"/>
      <path d="M12 18v4"/>
      <path d="M2 12h4"/>
      <path d="M18 12h4"/>
      <path d="M4.93 4.93l2.83 2.83"/>
      <path d="M16.24 16.24l2.83 2.83"/>
      <path d="M4.93 19.07l2.83-2.83"/>
      <path d="M16.24 7.76l2.83-2.83"/>
    </motion.svg>
  );
}

export function BatteryIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { opacity: [1, 0.5, 1] } : {}}
      transition={animate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
      <path d="M23 13v-2"/>
      <path d="M5 10v4"/>
      <path d="M9 10v4"/>
      <path d="M13 10v4"/>
    </motion.svg>
  );
}

export function OilChangeIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { y: [0, -2, 0] } : {}}
      transition={animate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <path d="M12 2v6"/>
      <path d="M12 18v4"/>
      <circle cx="12" cy="12" r="4"/>
      <path d="m8 12-2-2"/>
      <path d="m16 12 2-2"/>
      <path d="M12 8V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/>
      <path d="M12 16v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2"/>
    </motion.svg>
  );
}

export function TransmissionIcon({ className, size = 24, animate = false }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-current', className)}
      animate={animate ? { rotate: [0, 90, 180, 270, 360] } : {}}
      transition={animate ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
    >
      <circle cx="8" cy="8" r="3"/>
      <circle cx="16" cy="16" r="3"/>
      <path d="M11 8h2"/>
      <path d="M11 16h2"/>
      <path d="M8 11v2"/>
      <path d="M16 11v2"/>
      <path d="M8 5V3"/>
      <path d="M16 21v-2"/>
      <path d="M5 8H3"/>
      <path d="M21 16h-2"/>
    </motion.svg>
  );
}

// Service category icons mapping
export const ServiceIcons = {
  maintenance: OilChangeIcon,
  repair: WrenchIcon,
  diagnostics: EngineIcon,
  inspection: BrakeIcon,
  electrical: BatteryIcon,
  tires: TireIcon,
  engine: EngineIcon,
  brakes: BrakeIcon,
  transmission: TransmissionIcon,
  cooling: OilDropIcon,
} as const;

// Animated icon wrapper for hover effects
export function AnimatedServiceIcon({ 
  type, 
  className, 
  size = 24 
}: { 
  type: keyof typeof ServiceIcons; 
  className?: string; 
  size?: number;
}) {
  const Icon = ServiceIcons[type];
  
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Icon className={className} size={size} />
    </motion.div>
  );
}