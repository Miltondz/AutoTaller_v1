import { useState, useEffect } from 'react'
import type { AutomotiveTestimonial } from '../types/automotive'
import { 
  mockAutomotiveTestimonials,
  getFeaturedTestimonials,
  getTestimonialsByRating,
  getTestimonialsByService,
  getAverageRating
} from '../data/mockAutomotiveTestimonials'

// Simulate API delay
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

export function useMockAutomotiveTestimonials() {
  const [testimonials, setTestimonials] = useState<AutomotiveTestimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true)
        setError(null)
        await simulateDelay()
        setTestimonials(mockAutomotiveTestimonials)
      } catch (err) {
        setError('Failed to load testimonials')
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  const refreshTestimonials = async () => {
    try {
      setLoading(true)
      setError(null)
      await simulateDelay()
      setTestimonials(mockAutomotiveTestimonials)
    } catch (err) {
      setError('Failed to refresh testimonials')
    } finally {
      setLoading(false)
    }
  }

  const createTestimonial = async (testimonialData: {
    author_name: string
    content: string
    rating: number
    vehicle_info: string
    service_type: string
  }): Promise<AutomotiveTestimonial> => {
    try {
      await simulateDelay()
      
      const newTestimonial: AutomotiveTestimonial = {
        id: `test-${Date.now()}`,
        author_name: testimonialData.author_name,
        content: testimonialData.content,
        rating: testimonialData.rating,
        vehicle_info: testimonialData.vehicle_info,
        service_type: testimonialData.service_type,
        date_created: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setTestimonials(prev => [newTestimonial, ...prev])
      return newTestimonial
    } catch (err) {
      throw new Error('Failed to create testimonial')
    }
  }

  const updateTestimonial = async (id: string, updates: {
    author_name?: string
    content?: string
    rating?: number
    vehicle_info?: string
    service_type?: string
  }): Promise<AutomotiveTestimonial> => {
    try {
      await simulateDelay()
      
      const testimonialIndex = testimonials.findIndex(t => t.id === id)
      if (testimonialIndex === -1) {
        throw new Error('Testimonial not found')
      }

      const updatedTestimonial: AutomotiveTestimonial = {
        ...testimonials[testimonialIndex],
        ...updates,
        updated_at: new Date().toISOString()
      }

      setTestimonials(prev => prev.map(t => t.id === id ? updatedTestimonial : t))
      return updatedTestimonial
    } catch (err) {
      throw new Error('Failed to update testimonial')
    }
  }

  const deleteTestimonial = async (id: string): Promise<void> => {
    try {
      await simulateDelay()
      setTestimonials(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      throw new Error('Failed to delete testimonial')
    }
  }

  return {
    testimonials,
    loading,
    error,
    refreshTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    // Helper functions
    getFeaturedTestimonials: () => getFeaturedTestimonials(),
    getTestimonialsByRating: (minRating: number) => getTestimonialsByRating(minRating),
    getTestimonialsByService: (serviceType: string) => getTestimonialsByService(serviceType),
    getAverageRating: () => getAverageRating()
  }
}

// Hook for featured testimonials
export function useMockFeaturedTestimonials() {
  const { testimonials, loading, error } = useMockAutomotiveTestimonials()
  
  const featuredTestimonials = testimonials
    .filter(testimonial => testimonial.rating >= 4)
    .slice(0, 6)

  return {
    testimonials: featuredTestimonials,
    loading,
    error,
    averageRating: getAverageRating()
  }
}

// Hook for testimonial statistics
export function useMockTestimonialStats() {
  const { testimonials, loading, error } = useMockAutomotiveTestimonials()

  const stats = {
    totalCount: testimonials.length,
    averageRating: getAverageRating(),
    ratingDistribution: {
      5: testimonials.filter(t => t.rating === 5).length,
      4: testimonials.filter(t => t.rating === 4).length,
      3: testimonials.filter(t => t.rating === 3).length,
      2: testimonials.filter(t => t.rating === 2).length,
      1: testimonials.filter(t => t.rating === 1).length
    },
    recentCount: testimonials.filter(t => {
      const testimonialDate = new Date(t.date_created)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return testimonialDate >= thirtyDaysAgo
    }).length
  }

  return {
    stats,
    loading,
    error
  }
}