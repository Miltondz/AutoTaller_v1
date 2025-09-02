// Enhanced types for automotive mechanic shop system

export interface AutomotiveService {
  id: string
  name: string
  description: string | null
  price: number
  estimated_time: number // in minutes
  include_parts: boolean
  category: 'maintenance' | 'repair' | 'diagnostics' | 'inspection'
  image_urls: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface VehicleDetails {
  make: string
  model: string
  year: number
  license_plate: string
  mileage: number
}

export interface AutomotiveAppointment {
  id: string
  service_tracking_code: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  service_id: string | null
  vehicle_details: VehicleDetails
  appointment_date: string
  appointment_time: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  estimated_completion: string | null
  actual_completion: string | null
  work_notes: string | null
  additional_parts_cost: number
  total_cost: number
  created_at: string
  updated_at: string
}

export interface AutomotivePayment {
  id: string
  appointment_id: string | null
  service_cost: number
  parts_cost: number
  total_amount: number
  payment_method: 'cash' | 'card' | 'check' | 'transfer' | null
  payment_status: 'pending' | 'completed' | 'failed'
  payment_date: string | null
  payment_details: string | null // service, parts, or both
  notes: string | null
  created_at: string
  updated_at: string
}

export interface AutomotiveTestimonial {
  id: string
  author_name: string
  content: string
  rating: number
  vehicle_info: string // e.g., "2020 Honda Civic"
  service_type: string // e.g., "Oil Change"
  date_created: string
  created_at: string
  updated_at: string
}

export interface AutomotiveBlogPost {
  id: string
  title: string
  slug: string | null
  content: string
  excerpt: string | null
  published_date: string
  author: string | null
  image_url: string | null
  category: 'maintenance' | 'repair' | 'tips' | 'seasonal'
  tags: string[]
  created_at: string
  updated_at: string
}

export interface ServiceImage {
  id: string
  service_id: string
  image_url: string
  alt_text: string
  display_order: number
  is_primary: boolean
  created_at: string
}

export interface CustomerMessage {
  id: string
  appointment_id: string | null
  service_tracking_code: string | null
  customer_name: string
  customer_email: string | null
  message: string
  message_type: 'inquiry' | 'complaint' | 'update' | 'general'
  is_read: boolean
  admin_response: string | null
  created_at: string
  updated_at: string
}

// Create types for form data
export interface CreateAutomotiveServiceData {
  name: string
  description?: string
  price: number
  estimated_time: number
  include_parts: boolean
  category: 'maintenance' | 'repair' | 'diagnostics' | 'inspection'
  image_urls?: string[]
}

export interface CreateAutomotiveAppointmentData {
  customer_name: string
  customer_email: string
  customer_phone?: string
  service_id: string
  vehicle_details: VehicleDetails
  appointment_date: string
  appointment_time: string
  notes?: string
}

export interface CreateAutomotivePaymentData {
  appointment_id?: string
  service_cost: number
  parts_cost?: number
  payment_method?: 'cash' | 'card' | 'check' | 'transfer'
  payment_details?: string
  notes?: string
}

export interface CreateCustomerMessageData {
  appointment_id?: string
  service_tracking_code?: string
  customer_name: string
  customer_email?: string
  message: string
  message_type?: 'inquiry' | 'complaint' | 'update' | 'general'
}

// Service tracking interface for customers
export interface ServiceTrackingInfo {
  appointment: AutomotiveAppointment
  service: AutomotiveService
  timeline: ServiceTimelineEvent[]
  messages: CustomerMessage[]
}

export interface ServiceTimelineEvent {
  id: string
  appointment_id: string
  event_type: 'scheduled' | 'started' | 'parts_ordered' | 'completed' | 'cancelled'
  description: string
  timestamp: string
  created_by: string
}

// Dashboard analytics types
export interface ShopMetrics {
  pending_appointments: number
  in_progress_services: number
  completed_this_week: number
  monthly_revenue: number
  average_completion_time: number
  customer_satisfaction: number
}

export interface ServiceStats {
  service_id: string
  service_name: string
  total_completed: number
  average_time: number
  total_revenue: number
  customer_rating: number
}

export interface ServiceTracking {
  tracking_code: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    license_plate: string;
  };
  service_type: string;
  description: string;
  current_status: string;
  estimated_completion: string;
  status_history: Array<{
    timestamp: string;
    status: string;
    notes?: string;
  }>;
}