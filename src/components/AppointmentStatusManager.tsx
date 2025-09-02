import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle, FileText, Save, X } from 'lucide-react';

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
  createdAt: string;
  updatedAt: string;
  statusHistory?: StatusHistoryEntry[];
}

interface StatusHistoryEntry {
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  timestamp: string;
  notes?: string;
  updatedBy: string;
}

interface AppointmentStatusManagerProps {
  appointment: Appointment;
  onStatusUpdate: (appointmentId: string, newStatus: 'scheduled' | 'in_progress' | 'completed' | 'cancelled', notes?: string) => Promise<void>;
  onWorkNotesUpdate: (appointmentId: string, notes: string) => Promise<void>;
  onClose: () => void;
}

const AppointmentStatusManager: React.FC<AppointmentStatusManagerProps> = ({
  appointment,
  onStatusUpdate,
  onWorkNotesUpdate,
  onClose
}) => {
  const [selectedStatus, setSelectedStatus] = useState<'scheduled' | 'in_progress' | 'completed' | 'cancelled'>(appointment.status);
  const [statusNotes, setStatusNotes] = useState('');
  const [workNotes, setWorkNotes] = useState(appointment.workNotes || '');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingNotes, setIsUpdatingNotes] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const statusOptions = [
    {
      value: 'scheduled' as const,
      label: 'Programada',
      description: 'La cita está programada y esperando para comenzar',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      value: 'in_progress' as const,
      label: 'En Progreso',
      description: 'El servicio se está realizando actualmente',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200'
    },
    {
      value: 'completed' as const,
      label: 'Completada',
      description: 'El servicio ha sido completado exitosamente',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    {
      value: 'cancelled' as const,
      label: 'Cancelada',
      description: 'La cita ha sido cancelada',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200'
    }
  ];

  const getStatusOption = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const canTransitionTo = (fromStatus: string, toStatus: string): boolean => {
    const transitions: Record<string, string[]> = {
      'scheduled': ['in_progress', 'cancelled'],
      'in_progress': ['completed', 'cancelled'],
      'completed': [], // Completed appointments cannot be changed
      'cancelled': ['scheduled'] // Cancelled appointments can be rescheduled
    };
    
    return transitions[fromStatus]?.includes(toStatus) || fromStatus === toStatus;
  };

  const getTransitionMessage = (fromStatus: string, toStatus: string): string => {
    if (fromStatus === toStatus) return '';
    
    const messages: Record<string, Record<string, string>> = {
      'scheduled': {
        'in_progress': '¿Comenzar a trabajar en esta cita?',
        'cancelled': '¿Cancelar esta cita programada?'
      },
      'in_progress': {
        'completed': '¿Marcar esta cita como completada?',
        'cancelled': '¿Cancelar esta cita que está en progreso?'
      },
      'cancelled': {
        'scheduled': '¿Reprogramar esta cita cancelada?'
      }
    };
    
    const fromStatusSpanish = statusOptions.find(o => o.value === fromStatus)?.label || fromStatus;
    const toStatusSpanish = statusOptions.find(o => o.value === toStatus)?.label || toStatus;

    return messages[fromStatus]?.[toStatus] || `¿Cambiar estado de "${fromStatusSpanish}" a "${toStatusSpanish}"?`;
  };

  const handleStatusChange = async () => {
    if (selectedStatus === appointment.status) {
      setShowConfirmDialog(false);
      return;
    }

    setIsUpdatingStatus(true);
    try {
      await onStatusUpdate(appointment.id, selectedStatus, statusNotes);
      setShowConfirmDialog(false);
      setStatusNotes('');
    } catch (error) {
      console.error('Failed to update status:', error);
      // Reset to current status on error
      setSelectedStatus(appointment.status);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleWorkNotesUpdate = async () => {
    if (workNotes === appointment.workNotes) return;

    setIsUpdatingNotes(true);
    try {
      await onWorkNotesUpdate(appointment.id, workNotes);
    } catch (error) {
      console.error('Failed to update work notes:', error);
      // Reset notes on error
      setWorkNotes(appointment.workNotes || '');
    } finally {
      setIsUpdatingNotes(false);
    }
  };

  const handleStatusSelection = (status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled') => {
    if (!canTransitionTo(appointment.status, status)) {
      return;
    }
    
    setSelectedStatus(status);
    if (status !== appointment.status) {
      setShowConfirmDialog(true);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const currentStatusOption = getStatusOption(appointment.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestión del Estado de la Cita</h2>
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

        <div className="p-6 space-y-8">
          {/* Current Status Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Estado Actual</h3>
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${currentStatusOption.bgColor} ${currentStatusOption.borderColor}`}>
              <currentStatusOption.icon className={`w-5 h-5 ${currentStatusOption.color}`} />
              <span className={`font-medium ${currentStatusOption.color}`}>
                {currentStatusOption.label}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{currentStatusOption.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Última actualización: {formatTimestamp(appointment.updatedAt)}
            </p>
          </div>

          {/* Status Change Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Estado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statusOptions.map((option) => {
                const canTransition = canTransitionTo(appointment.status, option.value);
                const isCurrentStatus = option.value === appointment.status;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleStatusSelection(option.value)}
                    disabled={!canTransition}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isCurrentStatus
                        ? `${option.bgColor} ${option.borderColor} ${option.color}`
                        : canTransition
                        ? `border-gray-200 hover:${option.bgColor} hover:${option.borderColor} hover:${option.color}`
                        : 'border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <option.icon className={`w-6 h-6 ${
                        isCurrentStatus ? option.color : canTransition ? 'text-gray-600' : 'text-gray-500'
                      }`} />
                      <div>
                        <p className={`font-medium ${
                          isCurrentStatus ? option.color : canTransition ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {option.label}
                          {isCurrentStatus && <span className="ml-2 text-sm">(Actual)</span>}
                        </p>
                        <p className={`text-sm ${
                          isCurrentStatus ? option.color.replace('600', '500') : canTransition ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Work Notes Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notas de Trabajo</h3>
            <div className="space-y-4">
              <textarea
                value={workNotes}
                onChange={(e) => setWorkNotes(e.target.value)}
                placeholder="Añadir notas sobre el trabajo realizado, piezas necesarias o cualquier observación..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleWorkNotesUpdate}
                  disabled={isUpdatingNotes || workNotes === appointment.workNotes}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUpdatingNotes ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Guardar Notas</span>
                </button>
              </div>
            </div>
          </div>

          {/* Status History */}
          {appointment.statusHistory && appointment.statusHistory.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Estado</h3>
              <div className="space-y-3">
                {appointment.statusHistory.map((entry, index) => {
                  const statusOption = getStatusOption(entry.status);
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <statusOption.icon className={`w-5 h-5 mt-0.5 ${statusOption.color}`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${statusOption.color}`}>
                            {statusOption.label}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatTimestamp(entry.timestamp)}
                          </span>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Actualizado por: {entry.updatedBy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Status Change Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmar Cambio de Estado</h3>
              <p className="text-gray-600 mb-4">
                {getTransitionMessage(appointment.status, selectedStatus)}
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Añadir notas sobre este cambio de estado (opcional):
                </label>
                <textarea
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Razón del cambio de estado, detalles adicionales..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowConfirmDialog(false);
                    setSelectedStatus(appointment.status);
                    setStatusNotes('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleStatusChange}
                  disabled={isUpdatingStatus}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUpdatingStatus ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Actualizando...</span>
                    </div>
                  ) : (
                    'Confirmar Cambio'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentStatusManager;