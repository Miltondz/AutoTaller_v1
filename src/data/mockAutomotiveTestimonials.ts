import type { AutomotiveTestimonial } from '../types/automotive'

export const mockAutomotiveTestimonials: AutomotiveTestimonial[] = [
  {
    id: 'test-001',
    author_name: 'Carlos Rodriguez',
    content: 'Excellent service! My Honda Civic runs like new after the oil change and brake inspection. The team was professional and explained everything clearly. Highly recommend for reliable automotive service.',
    rating: 5,
    vehicle_info: '2020 Honda Civic',
    service_type: 'Oil Change & Brake Inspection',
    date_created: '2024-03-05T00:00:00Z',
    created_at: '2024-03-05T10:30:00Z',
    updated_at: '2024-03-05T10:30:00Z'
  },
  {
    id: 'test-002',
    author_name: 'Maria Gonzalez',
    content: 'Fast and honest service. They diagnosed my engine problem quickly and fixed it at a fair price. No unnecessary upselling, just quality work. My Toyota Camry is running perfectly now.',
    rating: 5,
    vehicle_info: '2018 Toyota Camry',
    service_type: 'Engine Diagnostics',
    date_created: '2024-02-28T00:00:00Z',
    created_at: '2024-02-28T14:15:00Z',
    updated_at: '2024-02-28T14:15:00Z'
  },
  {
    id: 'test-003',
    author_name: 'James Wilson',
    content: 'Great experience with brake pad replacement on my F-150. The work was done efficiently and the price was competitive. They even showed me the old parts and explained the wear patterns.',
    rating: 4,
    vehicle_info: '2019 Ford F-150',
    service_type: 'Brake Pad Replacement',
    date_created: '2024-02-22T00:00:00Z',
    created_at: '2024-02-22T16:45:00Z',
    updated_at: '2024-02-22T16:45:00Z'
  },
  {
    id: 'test-004',
    author_name: 'Susan Davis',
    content: 'Professional and trustworthy. My air conditioning wasn\'t working properly, and they fixed it quickly. The shop is clean, the staff is knowledgeable, and they stand behind their work.',
    rating: 5,
    vehicle_info: '2021 Nissan Altima',
    service_type: 'Air Conditioning Repair',
    date_created: '2024-02-18T00:00:00Z',
    created_at: '2024-02-18T11:20:00Z',
    updated_at: '2024-02-18T11:20:00Z'
  },
  {
    id: 'test-005',
    author_name: 'Michael Thompson',
    content: 'Saved me a lot of money! Other shops wanted to replace my entire transmission, but these guys properly diagnosed the issue and just needed a fluid change. Honest mechanics are hard to find.',
    rating: 5,
    vehicle_info: '2016 BMW 328i',
    service_type: 'Transmission Service',
    date_created: '2024-02-15T00:00:00Z',
    created_at: '2024-02-15T13:30:00Z',
    updated_at: '2024-02-15T13:30:00Z'
  },
  {
    id: 'test-006',
    author_name: 'Lisa Martinez',
    content: 'Excellent customer service and quality work. They kept me informed throughout the battery replacement process and completed the job faster than expected. Very satisfied with the service.',
    rating: 4,
    vehicle_info: '2019 Hyundai Elantra',
    service_type: 'Battery Replacement',
    date_created: '2024-02-10T00:00:00Z',
    created_at: '2024-02-10T09:45:00Z',
    updated_at: '2024-02-10T09:45:00Z'
  },
  {
    id: 'test-007',
    author_name: 'Robert Johnson',
    content: 'Fair pricing and quality service. The annual inspection was thorough and they identified a few minor issues before they became major problems. Appreciate their attention to detail.',
    rating: 4,
    vehicle_info: '2017 Chevrolet Silverado',
    service_type: 'Annual Safety Inspection',
    date_created: '2024-02-08T00:00:00Z',
    created_at: '2024-02-08T15:10:00Z',
    updated_at: '2024-02-08T15:10:00Z'
  },
  {
    id: 'test-008',
    author_name: 'Amanda Brown',
    content: 'Great experience from start to finish. The coolant flush service was completed professionally and they explained the importance of regular maintenance. Will definitely return for future services.',
    rating: 5,
    vehicle_info: '2020 Subaru Outback',
    service_type: 'Coolant System Flush',
    date_created: '2024-02-05T00:00:00Z',
    created_at: '2024-02-05T12:25:00Z',
    updated_at: '2024-02-05T12:25:00Z'
  },
  {
    id: 'test-009',
    author_name: 'Daniel Garcia',
    content: 'Reliable and efficient service. The tire rotation and balancing made a noticeable difference in how my car drives. The team is knowledgeable and takes pride in their work.',
    rating: 4,
    vehicle_info: '2018 Mazda CX-5',
    service_type: 'Tire Rotation & Balance',
    date_created: '2024-02-01T00:00:00Z',
    created_at: '2024-02-01T14:50:00Z',
    updated_at: '2024-02-01T14:50:00Z'
  },
  {
    id: 'test-010',
    author_name: 'Patricia Lee',
    content: 'Outstanding service and communication. They provided a detailed estimate before starting work and completed everything as promised. My Accord has never run better. Highly recommended!',
    rating: 5,
    vehicle_info: '2019 Honda Accord',
    service_type: 'Comprehensive Maintenance',
    date_created: '2024-01-28T00:00:00Z',
    created_at: '2024-01-28T16:15:00Z',
    updated_at: '2024-01-28T16:15:00Z'
  }
]

// Helper functions for testimonials
export const getFeaturedTestimonials = (): AutomotiveTestimonial[] => {
  return mockAutomotiveTestimonials
    .filter(testimonial => testimonial.rating >= 4)
    .slice(0, 6)
}

export const getTestimonialsByRating = (minRating: number): AutomotiveTestimonial[] => {
  return mockAutomotiveTestimonials.filter(testimonial => testimonial.rating >= minRating)
}

export const getTestimonialsByService = (serviceType: string): AutomotiveTestimonial[] => {
  return mockAutomotiveTestimonials.filter(testimonial => 
    testimonial.service_type.toLowerCase().includes(serviceType.toLowerCase())
  )
}

export const getAverageRating = (): number => {
  const totalRating = mockAutomotiveTestimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0)
  return Math.round((totalRating / mockAutomotiveTestimonials.length) * 10) / 10
}