/**
 * Service Tracking Code System
 * Generates unique tracking codes and provides lookup functionality
 * Format: MC-YYYY-XXXXXX (MC = Mechanic Code, YYYY = Year, XXXXXX = Unique ID)
 */

interface TrackingCodeData {
  code: string;
  appointmentId: string;
  customerId: string;
  serviceType: string;
  vehicleInfo: string;
  createdAt: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  estimatedCompletion?: string;
  actualCompletion?: string;
}

class ServiceTrackingSystem {
  private static instance: ServiceTrackingSystem;
  private trackingCodes: Map<string, TrackingCodeData> = new Map();
  private usedCodes: Set<string> = new Set();

  private constructor() {
    // Load existing codes from localStorage in real implementation
    this.loadExistingCodes();
  }

  public static getInstance(): ServiceTrackingSystem {
    if (!ServiceTrackingSystem.instance) {
      ServiceTrackingSystem.instance = new ServiceTrackingSystem();
    }
    return ServiceTrackingSystem.instance;
  }

  /**
   * Generate a unique tracking code
   * Format: MC-YYYY-XXXXXX
   */
  public generateTrackingCode(): string {
    const currentYear = new Date().getFullYear();
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      // Generate 6-digit unique identifier
      const uniqueId = this.generateUniqueId();
      const trackingCode = `MC-${currentYear}-${uniqueId}`;

      // Check if code is already used
      if (!this.usedCodes.has(trackingCode)) {
        this.usedCodes.add(trackingCode);
        return trackingCode;
      }

      attempts++;
    }

    // Fallback with timestamp if all attempts failed
    const timestamp = Date.now().toString().slice(-6);
    const fallbackCode = `MC-${currentYear}-${timestamp}`;
    this.usedCodes.add(fallbackCode);
    return fallbackCode;
  }

  /**
   * Generate 6-digit unique identifier
   */
  private generateUniqueId(): string {
    // Combine random numbers and letters for better uniqueness
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  /**
   * Validate tracking code format
   */
  public validateTrackingCode(code: string): boolean {
    const trackingCodeRegex = /^MC-\d{4}-[A-Z0-9]{6}$/;
    return trackingCodeRegex.test(code);
  }

  /**
   * Register a new tracking code with appointment data
   */
  public registerTrackingCode(data: Omit<TrackingCodeData, 'code' | 'createdAt'>): string {
    const trackingCode = this.generateTrackingCode();
    
    const trackingData: TrackingCodeData = {
      ...data,
      code: trackingCode,
      createdAt: new Date().toISOString(),
    };

    this.trackingCodes.set(trackingCode, trackingData);
    this.saveToStorage();
    
    return trackingCode;
  }

  /**
   * Lookup tracking code information
   */
  public lookupTrackingCode(code: string): TrackingCodeData | null {
    if (!this.validateTrackingCode(code)) {
      return null;
    }

    return this.trackingCodes.get(code) || null;
  }

  /**
   * Update tracking code status
   */
  public updateTrackingStatus(
    code: string, 
    status: TrackingCodeData['status'],
    estimatedCompletion?: string,
    actualCompletion?: string
  ): boolean {
    const trackingData = this.trackingCodes.get(code);
    
    if (!trackingData) {
      return false;
    }

    trackingData.status = status;
    
    if (estimatedCompletion) {
      trackingData.estimatedCompletion = estimatedCompletion;
    }
    
    if (actualCompletion) {
      trackingData.actualCompletion = actualCompletion;
    }

    this.trackingCodes.set(code, trackingData);
    this.saveToStorage();
    
    return true;
  }

  /**
   * Get all tracking codes for a customer
   */
  public getCustomerTrackingCodes(customerId: string): TrackingCodeData[] {
    return Array.from(this.trackingCodes.values())
      .filter(data => data.customerId === customerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Get tracking codes by status
   */
  public getTrackingCodesByStatus(status: TrackingCodeData['status']): TrackingCodeData[] {
    return Array.from(this.trackingCodes.values())
      .filter(data => data.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Search tracking codes
   */
  public searchTrackingCodes(query: string): TrackingCodeData[] {
    const searchTerm = query.toLowerCase();
    
    return Array.from(this.trackingCodes.values())
      .filter(data => 
        data.code.toLowerCase().includes(searchTerm) ||
        data.serviceType.toLowerCase().includes(searchTerm) ||
        data.vehicleInfo.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Get tracking statistics
   */
  public getTrackingStatistics(): {
    total: number;
    scheduled: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    thisMonth: number;
    thisWeek: number;
  } {
    const codes = Array.from(this.trackingCodes.values());
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    return {
      total: codes.length,
      scheduled: codes.filter(c => c.status === 'scheduled').length,
      inProgress: codes.filter(c => c.status === 'in_progress').length,
      completed: codes.filter(c => c.status === 'completed').length,
      cancelled: codes.filter(c => c.status === 'cancelled').length,
      thisMonth: codes.filter(c => new Date(c.createdAt) >= startOfMonth).length,
      thisWeek: codes.filter(c => new Date(c.createdAt) >= startOfWeek).length,
    };
  }

  /**
   * Load existing codes from storage
   */
  private loadExistingCodes(): void {
    try {
      const stored = localStorage.getItem('service_tracking_codes');
      if (stored) {
        const data = JSON.parse(stored);
        this.trackingCodes = new Map(data.codes || []);
        this.usedCodes = new Set(data.usedCodes || []);
      }
    } catch (error) {
      console.error('Error loading tracking codes:', error);
    }
  }

  /**
   * Save codes to storage
   */
  private saveToStorage(): void {
    try {
      const data = {
        codes: Array.from(this.trackingCodes.entries()),
        usedCodes: Array.from(this.usedCodes),
      };
      localStorage.setItem('service_tracking_codes', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving tracking codes:', error);
    }
  }

  /**
   * Clear all tracking codes (for testing/reset)
   */
  public clearAllCodes(): void {
    this.trackingCodes.clear();
    this.usedCodes.clear();
    localStorage.removeItem('service_tracking_codes');
  }

  /**
   * Export tracking codes for backup
   */
  public exportTrackingCodes(): string {
    const data = {
      codes: Array.from(this.trackingCodes.entries()),
      usedCodes: Array.from(this.usedCodes),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * Import tracking codes from backup
   */
  public importTrackingCodes(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      this.trackingCodes = new Map(data.codes || []);
      this.usedCodes = new Set(data.usedCodes || []);
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('Error importing tracking codes:', error);
      return false;
    }
  }
}

// Export singleton instance
export const trackingSystem = ServiceTrackingSystem.getInstance();

// Export types
export type { TrackingCodeData };

// Utility functions
export const formatTrackingCode = (code: string): string => {
  return code.replace(/(.{2})(.{4})(.{6})/, '$1-$2-$3');
};

export const getStatusColor = (status: TrackingCodeData['status']): string => {
  switch (status) {
    case 'scheduled':
      return 'bg-secondary-100 text-secondary-800';
    case 'in_progress':
      return 'bg-warning-100 text-warning-800';
    case 'completed':
      return 'bg-success-100 text-success-800';
    case 'cancelled':
      return 'bg-danger-100 text-danger-800';
    default:
      return 'bg-primary-100 text-primary-800';
  }
};

export const getStatusLabel = (status: TrackingCodeData['status']): string => {
  switch (status) {
    case 'scheduled':
      return 'Programado';
    case 'in_progress':
      return 'En Progreso';
    case 'completed':
      return 'Completado';
    case 'cancelled':
      return 'Cancelado';
    default:
      return 'Desconocido';
  }
};

// Mock data generator for testing
export const generateMockTrackingCodes = (count: number = 10): void => {
  const services = [
    'Cambio de Aceite',
    'Revisión de Frenos',
    'Diagnóstico General',
    'Alineación y Balanceo',
    'Cambio de Filtros',
    'Revisión de Suspensión',
    'Mantenimiento Preventivo',
    'Reparación de Motor',
  ];

  const vehicles = [
    'Toyota Corolla 2018',
    'Honda Civic 2020',
    'Ford Focus 2019',
    'Chevrolet Cruze 2017',
    'Nissan Sentra 2021',
    'Hyundai Elantra 2019',
    'Volkswagen Jetta 2020',
    'Mazda 3 2018',
  ];

  const statuses: TrackingCodeData['status'][] = ['scheduled', 'in_progress', 'completed', 'cancelled'];

  for (let i = 0; i < count; i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));

    trackingSystem.registerTrackingCode({
      appointmentId: `apt_${Date.now()}_${i}`,
      customerId: `customer_${Math.floor(Math.random() * 100)}`,
      serviceType: service,
      vehicleInfo: vehicle,
      status,
      estimatedCompletion: status !== 'completed' ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      actualCompletion: status === 'completed' ? createdDate.toISOString() : undefined,
    });
  }
};