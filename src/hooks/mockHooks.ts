// Mock hooks for automotive system development
// These hooks simulate the API behavior using mock data
// Replace with real API hooks when database is ready

export { 
  useMockAutomotiveServices
} from './useMockAutomotiveServices'

export { 
  useMockAutomotiveAppointments,
  useMockServiceTracking,
  useMockTodaysAppointments
} from './useMockAutomotiveAppointments'

export { 
  useMockAutomotivePayments
} from './useMockAutomotivePayments'

export { 
  useMockAutomotiveTestimonials,
  useMockFeaturedTestimonials,
  useMockTestimonialStats
} from './useMockAutomotiveTestimonials'

export { 
  useMockAutomotiveBlog,
  useMockFeaturedBlogPosts,
  useMockBlogPostsByCategory,
  useMockBlogPostBySlug,
  useMockBlogSearch
} from './useMockAutomotiveBlog'

export { 
  useMockShopMetrics,
  useMockServiceStats,
  useMockDashboardOverview
} from './useMockShopMetrics'

// Re-export types for convenience
export type {
  AutomotiveService,
  AutomotiveAppointment,
  AutomotivePayment,
  AutomotiveTestimonial,
  AutomotiveBlogPost,
  VehicleDetails,
  ShopMetrics,
  ServiceStats,
  CreateAutomotiveServiceData,
  CreateAutomotiveAppointmentData,
  CreateAutomotivePaymentData
} from '../types/automotive'