import { TrackingCodeGenerator } from '../utils/trackingCodeGenerator';

export interface TrackingCodeRecord {
  trackingCode: string;
  appointmentId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Mock tracking code database
const mockTrackingCodes: TrackingCodeRecord[] = [
  {
    trackingCode: 'MC-2024-001234',
    appointmentId: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    serviceName: 'Oil Change & Filter',
    status: 'completed',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:25:00Z'
  },
  {
    trackingCode: 'MC-2024-001235',
    appointmentId: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    serviceName: 'Brake Inspection & Repair',
    status: 'in_progress',
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-15T11:30:00Z'
  },
  {
    trackingCode: 'MC-2024-001233',
    appointmentId: '3',
    customerName: 'Mike Davis',
    customerEmail: 'mike.davis@email.com',
    serviceName: 'Engine Diagnostic',
    status: 'completed',
    createdAt: '2024-01-11T09:15:00Z',
    updatedAt: '2024-01-14T16:00:00Z'
  }
];

export class TrackingCodeService {
  /**
   * Generate a new tracking code for an appointment
   */
  static async generateTrackingCode(appointmentData: {
    appointmentId: string;
    customerName: string;
    customerEmail: string;
    serviceName: string;
  }): Promise<string> {
    // Get existing tracking codes to ensure uniqueness
    const existingCodes = mockTrackingCodes.map(record => record.trackingCode);
    
    // Generate new unique tracking code
    const newTrackingCode = TrackingCodeGenerator.generateTrackingCode(existingCodes);
    
    // Create tracking code record
    const trackingRecord: TrackingCodeRecord = {
      trackingCode: newTrackingCode,
      appointmentId: appointmentData.appointmentId,
      customerName: appointmentData.customerName,
      customerEmail: appointmentData.customerEmail,
      serviceName: appointmentData.serviceName,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real implementation, this would save to database
    mockTrackingCodes.push(trackingRecord);
    
    return newTrackingCode;
  }
  
  /**
   * Look up tracking code information
   */
  static async lookupTrackingCode(trackingCode: string): Promise<TrackingCodeRecord | null> {
    // Validate format first
    if (!TrackingCodeGenerator.validateTrackingCode(trackingCode)) {
      throw new Error('Invalid tracking code format');
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find tracking code record
    const record = mockTrackingCodes.find(
      record => record.trackingCode.toLowerCase() === trackingCode.toLowerCase()
    );
    
    return record || null;
  }
  
  /**
   * Update tracking code status
   */
  static async updateTrackingCodeStatus(
    trackingCode: string, 
    newStatus: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  ): Promise<boolean> {
    const recordIndex = mockTrackingCodes.findIndex(
      record => record.trackingCode.toLowerCase() === trackingCode.toLowerCase()
    );
    
    if (recordIndex === -1) {
      return false;
    }
    
    // Update status and timestamp
    mockTrackingCodes[recordIndex].status = newStatus;
    mockTrackingCodes[recordIndex].updatedAt = new Date().toISOString();
    
    return true;
  }
  
  /**
   * Get all tracking codes for a customer
   */
  static async getCustomerTrackingCodes(customerEmail: string): Promise<TrackingCodeRecord[]> {
    return mockTrackingCodes.filter(
      record => record.customerEmail.toLowerCase() === customerEmail.toLowerCase()
    );
  }
  
  /**
   * Search tracking codes
   */
  static async searchTrackingCodes(query: string): Promise<TrackingCodeRecord[]> {
    const normalizedQuery = query.toLowerCase();
    
    return mockTrackingCodes.filter(record => 
      record.trackingCode.toLowerCase().includes(normalizedQuery) ||
      record.customerName.toLowerCase().includes(normalizedQuery) ||
      record.customerEmail.toLowerCase().includes(normalizedQuery) ||
      record.serviceName.toLowerCase().includes(normalizedQuery)
    );
  }
  
  /**
   * Get tracking code statistics
   */
  static async getTrackingCodeStats(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byYear: Record<number, number>;
    recentCodes: TrackingCodeRecord[];
  }> {
    const stats = {
      total: mockTrackingCodes.length,
      byStatus: {} as Record<string, number>,
      byYear: {} as Record<number, number>,
      recentCodes: mockTrackingCodes
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
    };
    
    // Count by status
    mockTrackingCodes.forEach(record => {
      stats.byStatus[record.status] = (stats.byStatus[record.status] || 0) + 1;
      
      const year = TrackingCodeGenerator.extractYear(record.trackingCode);
      if (year) {
        stats.byYear[year] = (stats.byYear[year] || 0) + 1;
      }
    });
    
    return stats;
  }
  
  /**
   * Validate tracking code and check if it exists
   */
  static async validateAndCheckTrackingCode(trackingCode: string): Promise<{
    isValid: boolean;
    exists: boolean;
    record?: TrackingCodeRecord;
    error?: string;
  }> {
    // Check format
    if (!TrackingCodeGenerator.validateTrackingCode(trackingCode)) {
      return {
        isValid: false,
        exists: false,
        error: 'Invalid tracking code format. Expected format: MC-YYYY-XXXXXX'
      };
    }
    
    // Check if exists
    const record = await this.lookupTrackingCode(trackingCode);
    
    return {
      isValid: true,
      exists: !!record,
      record: record || undefined
    };
  }
  
  /**
   * Generate tracking code display information
   */
  static getTrackingCodeDisplayInfo(trackingCode: string): {
    formatted: string;
    year: number | null;
    sequentialNumber: string | null;
    isCurrentYear: boolean;
  } {
    return {
      formatted: TrackingCodeGenerator.formatForDisplay(trackingCode),
      year: TrackingCodeGenerator.extractYear(trackingCode),
      sequentialNumber: TrackingCodeGenerator.extractSequentialNumber(trackingCode),
      isCurrentYear: TrackingCodeGenerator.isCurrentYear(trackingCode)
    };
  }
}

export default TrackingCodeService;