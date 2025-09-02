import { useState, useEffect } from 'react'
import type { ShopMetrics, ServiceStats } from '../types/automotive'
import { useMockAutomotiveAppointments } from './useMockAutomotiveAppointments'
import { useMockAutomotivePayments } from './useMockAutomotivePayments'
import { useMockAutomotiveServices } from './useMockAutomotiveServices'
import { useMockAutomotiveTestimonials } from './useMockAutomotiveTestimonials'

// Simulate API delay
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

export function useMockShopMetrics() {
  const [metrics, setMetrics] = useState<ShopMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { appointments } = useMockAutomotiveAppointments()
  const { payments } = useMockAutomotivePayments()
  const { testimonials } = useMockAutomotiveTestimonials()

  useEffect(() => {
    const calculateMetrics = async () => {
      try {
        setLoading(true)
        setError(null)
        await simulateDelay()

        // Calculate current week dates
        const now = new Date()
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay())
        startOfWeek.setHours(0, 0, 0, 0)
        
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)

        // Calculate current month dates
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

        // Pending appointments
        const pendingAppointments = appointments.filter(apt => apt.status === 'scheduled').length

        // In progress services
        const inProgressServices = appointments.filter(apt => apt.status === 'in_progress').length

        // Completed this week
        const completedThisWeek = appointments.filter(apt => {
          if (apt.status !== 'completed' || !apt.actual_completion) return false
          const completionDate = new Date(apt.actual_completion)
          return completionDate >= startOfWeek && completionDate <= endOfWeek
        }).length

        // Monthly revenue
        const monthlyRevenue = payments
          .filter(payment => {
            if (payment.paymentStatus !== 'paid' || !payment.paymentDate) return false
            const paymentDate = new Date(payment.paymentDate)
            return paymentDate >= startOfMonth && paymentDate <= endOfMonth
          })
          .reduce((total, payment) => total + payment.totalAmount, 0)

        // Average completion time (in hours)
        const completedAppointments = appointments.filter(apt => 
          apt.status === 'completed' && apt.actual_completion
        )
        
        let averageCompletionTime = 0
        if (completedAppointments.length > 0) {
          const totalTime = completedAppointments.reduce((total, apt) => {
            const start = new Date(`${apt.appointment_date}T${apt.appointment_time}`)
            const end = new Date(apt.actual_completion!)
            return total + (end.getTime() - start.getTime())
          }, 0)
          averageCompletionTime = totalTime / completedAppointments.length / (1000 * 60 * 60) // Convert to hours
        }

        // Customer satisfaction (average rating)
        const customerSatisfaction = testimonials.length > 0
          ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
          : 0

        const calculatedMetrics: ShopMetrics = {
          pending_appointments: pendingAppointments,
          in_progress_services: inProgressServices,
          completed_this_week: completedThisWeek,
          monthly_revenue: monthlyRevenue,
          average_completion_time: Math.round(averageCompletionTime * 10) / 10,
          customer_satisfaction: Math.round(customerSatisfaction * 10) / 10
        }

        setMetrics(calculatedMetrics)
      } catch (err) {
        setError('Failed to calculate shop metrics')
      } finally {
        setLoading(false)
      }
    }

    if (appointments.length > 0 || payments.length > 0) {
      calculateMetrics()
    }
  }, [appointments, payments, testimonials])

  return {
    metrics,
    loading,
    error
  }
}

export function useMockServiceStats() {
  const [serviceStats, setServiceStats] = useState<ServiceStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { appointments } = useMockAutomotiveAppointments()
  const { services } = useMockAutomotiveServices()
  const { payments } = useMockAutomotivePayments()
  const { testimonials } = useMockAutomotiveTestimonials()

  useEffect(() => {
    const calculateServiceStats = async () => {
      try {
        setLoading(true)
        setError(null)
        await simulateDelay()

        const stats: ServiceStats[] = services.map(service => {
          // Get completed appointments for this service
          const serviceAppointments = appointments.filter(apt => 
            apt.service_id === service.id && apt.status === 'completed'
          )

          // Calculate average completion time
          let averageTime = service.estimated_time
          if (serviceAppointments.length > 0) {
            const totalTime = serviceAppointments.reduce((total, apt) => {
              if (!apt.actual_completion) return total
              const start = new Date(`${apt.appointment_date}T${apt.appointment_time}`)
              const end = new Date(apt.actual_completion)
              return total + (end.getTime() - start.getTime())
            }, 0)
            averageTime = totalTime / serviceAppointments.length / (1000 * 60) // Convert to minutes
          }

          // Calculate total revenue
          const servicePayments = payments.filter(payment => 
            serviceAppointments.some(apt => apt.id === payment.appointmentId) &&
            payment.paymentStatus === 'paid'
          )
          const totalRevenue = servicePayments.reduce((total, payment) => total + payment.totalAmount, 0)

          // Calculate customer rating for this service
          const serviceTestimonials = testimonials.filter(testimonial =>
            testimonial.service_type.toLowerCase().includes(service.name.toLowerCase())
          )
          const customerRating = serviceTestimonials.length > 0
            ? serviceTestimonials.reduce((sum, t) => sum + t.rating, 0) / serviceTestimonials.length
            : 0

          return {
            service_id: service.id,
            service_name: service.name,
            total_completed: serviceAppointments.length,
            average_time: Math.round(averageTime),
            total_revenue: totalRevenue,
            customer_rating: Math.round(customerRating * 10) / 10
          }
        })

        setServiceStats(stats)
      } catch (err) {
        setError('Failed to calculate service statistics')
      } finally {
        setLoading(false)
      }
    }

    if (services.length > 0) {
      calculateServiceStats()
    }
  }, [appointments, services, payments, testimonials])

  return {
    serviceStats,
    loading,
    error
  }
}

// Hook for quick dashboard overview
export function useMockDashboardOverview() {
  const { metrics, loading: metricsLoading, error: metricsError } = useMockShopMetrics()
  const { appointments } = useMockAutomotiveAppointments()
  const { payments } = useMockAutomotivePayments()

  const [overview, setOverview] = useState({
    todaysAppointments: 0,
    urgentItems: 0,
    pendingPayments: 0,
    recentActivity: [] as string[]
  })

  useEffect(() => {
    if (appointments.length > 0 || payments.length > 0) {
      const today = new Date().toISOString().split('T')[0]
      
      const todaysAppointments = appointments.filter(apt => apt.appointment_date === today).length
      
      const urgentItems = appointments.filter(apt => {
        if (apt.status === 'in_progress') return true
        if (apt.status === 'scheduled' && apt.appointment_date <= today) return true
        return false
      }).length

      const pendingPayments = payments.filter(p => p.paymentStatus === 'pending').length

      const recentActivity = [
        ...appointments
          .filter(apt => apt.status === 'completed')
          .slice(0, 3)
          .map(apt => `Completed service for ${apt.customer_name}`),
        ...appointments
          .filter(apt => apt.status === 'scheduled')
          .slice(0, 2)
          .map(apt => `New appointment scheduled: ${apt.customer_name}`)
      ].slice(0, 5)

      setOverview({
        todaysAppointments,
        urgentItems,
        pendingPayments,
        recentActivity
      })
    }
  }, [appointments, payments])

  return {
    metrics,
    overview,
    loading: metricsLoading,
    error: metricsError
  }
}