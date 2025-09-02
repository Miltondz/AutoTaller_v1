import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Car, 
  Wrench, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  Share2,
  Copy,
  QrCode,
  AlertCircle,
  Star
} from 'lucide-react';
import { IndustrialButton, IndustrialAlert, IndustrialBadge } from './IndustrialComponents';
import { trackingSystem } from '../utils/serviceTrackingSystem';

/**
 * Enhanced Booking Confirmation Component
 * Shows detailed confirmation with tracking code and service information
 */

interface BookingData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  servicePrice: number;
  estimatedDuration: number;
  includesParts: boolean;
  appointmentDate: string;
  appointmentTime: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    mileage?: number;
  };
  specialRequests?: string;
  trackingCode?: string;
}

interface EnhancedBookingConfirmationProps {
  bookingData: BookingData;
  onClose?: () => void;
  onNewBooking?: () => void;
  showActions?: boolean;
}

export function EnhancedBookingConfirmation({
  bookingData,
  onClose,
  onNewBooking,
  showActions = true,
}: EnhancedBookingConfirmationProps) {
  const [trackingCode, setTrackingCode] = useState(bookingData.trackingCode || '');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // Generate tracking code if not provided
    if (!trackingCode) {
      const newTrackingCode = trackingSystem.registerTrackingCode({
        appointmentId: bookingData.id,
        customerId: `customer_${Date.now()}`,
        serviceType: bookingData.serviceName,
        vehicleInfo: `${bookingData.vehicleInfo.year} ${bookingData.vehicleInfo.make} ${bookingData.vehicleInfo.model}`,
        status: 'scheduled',
        estimatedCompletion: new Date(
          new Date(`${bookingData.appointmentDate} ${bookingData.appointmentTime}`).getTime() + 
          bookingData.estimatedDuration * 60 * 1000
        ).toISOString(),
      });
      setTrackingCode(newTrackingCode);
    }
  }, [bookingData, trackingCode]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: string): string => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEstimatedCompletion = (): string => {
    const appointmentDateTime = new Date(`${bookingData.appointmentDate} ${bookingData.appointmentTime}`);
    const completionTime = new Date(appointmentDateTime.getTime() + bookingData.estimatedDuration * 60 * 1000);
    return completionTime.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const copyTrackingCode = async () => {
    try {
      await navigator.clipboard.writeText(trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const shareBooking = async () => {
    const shareData = {
      title: 'Confirmación de Servicio Automotriz',
      text: `Mi servicio está programado para el ${formatDate(bookingData.appointmentDate)} a las ${formatTime(bookingData.appointmentTime)}. Código de seguimiento: ${trackingCode}`,
      url: `${window.location.origin}/rastrear?code=${trackingCode}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text + '\n' + shareData.url);
        alert('Información copiada al portapapeles');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const downloadConfirmation = () => {
    const confirmationText = `
CONFIRMACIÓN DE SERVICIO AUTOMOTRIZ
====================================

Código de Seguimiento: ${trackingCode}
Cliente: ${bookingData.customerName}
Email: ${bookingData.customerEmail}
Teléfono: ${bookingData.customerPhone}

SERVICIO
--------
Servicio: ${bookingData.serviceName}
Precio: ${formatPrice(bookingData.servicePrice)}
Duración Estimada: ${bookingData.estimatedDuration} minutos
Incluye Repuestos: ${bookingData.includesParts ? 'Sí' : 'No'}

CITA
----
Fecha: ${formatDate(bookingData.appointmentDate)}
Hora: ${formatTime(bookingData.appointmentTime)}
Finalización Estimada: ${getEstimatedCompletion()}

VEHÍCULO
--------
Vehículo: ${bookingData.vehicleInfo.year} ${bookingData.vehicleInfo.make} ${bookingData.vehicleInfo.model}
Placa: ${bookingData.vehicleInfo.licensePlate}
${bookingData.vehicleInfo.mileage ? `Kilometraje: ${bookingData.vehicleInfo.mileage} km` : ''}

${bookingData.specialRequests ? `SOLICITUDES ESPECIALES\n--------------------\n${bookingData.specialRequests}\n` : ''}

CONTACTO DEL TALLER
------------------
Teléfono: +58 269 123-4567
Email: info@tallermecanicofalcon.com
Dirección: Av. Principal, Punto Fijo, Estado Falcón

Para rastrear tu servicio visita:
${window.location.origin}/rastrear

Generado el: ${new Date().toLocaleString('es-ES')}
    `;

    const blob = new Blob([confirmationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `confirmacion-servicio-${trackingCode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-industrial border border-primary-200 overflow-hidden"
      >
        {/* Success Header */}
        <div className="bg-gradient-to-r from-success-600 to-success-700 text-white p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex justify-center mb-4"
          >
            <div className="p-4 bg-white/20 rounded-full">
              <CheckCircle className="w-16 h-16" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 heading-automotive">
            ¡Reserva Confirmada!
          </h1>
          <p className="text-success-100 text-lg">
            Tu servicio automotriz ha sido programado exitosamente
          </p>
        </div>

        {/* Tracking Code Section */}
        <div className="bg-gradient-to-r from-accent-50 to-secondary-50 p-6 border-b border-primary-200">
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary-800 mb-2 heading-automotive">
              Código de Seguimiento
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-white px-6 py-3 rounded-lg shadow-industrial border-2 border-accent-200">
                <span className="text-2xl font-mono font-bold text-accent-600">
                  {trackingCode}
                </span>
              </div>
              <div className="flex gap-2">
                <IndustrialButton
                  variant="outline"
                  size="sm"
                  onClick={copyTrackingCode}
                  icon={<Copy className="w-4 h-4" />}
                >
                  {copied ? 'Copiado!' : 'Copiar'}
                </IndustrialButton>
                <IndustrialButton
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQR(!showQR)}
                  icon={<QrCode className="w-4 h-4" />}
                >
                  QR
                </IndustrialButton>
              </div>
            </div>
            <p className="text-sm text-primary-600">
              Guarda este código para rastrear el estado de tu servicio
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Appointment Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-primary-800 heading-automotive flex items-center gap-2">
                <Wrench className="w-6 h-6 text-accent-600" />
                Detalles del Servicio
              </h3>
              
              <div className="bg-primary-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-primary-600 font-medium">Servicio:</span>
                  <span className="font-bold text-primary-800 text-right">{bookingData.serviceName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-medium">Precio:</span>
                  <span className="text-2xl font-bold text-accent-600">
                    {formatPrice(bookingData.servicePrice)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-medium">Duración:</span>
                  <span className="font-semibold text-primary-800">
                    {bookingData.estimatedDuration} minutos
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-medium">Repuestos:</span>
                  <IndustrialBadge
                    variant={bookingData.includesParts ? 'success' : 'warning'}
                    size="sm"
                  >
                    {bookingData.includesParts ? 'Incluidos' : 'Adicionales'}
                  </IndustrialBadge>
                </div>
              </div>
            </div>

            {/* Appointment Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-primary-800 heading-automotive flex items-center gap-2">
                <Calendar className="w-6 h-6 text-secondary-600" />
                Información de la Cita
              </h3>
              
              <div className="bg-secondary-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-secondary-700 font-medium">Fecha:</span>
                  <span className="font-bold text-secondary-800 text-right">
                    {formatDate(bookingData.appointmentDate)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700 font-medium">Hora de Inicio:</span>
                  <span className="font-bold text-secondary-800">
                    {formatTime(bookingData.appointmentTime)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700 font-medium">Finalización Estimada:</span>
                  <span className="font-bold text-secondary-800">
                    {getEstimatedCompletion()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <h3 className="text-xl font-bold text-primary-800 heading-automotive flex items-center gap-2 mb-6">
              <Car className="w-6 h-6 text-success-600" />
              Información del Vehículo
            </h3>
            
            <div className="bg-success-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-success-700 font-medium">Vehículo:</span>
                    <span className="font-bold text-success-800">
                      {bookingData.vehicleInfo.year} {bookingData.vehicleInfo.make} {bookingData.vehicleInfo.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-success-700 font-medium">Placa:</span>
                    <span className="font-bold text-success-800 font-mono">
                      {bookingData.vehicleInfo.licensePlate}
                    </span>
                  </div>
                </div>
                
                {bookingData.vehicleInfo.mileage && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-success-700 font-medium">Kilometraje:</span>
                      <span className="font-bold text-success-800">
                        {bookingData.vehicleInfo.mileage.toLocaleString()} km
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-xl font-bold text-primary-800 heading-automotive flex items-center gap-2 mb-6">
              <Mail className="w-6 h-6 text-primary-600" />
              Información de Contacto
            </h3>
            
            <div className="bg-primary-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-primary-600 font-medium">Nombre:</span>
                    <span className="font-bold text-primary-800">{bookingData.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-600 font-medium">Email:</span>
                    <span className="font-medium text-primary-800">{bookingData.customerEmail}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-primary-600 font-medium">Teléfono:</span>
                    <span className="font-medium text-primary-800">{bookingData.customerPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {bookingData.specialRequests && (
            <div>
              <h3 className="text-xl font-bold text-primary-800 heading-automotive flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-warning-600" />
                Solicitudes Especiales
              </h3>
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <p className="text-warning-800">{bookingData.specialRequests}</p>
              </div>
            </div>
          )}

          {/* Important Information */}
          <IndustrialAlert
            variant="info"
            title="Información Importante"
            icon={<AlertCircle className="w-5 h-5" />}
          >
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Llega 15 minutos antes de tu cita programada</li>
              <li>Trae las llaves del vehículo y documentos de identificación</li>
              <li>Si necesitas cancelar o reprogramar, contáctanos con al menos 24 horas de anticipación</li>
              <li>Puedes rastrear el progreso de tu servicio usando el código proporcionado</li>
              <li>Recibirás notificaciones por email sobre el estado de tu servicio</li>
            </ul>
          </IndustrialAlert>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4 heading-automotive flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Información del Taller
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent-400" />
                  <span>+58 269 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent-400" />
                  <span>info@tallermecanicofalcon.com</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <span>Av. Principal, Punto Fijo, Estado Falcón</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent-400" />
                  <span>Lun-Vie: 8:00 AM - 6:00 PM, Sáb: 8:00 AM - 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="p-6 border-t border-primary-200 bg-primary-50">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <IndustrialButton
                onClick={downloadConfirmation}
                variant="primary"
                icon={<Download className="w-5 h-5" />}
              >
                Descargar Confirmación
              </IndustrialButton>
              
              <IndustrialButton
                onClick={shareBooking}
                variant="secondary"
                icon={<Share2 className="w-5 h-5" />}
              >
                Compartir
              </IndustrialButton>
              
              {onNewBooking && (
                <IndustrialButton
                  onClick={onNewBooking}
                  variant="outline"
                  icon={<Calendar className="w-5 h-5" />}
                >
                  Nueva Reserva
                </IndustrialButton>
              )}
              
              {onClose && (
                <IndustrialButton
                  onClick={onClose}
                  variant="outline"
                >
                  Cerrar
                </IndustrialButton>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Rating Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 bg-white rounded-lg shadow-industrial border border-primary-200 p-6 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-warning-100 rounded-full">
            <Star className="w-8 h-8 text-warning-600" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-primary-800 mb-2 heading-automotive">
          ¿Te Gustó Nuestro Servicio de Reservas?
        </h3>
        <p className="text-primary-600 mb-4">
          Tu opinión nos ayuda a mejorar. Después de tu servicio, te invitaremos a dejarnos una reseña.
        </p>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-6 h-6 text-warning-400 fill-current cursor-pointer hover:text-warning-500 transition-colors" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}