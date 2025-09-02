import type { AutomotiveAppointment, VehicleDetails } from '../types/automotive'

// Helper function to generate tracking codes
const generateTrackingCode = (index: number): string => {
  const year = new Date().getFullYear()
  const paddedIndex = (index + 1).toString().padStart(6, '0')
  return `MC-${year}-${paddedIndex}`
}

// Helper function to generate dates
const getDateString = (daysFromNow: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

const getTimeString = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00:00`
}

export const mockAutomotiveAppointments: AutomotiveAppointment[] = [
  {
    id: 'apt-001',
    service_tracking_code: generateTrackingCode(0),
    customer_name: 'John Smith',
    customer_email: 'john.smith@email.com',
    customer_phone: '(555) 123-4567',
    service_id: 'srv-001',
    vehicle_details: {
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      license_plate: 'ABC-123',
      mileage: 45000
    },
    appointment_date: getDateString(1),
    appointment_time: getTimeString(9),
    status: 'scheduled',
    estimated_completion: null,
    actual_completion: null,
    work_notes: 'Customer requested synthetic oil',
    additional_parts_cost: 0,
    total_cost: 45.00,
    created_at: '2024-03-10T08:30:00Z',
    updated_at: '2024-03-10T08:30:00Z'
  },
  {
    id: 'apt-002',
    service_tracking_code: generateTrackingCode(1),
    customer_name: 'Sarah Johnson',
    customer_email: 'sarah.johnson@email.com',
    customer_phone: '(555) 234-5678',
    service_id: 'srv-003',
    vehicle_details: {
      make: 'Ford',
      model: 'F-150',
      year: 2019,
      license_plate: 'XYZ-789',
      mileage: 62000
    },
    appointment_date: getDateString(0),
    appointment_time: getTimeString(10),
    status: 'in_progress',
    estimated_completion: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    actual_completion: null,
    work_notes: 'Front brake pads worn, rear pads at 40%. Rotors in good condition.',
    additional_parts_cost: 0,
    total_cost: 180.00,
    created_at: '2024-03-08T14:20:00Z',
    updated_at: '2024-03-12T09:15:00Z'
  },
  {
    id: 'apt-003',
    service_tracking_code: generateTrackingCode(2),
    customer_name: 'Michael Rodriguez',
    customer_email: 'michael.rodriguez@email.com',
    customer_phone: '(555) 345-6789',
    service_id: 'srv-004',
    vehicle_details: {
      make: 'Toyota',
      model: 'Camry',
      year: 2018,
      license_plate: 'DEF-456',
      mileage: 78000
    },
    appointment_date: getDateString(-2),
    appointment_time: getTimeString(14),
    status: 'completed',
    estimated_completion: null,
    actual_completion: '2024-03-10T15:30:00Z',
    work_notes: 'Diagnosed P0171 code - lean fuel mixture. Replaced air filter and cleaned MAF sensor.',
    additional_parts_cost: 35.00,
    total_cost: 155.00,
    created_at: '2024-03-05T11:45:00Z',
    updated_at: '2024-03-10T15:30:00Z'
  },
  {
    id: 'apt-004',
    service_tracking_code: generateTrackingCode(3),
    customer_name: 'Emily Davis',
    customer_email: 'emily.davis@email.com',
    customer_phone: '(555) 456-7890',
    service_id: 'srv-006',
    vehicle_details: {
      make: 'Nissan',
      model: 'Altima',
      year: 2021,
      license_plate: 'GHI-789',
      mileage: 28000
    },
    appointment_date: getDateString(3),
    appointment_time: getTimeString(11),
    status: 'scheduled',
    estimated_completion: null,
    actual_completion: null,
    work_notes: 'A/C not cooling properly. Customer reports warm air from vents.',
    additional_parts_cost: 0,
    total_cost: 150.00,
    created_at: '2024-03-11T16:20:00Z',
    updated_at: '2024-03-11T16:20:00Z'
  },
  {
    id: 'apt-005',
    service_tracking_code: generateTrackingCode(4),
    customer_name: 'David Wilson',
    customer_email: 'david.wilson@email.com',
    customer_phone: '(555) 567-8901',
    service_id: 'srv-002',
    vehicle_details: {
      make: 'Chevrolet',
      model: 'Silverado',
      year: 2017,
      license_plate: 'JKL-012',
      mileage: 95000
    },
    appointment_date: getDateString(-1),
    appointment_time: getTimeString(13),
    status: 'completed',
    estimated_completion: null,
    actual_completion: '2024-03-11T14:15:00Z',
    work_notes: 'Brake inspection complete. Front pads at 30%, rear pads at 50%. Recommended replacement in 3-6 months.',
    additional_parts_cost: 0,
    total_cost: 75.00,
    created_at: '2024-03-09T10:30:00Z',
    updated_at: '2024-03-11T14:15:00Z'
  },
  {
    id: 'apt-006',
    service_tracking_code: generateTrackingCode(5),
    customer_name: 'Lisa Thompson',
    customer_email: 'lisa.thompson@email.com',
    customer_phone: '(555) 678-9012',
    service_id: 'srv-008',
    vehicle_details: {
      make: 'Hyundai',
      model: 'Elantra',
      year: 2019,
      license_plate: 'MNO-345',
      mileage: 52000
    },
    appointment_date: getDateString(2),
    appointment_time: getTimeString(15),
    status: 'scheduled',
    estimated_completion: null,
    actual_completion: null,
    work_notes: 'Car won\'t start. Customer suspects battery issue.',
    additional_parts_cost: 0,
    total_cost: 180.00,
    created_at: '2024-03-12T09:45:00Z',
    updated_at: '2024-03-12T09:45:00Z'
  },
  {
    id: 'apt-007',
    service_tracking_code: generateTrackingCode(6),
    customer_name: 'Robert Brown',
    customer_email: 'robert.brown@email.com',
    customer_phone: '(555) 789-0123',
    service_id: 'srv-005',
    vehicle_details: {
      make: 'BMW',
      model: '328i',
      year: 2016,
      license_plate: 'PQR-678',
      mileage: 87000
    },
    appointment_date: getDateString(-3),
    appointment_time: getTimeString(10),
    status: 'completed',
    estimated_completion: null,
    actual_completion: '2024-03-09T12:30:00Z',
    work_notes: 'Transmission service completed. Fluid was dark, filter replaced. Transmission shifts smoothly now.',
    additional_parts_cost: 0,
    total_cost: 220.00,
    created_at: '2024-03-06T13:15:00Z',
    updated_at: '2024-03-09T12:30:00Z'
  },
  {
    id: 'apt-008',
    service_tracking_code: generateTrackingCode(7),
    customer_name: 'Jennifer Martinez',
    customer_email: 'jennifer.martinez@email.com',
    customer_phone: '(555) 890-1234',
    service_id: 'srv-009',
    vehicle_details: {
      make: 'Subaru',
      model: 'Outback',
      year: 2020,
      license_plate: 'STU-901',
      mileage: 35000
    },
    appointment_date: getDateString(5),
    appointment_time: getTimeString(9),
    status: 'scheduled',
    estimated_completion: null,
    actual_completion: null,
    work_notes: 'Annual inspection due. Customer needs inspection sticker.',
    additional_parts_cost: 0,
    total_cost: 35.00,
    created_at: '2024-03-12T14:30:00Z',
    updated_at: '2024-03-12T14:30:00Z'
  }
]

// Helper functions for filtering appointments
export const getAppointmentsByStatus = (status: AutomotiveAppointment['status']): AutomotiveAppointment[] => {
  return mockAutomotiveAppointments.filter(appointment => appointment.status === status)
}

export const getAppointmentsByDateRange = (startDate: string, endDate: string): AutomotiveAppointment[] => {
  return mockAutomotiveAppointments.filter(appointment => 
    appointment.appointment_date >= startDate && appointment.appointment_date <= endDate
  )
}

export const getAppointmentByTrackingCode = (trackingCode: string): AutomotiveAppointment | undefined => {
  return mockAutomotiveAppointments.find(appointment => appointment.service_tracking_code === trackingCode)
}

export const getTodaysAppointments = (): AutomotiveAppointment[] => {
  const today = new Date().toISOString().split('T')[0]
  return mockAutomotiveAppointments.filter(appointment => appointment.appointment_date === today)
}

export const getUpcomingAppointments = (): AutomotiveAppointment[] => {
  const today = new Date().toISOString().split('T')[0]
  return mockAutomotiveAppointments.filter(appointment => 
    appointment.appointment_date >= today && appointment.status === 'scheduled'
  )
}