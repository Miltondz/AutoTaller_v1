// Icon mapping system to replace music-related icons with automotive ones
import {
  // Navigation and UI icons
  Home,
  Calendar,
  Settings,
  User,
  Users,
  Mail,
  Phone,
  MapPin,
  Clock,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  
  // Status and feedback icons
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Bell,
  BellOff,
  
  // Business and finance icons
  DollarSign,
  CreditCard,
  Receipt,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  
  // Communication icons
  MessageSquare,
  MessageCircle,
  Send,
  
  // File and document icons
  FileText,
  Download,
  Upload,
  Image,
  
  // Automotive-specific icons (using Lucide icons that work for automotive)
  Car,
  Truck,
  Zap, // For electrical/battery
  Gauge, // For diagnostics
  Wrench,
  Settings as Gear,
  
} from 'lucide-react';

// Import our custom automotive icons
import {
  WrenchIcon,
  GearIcon,
  CarIcon,
  BrakeIcon,
  EngineIcon,
  TireIcon,
  BatteryIcon,
  OilChangeIcon,
  TransmissionIcon
} from './AutomotiveIcons';

// Navigation icons mapping (replacing music-themed navigation)
export const NavigationIcons = {
  home: Home,
  services: WrenchIcon, // Instead of music note
  appointments: Calendar,
  customers: Users,
  payments: DollarSign,
  reports: BarChart3,
  settings: Settings,
  gallery: Image, // For before/after photos
  blog: FileText, // For automotive articles
  contact: Mail,
  about: Info,
  dashboard: Gauge, // Automotive dashboard theme
  track: Search, // For service tracking
} as const;

// Service category icons (replacing instrument icons)
export const ServiceCategoryIcons = {
  maintenance: OilChangeIcon, // Instead of piano
  repair: WrenchIcon, // Instead of guitar
  diagnostics: EngineIcon, // Instead of violin
  inspection: BrakeIcon, // Instead of theory
  electrical: BatteryIcon,
  tires: TireIcon,
  engine: EngineIcon,
  brakes: BrakeIcon,
  transmission: TransmissionIcon,
  cooling: OilChangeIcon, // Reuse for coolant
} as const;

// Status icons for automotive context
export const StatusIcons = {
  scheduled: Calendar,
  in_progress: Wrench,
  completed: CheckCircle,
  cancelled: XCircle,
  pending: Clock,
  paid: CheckCircle,
  failed: AlertTriangle,
  active: Zap,
  inactive: XCircle,
  maintenance: Settings,
} as const;

// Action icons for automotive operations
export const ActionIcons = {
  book: Calendar, // Book appointment
  track: Search, // Track service
  diagnose: Gauge, // Run diagnostics
  repair: WrenchIcon, // Perform repair
  inspect: Eye, // Inspect vehicle
  quote: Receipt, // Generate quote
  invoice: FileText, // Create invoice
  schedule: Clock, // Schedule service
  complete: CheckCircle, // Mark complete
  cancel: XCircle, // Cancel appointment
} as const;

// Vehicle type icons
export const VehicleIcons = {
  car: CarIcon,
  truck: Truck,
  suv: Car, // Use car icon for SUV
  motorcycle: Car, // Use car icon as fallback
  van: Truck, // Use truck icon for van
  default: CarIcon,
} as const;

// Dashboard metric icons (replacing music performance metrics)
export const MetricIcons = {
  appointments: Calendar,
  revenue: DollarSign,
  customers: Users,
  services: WrenchIcon,
  completion_rate: TrendingUp,
  satisfaction: CheckCircle,
  pending: Clock,
  in_progress: Wrench,
  completed: CheckCircle,
  monthly_revenue: BarChart3,
  average_time: Clock,
  parts_cost: GearIcon,
  labor_cost: WrenchIcon,
} as const;

// Communication icons (replacing music collaboration icons)
export const CommunicationIcons = {
  message: MessageSquare,
  chat: MessageCircle,
  email: Mail,
  phone: Phone,
  notification: Bell,
  alert: AlertCircle,
  send: Send,
} as const;

// File and media icons (replacing music files)
export const MediaIcons = {
  photo: Image,
  before_after: Image,
  invoice: FileText,
  report: FileText,
  quote: Receipt,
  document: FileText,
  download: Download,
  upload: Upload,
} as const;

// Helper function to get icon by category and type
export function getServiceIcon(category: keyof typeof ServiceCategoryIcons) {
  return ServiceCategoryIcons[category] || WrenchIcon;
}

export function getStatusIcon(status: keyof typeof StatusIcons) {
  return StatusIcons[status] || Clock;
}

export function getNavigationIcon(page: keyof typeof NavigationIcons) {
  return NavigationIcons[page] || Home;
}

export function getVehicleIcon(type: keyof typeof VehicleIcons) {
  return VehicleIcons[type] || VehicleIcons.default;
}

// Icon size variants for consistent sizing
export const IconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
} as const;

// Icon wrapper component for consistent styling
interface IconWrapperProps {
  icon: React.ComponentType<any>;
  size?: keyof typeof IconSizes;
  className?: string;
  animate?: boolean;
}

export function IconWrapper({ 
  icon: Icon, 
  size = 'md', 
  className = '', 
  animate = false 
}: IconWrapperProps) {
  return (
    <Icon 
      className={`${IconSizes[size]} ${className}`}
      animate={animate}
    />
  );
}

// Animated icon wrapper for hover effects
export function AnimatedIcon({ 
  icon: Icon, 
  size = 'md', 
  className = '',
  hoverEffect = 'scale'
}: IconWrapperProps & { hoverEffect?: 'scale' | 'rotate' | 'bounce' }) {
  const hoverEffects = {
    scale: { scale: 1.1 },
    rotate: { rotate: 15 },
    bounce: { y: -2 }
  };

  return (
    <motion.div
      whileHover={hoverEffects[hoverEffect]}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Icon className={`${IconSizes[size]} ${className}`} />
    </motion.div>
  );
}

import { motion } from 'framer-motion';