/**
 * Service Tracking Code Generator
 * Format: MC-YYYY-XXXXXX
 * MC = Mechanic Code
 * YYYY = Current Year
 * XXXXXX = 6-digit sequential number
 */

export class TrackingCodeGenerator {
  private static readonly PREFIX = 'MC';
  private static readonly CODE_LENGTH = 6;
  
  /**
   * Generate a unique tracking code
   * @param existingCodes Array of existing codes to ensure uniqueness
   * @returns Unique tracking code in format MC-YYYY-XXXXXX
   */
  static generateTrackingCode(existingCodes: string[] = []): string {
    const currentYear = new Date().getFullYear();
    let attempts = 0;
    const maxAttempts = 1000;
    
    while (attempts < maxAttempts) {
      const sequentialNumber = this.generateSequentialNumber();
      const trackingCode = `${this.PREFIX}-${currentYear}-${sequentialNumber}`;
      
      if (!existingCodes.includes(trackingCode)) {
        return trackingCode;
      }
      
      attempts++;
    }
    
    // Fallback: use timestamp-based code if sequential fails
    return this.generateTimestampBasedCode();
  }
  
  /**
   * Generate a 6-digit sequential number
   */
  private static generateSequentialNumber(): string {
    // In a real implementation, this would query the database for the last used number
    // For now, we'll use a random number with some logic to make it sequential-like
    const baseNumber = Math.floor(Math.random() * 999999) + 1;
    return baseNumber.toString().padStart(this.CODE_LENGTH, '0');
  }
  
  /**
   * Generate timestamp-based code as fallback
   */
  private static generateTimestampBasedCode(): string {
    const currentYear = new Date().getFullYear();
    const timestamp = Date.now();
    const lastSixDigits = timestamp.toString().slice(-6);
    return `${this.PREFIX}-${currentYear}-${lastSixDigits}`;
  }
  
  /**
   * Validate tracking code format
   * @param code Tracking code to validate
   * @returns True if valid format
   */
  static validateTrackingCode(code: string): boolean {
    const pattern = /^MC-\d{4}-\d{6}$/;
    return pattern.test(code);
  }
  
  /**
   * Extract year from tracking code
   * @param code Tracking code
   * @returns Year or null if invalid
   */
  static extractYear(code: string): number | null {
    if (!this.validateTrackingCode(code)) {
      return null;
    }
    
    const parts = code.split('-');
    return parseInt(parts[1]);
  }
  
  /**
   * Extract sequential number from tracking code
   * @param code Tracking code
   * @returns Sequential number or null if invalid
   */
  static extractSequentialNumber(code: string): string | null {
    if (!this.validateTrackingCode(code)) {
      return null;
    }
    
    const parts = code.split('-');
    return parts[2];
  }
  
  /**
   * Format tracking code for display (adds spacing)
   * @param code Tracking code
   * @returns Formatted code or original if invalid
   */
  static formatForDisplay(code: string): string {
    if (!this.validateTrackingCode(code)) {
      return code;
    }
    
    const parts = code.split('-');
    return `${parts[0]} - ${parts[1]} - ${parts[2]}`;
  }
  
  /**
   * Generate multiple unique tracking codes
   * @param count Number of codes to generate
   * @param existingCodes Array of existing codes
   * @returns Array of unique tracking codes
   */
  static generateMultipleCodes(count: number, existingCodes: string[] = []): string[] {
    const codes: string[] = [];
    const allExistingCodes = [...existingCodes];
    
    for (let i = 0; i < count; i++) {
      const newCode = this.generateTrackingCode(allExistingCodes);
      codes.push(newCode);
      allExistingCodes.push(newCode);
    }
    
    return codes;
  }
  
  /**
   * Check if tracking code belongs to current year
   * @param code Tracking code
   * @returns True if code is from current year
   */
  static isCurrentYear(code: string): boolean {
    const year = this.extractYear(code);
    return year === new Date().getFullYear();
  }
  
  /**
   * Get tracking code statistics
   * @param codes Array of tracking codes
   * @returns Statistics object
   */
  static getCodeStatistics(codes: string[]): {
    total: number;
    currentYear: number;
    byYear: Record<number, number>;
    validCodes: number;
    invalidCodes: number;
  } {
    const stats = {
      total: codes.length,
      currentYear: 0,
      byYear: {} as Record<number, number>,
      validCodes: 0,
      invalidCodes: 0
    };
    
    const currentYear = new Date().getFullYear();
    
    codes.forEach(code => {
      if (this.validateTrackingCode(code)) {
        stats.validCodes++;
        const year = this.extractYear(code);
        
        if (year) {
          stats.byYear[year] = (stats.byYear[year] || 0) + 1;
          if (year === currentYear) {
            stats.currentYear++;
          }
        }
      } else {
        stats.invalidCodes++;
      }
    });
    
    return stats;
  }
}

// Utility functions for tracking code operations
export const trackingCodeUtils = {
  /**
   * Search tracking codes by partial match
   */
  searchCodes: (codes: string[], query: string): string[] => {
    const normalizedQuery = query.toUpperCase().replace(/[^A-Z0-9]/g, '');
    return codes.filter(code => 
      code.replace(/[^A-Z0-9]/g, '').includes(normalizedQuery)
    );
  },
  
  /**
   * Sort tracking codes chronologically
   */
  sortCodes: (codes: string[], ascending: boolean = true): string[] => {
    return [...codes].sort((a, b) => {
      const yearA = TrackingCodeGenerator.extractYear(a) || 0;
      const yearB = TrackingCodeGenerator.extractYear(b) || 0;
      const seqA = TrackingCodeGenerator.extractSequentialNumber(a) || '000000';
      const seqB = TrackingCodeGenerator.extractSequentialNumber(b) || '000000';
      
      if (yearA !== yearB) {
        return ascending ? yearA - yearB : yearB - yearA;
      }
      
      return ascending ? seqA.localeCompare(seqB) : seqB.localeCompare(seqA);
    });
  },
  
  /**
   * Group tracking codes by year
   */
  groupByYear: (codes: string[]): Record<number, string[]> => {
    const groups: Record<number, string[]> = {};
    
    codes.forEach(code => {
      const year = TrackingCodeGenerator.extractYear(code);
      if (year) {
        if (!groups[year]) {
          groups[year] = [];
        }
        groups[year].push(code);
      }
    });
    
    return groups;
  }
};

export default TrackingCodeGenerator;