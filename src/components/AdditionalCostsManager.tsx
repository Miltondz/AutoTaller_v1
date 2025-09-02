import React, { useState } from 'react';
import { DollarSign, Plus, Trash2, Save, X, Calculator, AlertCircle } from 'lucide-react';

interface CostItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
}

interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  servicePrice: number;
  estimatedTime: number;
  includesParts: boolean;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  trackingCode: string;
  vehicleInfo: VehicleInfo;
  workNotes?: string;
  additionalCosts?: number;
  costBreakdown?: CostItem[];
  createdAt: string;
  updatedAt: string;
}

interface AdditionalCostsManagerProps {
  appointment: Appointment;
  onCostsUpdate: (appointmentId: string, costs: CostItem[], totalAdditionalCosts: number) => Promise<void>;
  onClose: () => void;
}

const AdditionalCostsManager: React.FC<AdditionalCostsManagerProps> = ({
  appointment,
  onCostsUpdate,
  onClose
}) => {
  const [costItems, setCostItems] = useState<CostItem[]>(
    appointment.costBreakdown || []
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate totals
  const additionalCostsTotal = costItems.reduce((sum, item) => sum + item.total, 0);
  const grandTotal = appointment.servicePrice + additionalCostsTotal;

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addCostItem = () => {
    const newItem: CostItem = {
      id: generateId(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setCostItems([...costItems, newItem]);
  };

  const updateCostItem = (id: string, field: keyof CostItem, value: string | number) => {
    setCostItems(items => 
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate total when quantity or unitPrice changes
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          
          return updatedItem;
        }
        return item;
      })
    );
    
    // Clear error for this field
    if (errors[`${id}-${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${id}-${field}`];
        return newErrors;
      });
    }
  };

  const removeCostItem = (id: string) => {
    setCostItems(items => items.filter(item => item.id !== id));
  };

  const validateCostItems = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    costItems.forEach(item => {
      if (!item.description.trim()) {
        newErrors[`${item.id}-description`] = 'La descripción es requerida';
        isValid = false;
      }
      
      if (item.quantity <= 0) {
        newErrors[`${item.id}-quantity`] = 'La cantidad debe ser mayor que 0';
        isValid = false;
      }
      
      if (item.unitPrice < 0) {
        newErrors[`${item.id}-unitPrice`] = 'El precio unitario no puede ser negativo';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateCostItems()) {
      return;
    }

    setIsUpdating(true);
    try {
      await onCostsUpdate(appointment.id, costItems, additionalCostsTotal);
      onClose();
    } catch (error) {
      console.error('Failed to update costs:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestión de Costos Adicionales</h2>
              <p className="text-gray-600 mt-1">
                {appointment.customerName} - {appointment.trackingCode}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Service Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Información del Servicio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800">Servicio:</span>
                <span className="ml-2 text-blue-900">{appointment.serviceName}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Precio Base:</span>
                <span className="ml-2 text-blue-900">{formatCurrency(appointment.servicePrice)}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Partes Incluidas:</span>
                <span className="ml-2 text-blue-900">{appointment.includesParts ? 'Sí' : 'No'}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Vehículo:</span>
                <span className="ml-2 text-blue-900">
                  {appointment.vehicleInfo.year} {appointment.vehicleInfo.make} {appointment.vehicleInfo.model}
                </span>
              </div>
            </div>
          </div>

          {/* Parts Not Included Warning */}
          {!appointment.includesParts && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Partes No Incluidas</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    Este servicio no incluye partes. Añade cualquier parte o material adicional usado a continuación.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Costs Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Costos Adicionales</h3>
              <button
                onClick={addCostItem}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Artículo</span>
              </button>
            </div>

            {costItems.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <DollarSign className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No hay Costos Adicionales</h4>
                <p className="text-gray-600 mb-4">
                  Añade partes, materiales u otros costos que no estén incluidos en el precio base del servicio.
                </p>
                <button
                  onClick={addCostItem}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Primer Artículo</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cost Items Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
                  <div className="col-span-5">Descripción</div>
                  <div className="col-span-2">Cantidad</div>
                  <div className="col-span-2">Precio Unitario</div>
                  <div className="col-span-2">Total</div>
                  <div className="col-span-1">Acciones</div>
                </div>

                {/* Cost Items */}
                {costItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border border-gray-200 rounded-lg">
                    {/* Description */}
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateCostItem(item.id, 'description', e.target.value)}
                        placeholder="Descripción de la parte o servicio..."
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                          errors[`${item.id}-description`] ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors[`${item.id}-description`] && (
                        <p className="text-red-600 text-xs mt-1">{errors[`${item.id}-description`]}</p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateCostItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="1"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                          errors[`${item.id}-quantity`] ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors[`${item.id}-quantity`] && (
                        <p className="text-red-600 text-xs mt-1">{errors[`${item.id}-quantity`]}</p>
                      )}
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateCostItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                          errors[`${item.id}-unitPrice`] ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors[`${item.id}-unitPrice`] && (
                        <p className="text-red-600 text-xs mt-1">{errors[`${item.id}-unitPrice`]}</p>
                      )}
                    </div>

                    {/* Total */}
                    <div className="col-span-2">
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-right font-medium text-gray-900">
                        {formatCurrency(item.total)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <button
                        onClick={() => removeCostItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar artículo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cost Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Resumen de Costos
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Precio del Servicio:</span>
                <span className="font-medium text-gray-900">{formatCurrency(appointment.servicePrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Costos Adicionales:</span>
                <span className="font-medium text-gray-900">{formatCurrency(additionalCostsTotal)}</span>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Monto Total:</span>
                  <span className="text-lg font-bold text-green-600">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUpdating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Guardando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Guardar Costos</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalCostsManager;