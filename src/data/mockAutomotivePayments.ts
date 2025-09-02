import type { AutomotivePayment } from '../types/automotive'

export const mockAutomotivePayments: AutomotivePayment[] = [
  {
    id: 'pay-001',
    appointment_id: 'apt-003',
    service_cost: 120.00,
    parts_cost: 35.00,
    total_amount: 155.00,
    payment_method: 'card',
    payment_status: 'completed',
    payment_date: '2024-03-10T15:45:00Z',
    payment_details: 'service and parts',
    notes: 'Engine diagnostics with air filter replacement',
    created_at: '2024-03-10T15:30:00Z',
    updated_at: '2024-03-10T15:45:00Z'
  },
  {
    id: 'pay-002',
    appointment_id: 'apt-005',
    service_cost: 75.00,
    parts_cost: 0,
    total_amount: 75.00,
    payment_method: 'cash',
    payment_status: 'completed',
    payment_date: '2024-03-11T14:20:00Z',
    payment_details: 'service only',
    notes: 'Brake inspection - no parts needed',
    created_at: '2024-03-11T14:15:00Z',
    updated_at: '2024-03-11T14:20:00Z'
  },
  {
    id: 'pay-003',
    appointment_id: 'apt-007',
    service_cost: 220.00,
    parts_cost: 0,
    total_amount: 220.00,
    payment_method: 'card',
    payment_status: 'completed',
    payment_date: '2024-03-09T12:35:00Z',
    payment_details: 'service only',
    notes: 'Transmission service - parts included in service price',
    created_at: '2024-03-09T12:30:00Z',
    updated_at: '2024-03-09T12:35:00Z'
  },
  {
    id: 'pay-004',
    appointment_id: 'apt-002',
    service_cost: 180.00,
    parts_cost: 0,
    total_amount: 180.00,
    payment_method: null,
    payment_status: 'pending',
    payment_date: null,
    payment_details: 'service only',
    notes: 'Brake pad replacement - parts included in service price',
    created_at: '2024-03-12T09:15:00Z',
    updated_at: '2024-03-12T09:15:00Z'
  },
  {
    id: 'pay-005',
    appointment_id: 'apt-001',
    service_cost: 45.00,
    parts_cost: 0,
    total_amount: 45.00,
    payment_method: null,
    payment_status: 'pending',
    payment_date: null,
    payment_details: 'service only',
    notes: 'Oil change - parts included in service price',
    created_at: '2024-03-10T08:30:00Z',
    updated_at: '2024-03-10T08:30:00Z'
  },
  {
    id: 'pay-006',
    appointment_id: 'apt-004',
    service_cost: 150.00,
    parts_cost: 0,
    total_amount: 150.00,
    payment_method: null,
    payment_status: 'pending',
    payment_date: null,
    payment_details: 'service only',
    notes: 'A/C service - additional parts cost may apply',
    created_at: '2024-03-11T16:20:00Z',
    updated_at: '2024-03-11T16:20:00Z'
  },
  {
    id: 'pay-007',
    appointment_id: 'apt-006',
    service_cost: 180.00,
    parts_cost: 0,
    total_amount: 180.00,
    payment_method: null,
    payment_status: 'pending',
    payment_date: null,
    payment_details: 'service only',
    notes: 'Battery replacement - parts included in service price',
    created_at: '2024-03-12T09:45:00Z',
    updated_at: '2024-03-12T09:45:00Z'
  },
  {
    id: 'pay-008',
    appointment_id: 'apt-008',
    service_cost: 35.00,
    parts_cost: 0,
    total_amount: 35.00,
    payment_method: null,
    payment_status: 'pending',
    payment_date: null,
    payment_details: 'service only',
    notes: 'Annual safety inspection',
    created_at: '2024-03-12T14:30:00Z',
    updated_at: '2024-03-12T14:30:00Z'
  },
  // Additional historical payments for reporting
  {
    id: 'pay-009',
    appointment_id: null, // Historical payment not linked to current appointments
    service_cost: 95.00,
    parts_cost: 25.00,
    total_amount: 120.00,
    payment_method: 'card',
    payment_status: 'completed',
    payment_date: '2024-02-28T16:30:00Z',
    payment_details: 'service and parts',
    notes: 'Oil change with premium filter',
    created_at: '2024-02-28T16:15:00Z',
    updated_at: '2024-02-28T16:30:00Z'
  },
  {
    id: 'pay-010',
    appointment_id: null,
    service_cost: 280.00,
    parts_cost: 120.00,
    total_amount: 400.00,
    payment_method: 'check',
    payment_status: 'completed',
    payment_date: '2024-02-25T14:45:00Z',
    payment_details: 'service and parts',
    notes: 'Brake system overhaul - rotors and pads',
    created_at: '2024-02-25T14:30:00Z',
    updated_at: '2024-02-25T14:45:00Z'
  }
]

// Helper functions for payment management
export const getPaymentsByStatus = (status: AutomotivePayment['payment_status']): AutomotivePayment[] => {
  return mockAutomotivePayments.filter(payment => payment.payment_status === status)
}

export const getPaymentsByAppointment = (appointmentId: string): AutomotivePayment[] => {
  return mockAutomotivePayments.filter(payment => payment.appointment_id === appointmentId)
}

export const getPaymentsByDateRange = (startDate: string, endDate: string): AutomotivePayment[] => {
  return mockAutomotivePayments.filter(payment => {
    if (!payment.payment_date) return false
    const paymentDate = payment.payment_date.split('T')[0]
    return paymentDate >= startDate && paymentDate <= endDate
  })
}

export const getTotalRevenue = (): number => {
  return mockAutomotivePayments
    .filter(payment => payment.payment_status === 'completed')
    .reduce((total, payment) => total + payment.total_amount, 0)
}

export const getRevenueByMonth = (year: number, month: number): number => {
  const monthStr = month.toString().padStart(2, '0')
  const yearMonth = `${year}-${monthStr}`
  
  return mockAutomotivePayments
    .filter(payment => 
      payment.payment_status === 'completed' && 
      payment.payment_date?.startsWith(yearMonth)
    )
    .reduce((total, payment) => total + payment.total_amount, 0)
}

export const getServiceVsPartsRevenue = (): { serviceRevenue: number; partsRevenue: number } => {
  const completedPayments = mockAutomotivePayments.filter(payment => payment.payment_status === 'completed')
  
  const serviceRevenue = completedPayments.reduce((total, payment) => total + payment.service_cost, 0)
  const partsRevenue = completedPayments.reduce((total, payment) => total + payment.parts_cost, 0)
  
  return { serviceRevenue, partsRevenue }
}