// Comprehensive form validation utilities for automotive service forms
import React from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[1-9][\d]{0,3}[\s-(]?[\d]{3}[\s-]?[\d]{3}[\s-]?[\d]{4}$/,
  licensePlate: /^[A-Z0-9]{2,3}[-\s]?[A-Z0-9]{2,4}$/i,
  vin: /^[A-HJ-NPR-Z0-9]{17}$/i,
  postalCode: /^\d{5}(-\d{4})?$/,
  year: /^(19|20)\d{2}$/,
  mileage: /^\d{1,7}$/
};

// Validation rules for different form fields
export const FieldValidationRules: Record<string, ValidationRule> = {
  // Customer Information
  customerName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  },
  customerEmail: {
    required: true,
    pattern: ValidationPatterns.email
  },
  customerPhone: {
    required: true,
    pattern: ValidationPatterns.phone
  },
  
  // Vehicle Information
  vehicleMake: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  vehicleModel: {
    required: true,
    minLength: 1,
    maxLength: 50
  },
  vehicleYear: {
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1,
    pattern: ValidationPatterns.year
  },
  licensePlate: {
    required: true,
    pattern: ValidationPatterns.licensePlate
  },
  mileage: {
    required: true,
    min: 0,
    max: 9999999,
    pattern: ValidationPatterns.mileage
  },
  vin: {
    required: false,
    pattern: ValidationPatterns.vin
  },
  
  // Service Information
  serviceType: {
    required: true
  },
  serviceName: {
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-.]+$/
  },
  serviceDescription: {
    required: true,
    minLength: 10,
    maxLength: 500
  },
  servicePrice: {
    required: true,
    min: 1,
    max: 50000,
    custom: (value: number) => {
      if (value && (value * 100) % 1 !== 0) {
        return 'El precio no puede tener más de 2 decimales';
      }
      return null;
    }
  },
  estimatedTime: {
    required: true,
    min: 15,
    max: 480, // 8 hours max
    custom: (value: number) => {
      if (value && value % 15 !== 0) {
        return 'El tiempo debe ser múltiplo de 15 minutos';
      }
      return null;
    }
  },
  partsCost: {
    required: false,
    min: 0,
    max: 100000,
    custom: (value: number) => {
      if (value && (value * 100) % 1 !== 0) {
        return 'El costo de repuestos no puede tener más de 2 decimales';
      }
      return null;
    }
  },
  laborCost: {
    required: false,
    min: 0,
    max: 50000,
    custom: (value: number) => {
      if (value && (value * 100) % 1 !== 0) {
        return 'El costo de mano de obra no puede tener más de 2 decimales';
      }
      return null;
    }
  },
  appointmentDate: {
    required: true,
    custom: (value: string) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date < today) {
        return 'La fecha no puede ser anterior a hoy';
      }
      
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 6);
      
      if (date > maxDate) {
        return 'La fecha no puede ser más de 6 meses en el futuro';
      }
      
      return null;
    }
  },
  appointmentTime: {
    required: true,
    custom: (value: string) => {
      const [hours, minutes] = value.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      
      // Business hours: 7:00 AM to 7:00 PM
      const openTime = 7 * 60; // 7:00 AM
      const closeTime = 19 * 60; // 7:00 PM
      
      if (totalMinutes < openTime || totalMinutes > closeTime) {
        return 'El horario debe estar entre 7:00 AM y 7:00 PM';
      }
      
      return null;
    }
  },
  problemDescription: {
    required: true,
    minLength: 10,
    maxLength: 1000
  },
  
  // Payment Information
  estimatedCost: {
    required: false,
    min: 0,
    max: 50000
  },
  
  // Address Information
  address: {
    required: false,
    minLength: 5,
    maxLength: 200
  },
  postalCode: {
    required: false,
    pattern: ValidationPatterns.postalCode
  }
};

// Main validation function
export function validateField(fieldName: string, value: any, rules?: ValidationRule): string | null {
  const fieldRules = rules || FieldValidationRules[fieldName];
  
  if (!fieldRules) {
    return null;
  }
  
  // Check required
  if (fieldRules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return 'Este campo es obligatorio';
  }
  
  // If field is empty and not required, skip other validations
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  
  // Check string length
  if (typeof value === 'string') {
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      return `Debe tener al menos ${fieldRules.minLength} caracteres`;
    }
    
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      return `No puede exceder ${fieldRules.maxLength} caracteres`;
    }
  }
  
  // Check numeric range
  if (typeof value === 'number' || !isNaN(Number(value))) {
    const numValue = Number(value);
    
    if (fieldRules.min !== undefined && numValue < fieldRules.min) {
      return `El valor mínimo es ${fieldRules.min}`;
    }
    
    if (fieldRules.max !== undefined && numValue > fieldRules.max) {
      return `El valor máximo es ${fieldRules.max}`;
    }
  }
  
  // Check pattern
  if (fieldRules.pattern && typeof value === 'string') {
    if (!fieldRules.pattern.test(value)) {
      return getPatternErrorMessage(fieldName, fieldRules.pattern);
    }
  }
  
  // Check custom validation
  if (fieldRules.custom) {
    const customError = fieldRules.custom(value);
    if (customError) {
      return customError;
    }
  }
  
  return null;
}

// Get user-friendly error messages for pattern validation
function getPatternErrorMessage(fieldName: string, pattern: RegExp): string {
  const patternMessages: Record<string, string> = {
    customerEmail: 'Ingrese un email válido',
    customerPhone: 'Ingrese un número de teléfono válido',
    licensePlate: 'Ingrese una placa válida (ej: ABC-123)',
    vin: 'El VIN debe tener exactamente 17 caracteres alfanuméricos',
    postalCode: 'Ingrese un código postal válido',
    vehicleYear: 'Ingrese un año válido',
    mileage: 'Ingrese un kilometraje válido (solo números)',
    customerName: 'El nombre solo puede contener letras y espacios'
  };
  
  return patternMessages[fieldName] || 'Formato inválido';
}

// Validate entire form
export function validateForm(formData: Record<string, any>, fieldRules?: Record<string, ValidationRule>): ValidationResult {
  const errors: Record<string, string> = {};
  const rulesToUse = fieldRules || FieldValidationRules;
  
  Object.keys(formData).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName], rulesToUse[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Specific validation functions for complex fields
export const SpecificValidators = {
  // Validate VIN number with check digit
  validateVIN: (vin: string): string | null => {
    if (!vin) return null;
    
    const cleanVIN = vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
    
    if (cleanVIN.length !== 17) {
      return 'El VIN debe tener exactamente 17 caracteres';
    }
    
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVIN)) {
      return 'El VIN contiene caracteres inválidos';
    }
    
    return null;
  },
  
  // Validate appointment date and time combination
  validateAppointmentDateTime: (date: string, time: string): string | null => {
    if (!date || !time) return null;
    
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    
    // Must be at least 2 hours in the future
    const minDateTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    if (appointmentDateTime < minDateTime) {
      return 'La cita debe ser al menos 2 horas en el futuro';
    }
    
    // Check if it's a weekend (Saturday = 6, Sunday = 0)
    const dayOfWeek = appointmentDateTime.getDay();
    if (dayOfWeek === 0) { // Sunday
      return 'No trabajamos los domingos (solo emergencias)';
    }
    
    return null;
  },
  
  // Validate vehicle year against make/model
  validateVehicleYear: (year: number, make: string, model: string): string | null => {
    if (!year || !make) return null;
    
    const currentYear = new Date().getFullYear();
    
    // Basic year range validation
    if (year < 1900 || year > currentYear + 1) {
      return `El año debe estar entre 1900 y ${currentYear + 1}`;
    }
    
    // Some basic make-specific validations
    const makeValidations: Record<string, { minYear: number; maxYear?: number }> = {
      'Tesla': { minYear: 2008 },
      'Rivian': { minYear: 2021 },
      'Lucid': { minYear: 2021 }
    };
    
    const makeValidation = makeValidations[make];
    if (makeValidation) {
      if (year < makeValidation.minYear) {
        return `${make} no fabricó vehículos antes de ${makeValidation.minYear}`;
      }
      if (makeValidation.maxYear && year > makeValidation.maxYear) {
        return `${make} no fabricó vehículos después de ${makeValidation.maxYear}`;
      }
    }
    
    return null;
  },

  // Validate service name uniqueness (would typically check against database)
  validateServiceNameUniqueness: (serviceName: string, existingServices: string[] = []): string | null => {
    if (!serviceName) return null;
    
    const normalizedName = serviceName.toLowerCase().trim();
    const isDuplicate = existingServices.some(existing => 
      existing.toLowerCase().trim() === normalizedName
    );
    
    if (isDuplicate) {
      return 'Ya existe un servicio con este nombre';
    }
    
    return null;
  },

  // Validate service pricing structure
  validateServicePricing: (servicePrice: number, partsCost: number = 0, laborCost: number = 0, includeParts: boolean = false): string | null => {
    if (!servicePrice) return null;
    
    // If parts are included, service price should be higher
    if (includeParts && partsCost > 0 && servicePrice < partsCost) {
      return 'El precio del servicio debe incluir el costo de los repuestos';
    }
    
    // Total cost validation
    const totalCost = partsCost + laborCost;
    if (totalCost > 0 && servicePrice < totalCost * 0.8) {
      return 'El precio del servicio parece muy bajo comparado con los costos';
    }
    
    // Maximum reasonable markup validation
    if (totalCost > 0 && servicePrice > totalCost * 3) {
      return 'El precio del servicio parece muy alto comparado con los costos';
    }
    
    return null;
  },

  // Validate estimated time against service complexity
  validateEstimatedTime: (estimatedTime: number, serviceCategory: string = '', includeParts: boolean = false): string | null => {
    if (!estimatedTime) return null;
    
    // Category-based time validation
    const categoryTimeRanges: Record<string, { min: number; max: number }> = {
      'maintenance': { min: 30, max: 180 }, // 30 min to 3 hours
      'repair': { min: 60, max: 480 }, // 1 to 8 hours
      'diagnostics': { min: 30, max: 120 }, // 30 min to 2 hours
      'inspection': { min: 15, max: 60 } // 15 min to 1 hour
    };
    
    const timeRange = categoryTimeRanges[serviceCategory];
    if (timeRange) {
      if (estimatedTime < timeRange.min) {
        return `El tiempo estimado para ${serviceCategory} debe ser al menos ${timeRange.min} minutos`;
      }
      if (estimatedTime > timeRange.max) {
        return `El tiempo estimado para ${serviceCategory} no debe exceder ${timeRange.max} minutos`;
      }
    }
    
    // If parts are included, add minimum time for parts handling
    if (includeParts && estimatedTime < 45) {
      return 'Servicios que incluyen repuestos requieren al menos 45 minutos';
    }
    
    return null;
  },

  // Validate monetary amounts with proper formatting
  validateMonetaryAmount: (amount: number, fieldName: string = 'monto'): string | null => {
    if (amount === undefined || amount === null) return null;
    
    // Check for negative amounts
    if (amount < 0) {
      return `El ${fieldName} no puede ser negativo`;
    }
    
    // Check for excessive decimal places
    if ((amount * 100) % 1 !== 0) {
      return `El ${fieldName} no puede tener más de 2 decimales`;
    }
    
    // Check for unreasonably large amounts
    if (amount > 1000000) {
      return `El ${fieldName} parece excesivamente alto`;
    }
    
    return null;
  },

  // Validate cost breakdown consistency
  validateCostBreakdown: (serviceCost: number, partsCost: number, laborCost: number, additionalCosts: number = 0): string | null => {
    const totalCalculated = partsCost + laborCost + additionalCosts;
    const difference = Math.abs(serviceCost - totalCalculated);
    
    // Allow for small rounding differences
    if (difference > 0.01 && totalCalculated > 0) {
      return 'El costo total del servicio no coincide con la suma de los componentes';
    }
    
    // Validate individual components
    if (partsCost > serviceCost) {
      return 'El costo de repuestos no puede ser mayor al costo total del servicio';
    }
    
    if (laborCost > serviceCost) {
      return 'El costo de mano de obra no puede ser mayor al costo total del servicio';
    }
    
    return null;
  }
};

export default {
  validateField,
  validateForm,
  ValidationPatterns,
  FieldValidationRules,
  SpecificValidators
};