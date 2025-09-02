import { useState, useEffect } from 'react'
import type { AutomotiveAppointment, CreateAutomotiveAppointmentData } from '../types/automotive'
import { 
  mockAutomotiveAppointments,
  getAppointmentsByStatus,
  getAppointmentsByDateRange,
  getAppointmentByTrackingCode,
  getTodaysAppointments,
  getUpcomingAppointments
} from '../data/mockAutomotiveAppointments'

// Simulate API delay
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Generate unique tracking code
const generateTrackingCode = (): string => {
  const year = new Date().getFullYear()
  const timestamp = Date.now().toString().slice(-6)
  return `MC-${year}-${timestamp}`
}

export function useMockAutomotiveAppointments() {
  const [appointments, setAppointments] = useState<AutomotiveAppointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true)
        setError(null)
        await simulateDelay()
        setAppointments(mockAutomotiveAppointments)
      } catch (err) {
        setError('Failed to load appointments')
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [])

  const refreshAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      await simulateDelay()
      setAppointments(mockAutomotiveAppointments)
    } catch (err) {
      setError('Failed to refresh appointments')
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData: CreateAutomotiveAppointmentData): Promise<AutomotiveAppointment> => {
    try {
      await simulateDelay()
      
      const newAppointment: AutomotiveAppointment = {
        id: `apt-${Date.now()}`,
        service_tracking_code: generateTrackingCode(),
        customer_name: appointmentData.customer_name,
        customer_email: appointmentData.customer_email,
        customer_phone: appointmentData.customer_phone || null,
        service_id: appointmentData.service_id,
        vehicle_details: appointmentData.vehicle_details,
        appointment_date: appointmentData.appointment_date,
        appointment_time: appointmentData.appointment_time,
        status: 'scheduled',
        estimated_completion: null,
        actual_completion: null,
        work_notes: appointmentData.notes || null,
        additional_parts_cost: 0,
        total_cost: 0, // Will be calculated based on service
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setAppointments(prev => [...prev, newAppointment])
      return newAppointment
    } catch (err) {
      throw new Error('Failed to create appointment')
    }
  }

  const updateAppointmentStatus = async (
    id: string, 
    status: AutomotiveAppointment['status'],
    workNotes?: string,
    additionalPartsCost?: number
  ): Promise<AutomotiveAppointment> => {
    try {
      await simulateDelay()
      
      const appointmentIndex = appointments.findIndex(a => a.id === id)
      if (appointmentIndex === -1) {
        throw new Error('Appointment not found')
      }

      const updatedAppointment: AutomotiveAppointment = {
        ...appointments[appointmentIndex],
        status,
        work_notes: workNotes || appointments[appointmentIndex].work_notes,
        additional_parts_cost: additionalPartsCost || appointments[appointmentIndex].additional_parts_cost,
        actual_completion: status === 'completed' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      }

      setAppointments(prev => prev.map(a => a.id === id ? updatedAppointment : a))
      return updatedAppointment
    } catch (err) {
      throw new Error('Failed to update appointment status')
    }
  }

  const deleteAppointment = async (id: string): Promise<void> => {
    try {
      await simulateDelay()
      setAppointments(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      throw new Error('Failed to delete appointment')
    }
  }

  const getAvailableSlots = async (date: string): Promise<string[]> => {
    try {
      await simulateDelay()
      
      // Get booked times for the date
      const bookedTimes = appointments
        .filter(apt => apt.appointment_date === date && apt.status !== 'cancelled')
        .map(apt => apt.appointment_time)

      // Generate available slots (9 AM to 6 PM, hourly)
      const availableSlots: string[] = []
      for (let hour = 9; hour <= 18; hour++) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:00:00`
        if (!bookedTimes.includes(timeSlot)) {
          availableSlots.push(timeSlot)
        }
      }

      return availableSlots
    } catch (err) {
      throw new Error('Failed to get available slots')
    }
  }

  return {
    appointments,
    loading,
    error,
    refreshAppointments,
    createAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    getAvailableSlots,
    // Helper functions
    getAppointmentsByStatus: (status: AutomotiveAppointment['status']) => 
      appointments.filter(apt => apt.status === status),
    getAppointmentsByDateRange: (startDate: string, endDate: string) =>
      appointments.filter(apt => apt.appointment_date >= startDate && apt.appointment_date <= endDate),
    getAppointmentByTrackingCode: (trackingCode: string) =>
      appointments.find(apt => apt.service_tracking_code === trackingCode),
    getTodaysAppointments: () => {
      const today = new Date().toISOString().split('T')[0]
      return appointments.filter(apt => apt.appointment_date === today)
    },
    getUpcomingAppointments: () => {
      const today = new Date().toISOString().split('T')[0]
      return appointments.filter(apt => 
        apt.appointment_date >= today && apt.status === 'scheduled'
      )
    }
  }
}

// Hook for service tracking by customers
export function useMockServiceTracking(trackingCode: string) {
  const { appointments, loading, error } = useMockAutomotiveAppointments()
  
  const appointment = appointments.find(apt => apt.service_tracking_code === trackingCode)

  return {
    appointment,
    loading,
    error,
    found: !!appointment
  }
}

// Hook for today's appointments
export function useMockTodaysAppointments() {
  const { appointments, loading, error } = useMockAutomotiveAppointments()
  
  const today = new Date().toISOString().split('T')[0]
  const todaysAppointments = appointments.filter(apt => apt.appointment_date === today)

  return {
    appointments: todaysAppointments,
    loading,
    error
  }
}