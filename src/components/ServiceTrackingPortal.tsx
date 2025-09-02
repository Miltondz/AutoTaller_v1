import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Car, 
  User, 
  Calendar, 
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Wrench,
  MessageSquare,
  FileText
} from 'lucide-react';
import CustomerMessagingSystem from './CustomerMessagingSystem';
import RealTimeStatusUpdates from './RealTimeStatusUpdates';
import { useMockServiceTracking } from '../hooks/useMockServiceTracking';
import { ServiceTracking } from '../types/automotive';

const ServiceTrackingPortal: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const { trackingData: mockTrackingData, loading: mockLoading, error: mockError } = useMockServiceTracking();
  const [serviceData, setServiceData] = useState<ServiceTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMessaging, setShowMessaging] = useState(false);

  // Combine loading states
  const isLoading = loading || mockLoading;
  const currentError = error || mockError;

  const handleTrackingSearch = () => {
    if (!trackingCode.trim()) {
      setError('Please enter a tracking code');
      setServiceData(null);
      return;
    }

    setLoading(true);
    setError(null);

    const found = mockTrackingData.find(
      service => service.tracking_code.toLowerCase() === trackingCode.toLowerCase()
    );

    if (found) {
      setServiceData(found);
      setError(null);
    } else {
      setServiceData(null);
      setError('Service not found. Please check your tracking code and try again.');
    }
    setLoading(false);
  };



  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Recibido':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Diagnóstico Inicial':
      case 'En Progreso':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'Esperando Repuestos':
        return <Wrench className="w-5 h-5 text-orange-500" />;
      case 'Completado':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recibido':
        return 'bg-blue-900 text-blue-200 border-blue-700';
      case 'Diagnóstico Inicial':
      case 'En Progreso':
        return 'bg-yellow-900 text-yellow-200 border-yellow-700';
      case 'Esperando Repuestos':
        return 'bg-orange-900 text-orange-200 border-orange-700';
      case 'Completado':
        return 'bg-green-900 text-green-200 border-green-700';
      default:
        return 'bg-gray-900 text-gray-200 border-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    // Assuming timeString is part of an ISO date string, e.g., "2025-09-01T10:00:00Z"
    return new Date(timeString).toLocaleTimeString('es-ES', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'Recibido': return 10;
      case 'Diagnóstico Inicial': return 30;
      case 'En Progreso': return 60;
      case 'Esperando Repuestos': return 40; // Can be a step back or parallel
      case 'Completado': return 100;
      default: return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-dark-primary min-h-screen text-white">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-impact text-white mb-2 uppercase">Rastreo de Servicio</h1>
            <p className="text-light-gray font-franklin">Consulta el estado de tu vehículo en tiempo real</p>
          </div>
          {serviceData && (
            <div className="flex-shrink-0">
              <RealTimeStatusUpdates 
                trackingCode={serviceData.tracking_code}
                onUpdateReceived={(update) => {
                  // Handle real-time updates here
                  console.log('New update received:', update);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Tracking Code Input */}
      <div className="bg-dark-secondary rounded-lg shadow-md border border-white/10 p-6 mb-8">
        <div className="max-w-md mx-auto">
          <label htmlFor="trackingCode" className="block text-sm font-franklin text-light-gray mb-2">
            Ingresa tu Código de Rastreo
          </label>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray w-4 h-4" />
              <input
                type="text"
                id="trackingCode"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                placeholder="TRACK-XXXXXX"
                className="w-full pl-10 pr-4 py-3 border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-mono bg-dark-primary text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackingSearch()}
              />
            </div>
            <button
              onClick={handleTrackingSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-accent-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Rastrear'
              )}
            </button>
          </div>
          {currentError && (
            <p className="mt-2 text-sm text-red-500 font-franklin">{currentError}</p>
          )}
        </div>
      </div>

      {/* Service Status Display */}
      {serviceData && (
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="bg-dark-secondary rounded-lg shadow-md border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-impact text-white uppercase">{serviceData.service_type}</h2>
                <p className="text-light-gray font-franklin">Código de Rastreo: {serviceData.tracking_code}</p>
              </div>
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(serviceData.current_status)}`}>
                {getStatusIcon(serviceData.current_status)}
                <span className="capitalize">{serviceData.current_status}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-light-gray font-franklin mb-2">
                <span>Progreso</span>
                <span>{getProgressPercentage(serviceData.current_status)}%</span>
              </div>
              <div className="w-full bg-dark-primary rounded-full h-2">
                <div 
                  className="bg-accent-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(serviceData.current_status)}%` }}
                ></div>
              </div>
            </div>

            {/* Service Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-impact text-white flex items-center uppercase">
                  <Car className="w-5 h-5 mr-2 text-accent-red" />
                  Información del Vehículo
                </h3>
                <div className="space-y-2 text-sm font-franklin">
                  <div className="flex justify-between">
                    <span className="text-light-gray">Vehículo:</span>
                    <span className="font-medium text-white">{serviceData.vehicle.year} {serviceData.vehicle.make} {serviceData.vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-gray">Placa:</span>
                    <span className="font-medium text-white">{serviceData.vehicle.license_plate}</span>
                  </div>
                </div>
              </div>

              {/* Estimated Completion */}
              <div className="space-y-4">
                <h3 className="text-lg font-impact text-white flex items-center uppercase">
                  <Calendar className="w-5 h-5 mr-2 text-accent-red" />
                  Detalles del Servicio
                </h3>
                <div className="space-y-2 text-sm font-franklin">
                  <div className="flex justify-between">
                    <span className="text-light-gray">Tipo de Servicio:</span>
                    <span className="font-medium text-white">{serviceData.service_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-gray">Descripción:</span>
                    <span className="font-medium text-white">{serviceData.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-gray">Fecha Estimada de Finalización:</span>
                    <span className="font-medium text-white">{formatDate(serviceData.estimated_completion)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status History */}
          <div className="bg-dark-secondary rounded-lg shadow-md border border-white/10 p-6">
            <h3 className="text-lg font-impact text-white flex items-center mb-4 uppercase">
              <Clock className="w-5 h-5 mr-2 text-accent-red" />
              Historial de Estado
            </h3>
            <div className="space-y-4">
              {serviceData.status_history.map((entry, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getStatusIcon(entry.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium capitalize text-white font-franklin">{entry.status}</span>
                      <span className="text-sm text-light-gray font-franklin">{formatDateTime(entry.timestamp)}</span>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-light-gray mt-1 font-franklin">{entry.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Message Section */}
          <div className="bg-dark-secondary rounded-lg shadow-md border border-white/10 p-6">
            <h3 className="text-lg font-impact text-white flex items-center mb-4 uppercase">
              <MessageSquare className="w-5 h-5 mr-2 text-accent-red" />
              Contacto y Mensajes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-impact text-white mb-2 uppercase">Información de Contacto</h4>
                <div className="space-y-2 text-sm font-franklin">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-light-gray" />
                    <span className="text-white">N/A</span> {/* Mock data doesn't have customer phone */}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-light-gray" />
                    <span className="text-white">N/A</span> {/* Mock data doesn't have customer email */}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-impact text-white mb-2 uppercase">¿Necesitas Ayuda?</h4>
                <p className="text-sm text-light-gray mb-3 font-franklin">
                  ¿Tienes preguntas sobre tu servicio? Envíanos un mensaje y te responderemos a la brevedad.
                </p>
                <button
                  onClick={() => setShowMessaging(!showMessaging)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-red text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-bold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{showMessaging ? 'Ocultar Mensajes' : 'Ver Mensajes'}</span>
                </button>
              </div>
            </div>

            {/* Customer Messaging System */}
            {showMessaging && (
              <div className="mt-6">
                <CustomerMessagingSystem
                  trackingCode={serviceData.tracking_code}
                  customerName="N/A"
                  customerEmail="N/A"
                  customerPhone="N/A"
                  serviceName={serviceData.service_type}
                  onClose={() => setShowMessaging(false)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help Section */}
      {!serviceData && !currentError && (
        <div className="bg-dark-secondary border border-white/10 rounded-lg p-6 text-center">
          <h3 className="text-lg font-impact text-white mb-2 uppercase">Cómo Rastrear Tu Servicio</h3>
          <p className="text-light-gray font-franklin mb-4">
            Ingresa el código de rastreo proporcionado cuando agendaste tu cita. 
            Sigue el formato: TRACK-XXXXXX
          </p>
          <div className="text-sm text-light-gray font-franklin">
            <p>• Revisa tu correo de confirmación de cita</p>
            <p>• Busca el código de rastreo en tu recibo</p>
            <p>• Contáctanos si no encuentras tu código de rastreo</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTrackingPortal;