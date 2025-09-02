import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, History, AlertCircle } from 'lucide-react';
import { 
  FormInput, 
  FormSelect, 
  FormSection,
  AutomotiveButton,
  AutomotiveCard,
  Alert
} from './AutomotiveForm';
import { VehicleDetails } from '../types/automotive';
import { validateField, SpecificValidators } from '../utils/formValidation';

interface VehicleInformationFormProps {
  vehicleDetails: VehicleDetails;
  onVehicleChange: (details: VehicleDetails) => void;
  showHistory?: boolean;
  onHistoryLookup?: (licensePlate: string) => Promise<VehicleDetails[]>;
  errors?: Record<string, string>;
  disabled?: boolean;
}

// Common vehicle makes for Venezuela
const VEHICLE_MAKES = [
  'Toyota', 'Chevrolet', 'Ford', 'Hyundai', 'Kia', 'Nissan', 'Honda', 
  'Volkswagen', 'Renault', 'Peugeot', 'Fiat', 'Mitsubishi', 'Mazda',
  'Jeep', 'Suzuki', 'Chery', 'BYD', 'Geely', 'JAC', 'Dongfeng'
].sort();

// Generate years from 1990 to current year + 1
const VEHICLE_YEARS = Array.from(
  { length: new Date().getFullYear() - 1989 + 2 }, 
  (_, i) => new Date().getFullYear() + 1 - i
);

export const VehicleInformationForm: React.FC<VehicleInformationFormProps> = ({
  vehicleDetails,
  onVehicleChange,
  showHistory = false,
  onHistoryLookup,
  errors = {},
  disabled = false
}) => {
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [historyResults, setHistoryResults] = useState<VehicleDetails[]>([]);
  const [showHistoryResults, setShowHistoryResults] = useState(false);

  const handleInputChange = (field: keyof VehicleDetails, value: string | number) => {
    // Validate the field
    let validationError = '';
    
    if (field === 'license_plate' && typeof value === 'string') {
      validationError = validateField('licensePlate', value) || '';
    } else if (field === 'make' && typeof value === 'string') {
      validationError = validateField('vehicleMake', value) || '';
    } else if (field === 'model' && typeof value === 'string') {
      validationError = validateField('vehicleModel', value) || '';
    } else if (field === 'year' && typeof value === 'number') {
      validationError = validateField('vehicleYear', value) || '';
      // Additional validation for vehicle year with make
      if (!validationError && vehicleDetails.make) {
        const yearError = SpecificValidators.validateVehicleYear(value, vehicleDetails.make, vehicleDetails.model);
        if (yearError) validationError = yearError;
      }
    } else if (field === 'mileage' && typeof value === 'number') {
      validationError = validateField('mileage', value) || '';
    }
    
    onVehicleChange({
      ...vehicleDetails,
      [field]: value
    });
  };

  const handleHistoryLookup = async () => {
    if (!onHistoryLookup || !vehicleDetails.license_plate.trim()) return;

    setIsLookingUp(true);
    try {
      const results = await onHistoryLookup(vehicleDetails.license_plate.trim());
      setHistoryResults(results);
      setShowHistoryResults(true);
    } catch (error) {
      console.error('Error looking up vehicle history:', error);
    } finally {
      setIsLookingUp(false);
    }
  };

  const selectHistoryResult = (result: VehicleDetails) => {
    onVehicleChange(result);
    setShowHistoryResults(false);
  };

  const validateLicensePlate = (plate: string): boolean => {
    // Venezuelan license plate format: ABC123 or AB123CD
    const patterns = [
      /^[A-Z]{3}\d{3}$/, // ABC123
      /^[A-Z]{2}\d{3}[A-Z]{2}$/, // AB123CD
    ];
    return patterns.some(pattern => pattern.test(plate.toUpperCase()));
  };

  const formatLicensePlate = (plate: string): string => {
    return plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
  };

  const makeOptions = [
    { value: '', label: 'Seleccionar marca...' },
    ...VEHICLE_MAKES.map(make => ({ value: make, label: make }))
  ];

  const yearOptions = [
    { value: '', label: 'Seleccionar año...' },
    ...VEHICLE_YEARS.map(year => ({ value: year.toString(), label: year.toString() }))
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FormSection 
        title="Información del Vehículo"
        description="Proporciona los detalles de tu vehículo para un mejor servicio"
      >
        <div className="space-y-6">
          {/* License Plate with History Lookup */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <FormInput
                  label="Placa del Vehículo"
                  value={vehicleDetails.license_plate}
                  onChange={(e) => handleInputChange('license_plate', formatLicensePlate(e.target.value))}
                  error={errors.license_plate}
                  placeholder="ABC123 o AB123CD"
                  maxLength={7}
                  disabled={disabled}
                  required
                  hint={
                    vehicleDetails.license_plate && !validateLicensePlate(vehicleDetails.license_plate)
                      ? 'Formato de placa no válido'
                      : undefined
                  }
                />
              </div>
              {showHistory && onHistoryLookup && (
                <div className="flex items-end">
                  <AutomotiveButton
                    type="button"
                    variant="secondary"
                    onClick={handleHistoryLookup}
                    disabled={!vehicleDetails.license_plate.trim() || isLookingUp || disabled}
                    loading={isLookingUp}
                    icon={<History className="w-4 h-4" />}
                  >
                    Historial
                  </AutomotiveButton>
                </div>
              )}
            </div>

            {/* History Results */}
            {showHistoryResults && historyResults.length > 0 && (
              <AutomotiveCard className="p-4">
                <h4 className="font-medium text-primary-800 mb-3 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Historial de Servicios
                </h4>
                <div className="space-y-2">
                  {historyResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => selectHistoryResult(result)}
                      className="w-full text-left p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                    >
                      <div className="font-medium text-primary-800">
                        {result.make} {result.model} ({result.year})
                      </div>
                      <div className="text-sm text-primary-600">
                        Kilometraje: {result.mileage.toLocaleString()} km
                      </div>
                    </button>
                  ))}
                </div>
              </AutomotiveCard>
            )}
          </div>

          {/* Vehicle Details Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormSelect
              label="Marca"
              value={vehicleDetails.make}
              onChange={(e) => handleInputChange('make', e.target.value)}
              options={makeOptions}
              error={errors.make}
              disabled={disabled}
              required
            />

            <FormInput
              label="Modelo"
              value={vehicleDetails.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              error={errors.model}
              placeholder="ej. Corolla, Aveo, Focus"
              disabled={disabled}
              required
            />

            <FormSelect
              label="Año"
              value={vehicleDetails.year.toString()}
              onChange={(e) => handleInputChange('year', parseInt(e.target.value) || 0)}
              options={yearOptions}
              error={errors.year}
              disabled={disabled}
              required
            />
          </div>

          {/* Mileage */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="Kilometraje Actual"
              type="number"
              value={vehicleDetails.mileage}
              onChange={(e) => handleInputChange('mileage', parseInt(e.target.value) || 0)}
              error={errors.mileage}
              placeholder="150000"
              min="0"
              max="999999"
              disabled={disabled}
              required
              hint="Kilometraje aproximado del vehículo"
            />

            {/* Vehicle Summary */}
            {vehicleDetails.make && vehicleDetails.model && vehicleDetails.year && (
              <AutomotiveCard className="p-4 flex items-center gap-3">
                <Car className="w-8 h-8 text-accent-600" />
                <div>
                  <div className="font-medium text-primary-800">
                    {vehicleDetails.make} {vehicleDetails.model}
                  </div>
                  <div className="text-sm text-primary-600">
                    Año {vehicleDetails.year} • {vehicleDetails.mileage.toLocaleString()} km
                  </div>
                  <div className="text-sm text-primary-500">
                    Placa: {vehicleDetails.license_plate}
                  </div>
                </div>
              </AutomotiveCard>
            )}
          </div>

          {/* Validation Warnings */}
          {vehicleDetails.year && vehicleDetails.year > new Date().getFullYear() && (
            <Alert type="warning">
              <AlertCircle className="w-4 h-4" />
              El año del vehículo no puede ser mayor al año actual.
            </Alert>
          )}

          {vehicleDetails.year && vehicleDetails.year < 1990 && (
            <Alert type="info">
              <AlertCircle className="w-4 h-4" />
              Vehículos anteriores a 1990 pueden requerir servicios especializados.
            </Alert>
          )}

          {vehicleDetails.mileage > 300000 && (
            <Alert type="info">
              <AlertCircle className="w-4 h-4" />
              Vehículos con alto kilometraje pueden requerir mantenimiento adicional.
            </Alert>
          )}
        </div>
      </FormSection>
    </motion.div>
  );
};

// Vehicle Information Display Component (for admin use)
interface VehicleInfoDisplayProps {
  vehicle: VehicleDetails;
  className?: string;
  showMileage?: boolean;
}

export const VehicleInfoDisplay: React.FC<VehicleInfoDisplayProps> = ({
  vehicle,
  className = '',
  showMileage = true
}) => {
  return (
    <AutomotiveCard className={`p-4 ${className}`}>
      <div className="flex items-center gap-3">
        <Car className="w-6 h-6 text-accent-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-primary-800 truncate">
            {vehicle.make} {vehicle.model} ({vehicle.year})
          </div>
          <div className="text-sm text-primary-600">
            Placa: {vehicle.license_plate}
            {showMileage && ` • ${vehicle.mileage.toLocaleString()} km`}
          </div>
        </div>
      </div>
    </AutomotiveCard>
  );
};

export default VehicleInformationForm;