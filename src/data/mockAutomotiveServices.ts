import type { AutomotiveService } from '../types/automotive'

export const mockAutomotiveServices: AutomotiveService[] = [
  {
    id: 'srv-001',
    name: 'Cambio de Aceite',
    description: 'Cambio completo de aceite y filtro con inspección multipunto. Incluye la revisión de niveles de líquidos, correas, mangueras y estado de la batería.',
    price: 35000,
    estimated_time: 30,
    include_parts: true,
    category: 'maintenance',
    image_urls: [
      '/images/services/oil-change-1.jpg',
      '/images/services/oil-change-2.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-002',
    name: 'Inspección de Frenos',
    description: 'Inspección completa del sistema de frenos, incluyendo pastillas, discos, pinzas y líquido de frenos. Se entrega un informe detallado.',
    price: 55000,
    estimated_time: 45,
    include_parts: false,
    category: 'diagnostics',
    image_urls: [
      '/images/services/brake-inspection-1.jpg',
      '/images/services/brake-inspection-2.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-003',
    name: 'Reemplazo de Pastillas de Freno',
    description: 'Servicio profesional de reemplazo de pastillas de freno. Se instalan pastillas de alta calidad con los procedimientos adecuados de asentamiento.',
    price: 130000,
    estimated_time: 90,
    include_parts: true,
    category: 'repair',
    image_urls: [
      '/images/services/brake-replacement-1.jpg',
      '/images/services/brake-replacement-2.jpg',
      '/images/services/brake-replacement-3.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-004',
    name: 'Diagnóstico de Motor',
    description: 'Diagnóstico computarizado avanzado para identificar problemas en el motor. Incluye escaneo OBD-II y un informe de diagnóstico detallado.',
    price: 90000,
    estimated_time: 60,
    include_parts: false,
    category: 'diagnostics',
    image_urls: [
      '/images/services/engine-diagnostics-1.jpg',
      '/images/services/engine-diagnostics-2.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-005',
    name: 'Servicio de Transmisión',
    description: 'Cambio completo de líquido de transmisión y reemplazo de filtro. Incluye inspección de la transmisión y prueba de rendimiento.',
    price: 160000,
    estimated_time: 120,
    include_parts: true,
    category: 'maintenance',
    image_urls: [
      '/images/services/transmission-service-1.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-006',
    name: 'Servicio de Aire Acondicionado',
    description: 'Inspección del sistema de A/C, recarga de refrigerante y pruebas de rendimiento. Incluye detección de fugas y revisión de componentes.',
    price: 110000,
    estimated_time: 75,
    include_parts: false,
    category: 'repair',
    image_urls: [
      '/images/services/ac-service-1.jpg',
      '/images/services/ac-service-2.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-007',
    name: 'Rotación y Balanceo de Neumáticos',
    description: 'Servicio profesional de rotación de neumáticos y balanceo de ruedas. Extiende la vida útil de los neumáticos y mejora la maniobrabilidad del vehículo.',
    price: 50000,
    estimated_time: 45,
    include_parts: false,
    category: 'maintenance',
    image_urls: [
      '/images/services/tire-rotation-1.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-008',
    name: 'Prueba y Reemplazo de Batería',
    description: 'Servicio completo de prueba y reemplazo de batería. Incluye revisión del alternador y del sistema de carga.',
    price: 130000,
    estimated_time: 30,
    include_parts: true,
    category: 'repair',
    image_urls: [
      '/images/services/battery-service-1.jpg',
      '/images/services/battery-service-2.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-009',
    name: 'Inspección de Seguridad Anual',
    description: 'Inspección completa de seguridad del vehículo requerida por las regulaciones estatales. Incluye pruebas de emisiones donde sea aplicable.',
    price: 25000,
    estimated_time: 30,
    include_parts: false,
    category: 'inspection',
    image_urls: [
      '/images/services/safety-inspection-1.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'srv-010',
    name: 'Lavado del Sistema de Refrigeración',
    description: 'Lavado completo del sistema de refrigeración y recarga con refrigerante nuevo. Incluye inspección del termostato y de la tapa del radiador.',
    price: 95000,
    estimated_time: 60,
    include_parts: true,
    category: 'maintenance',
    image_urls: [
      '/images/services/coolant-flush-1.jpg',
      '/images/services/coolant-flush-2.jpg'
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
]

// Helper function to get services by category
export const getServicesByCategory = (category: AutomotiveService['category']): AutomotiveService[] => {
  return mockAutomotiveServices.filter(service => service.category === category && service.is_active)
}

// Helper function to get featured services
export const getFeaturedServices = (): AutomotiveService[] => {
  return mockAutomotiveServices.slice(0, 6) // Return first 6 services as featured
}

// Helper function to get service by ID
export const getServiceById = (id: string): AutomotiveService | undefined => {
  return mockAutomotiveServices.find(service => service.id === id)
}
