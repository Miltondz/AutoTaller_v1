import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Car, 
  User, 
  Phone, 
  Mail, 
  Copy, 
  Download,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { 
  AutomotiveButton, 
  AutomotiveCard, 
  Alert,
  StatusBadge
} from './AutomotiveForm';
import { AutomotiveAppointment, AutomotiveService } from '../types/automotive';
import { TrackingCodeGenerator } from '../utils/trackingCodeGenerator';
import { TrackingCodeService } from '../services/trackingCodeService';
import { formatDate, formatTime, formatPrice } from '../lib/utils';

interface BookingConfirmationProps {
  appointment: AutomotiveAppointment;
  service: AutomotiveService;
  onTrackService?: () => void;
  onContactShop?: () => void;
  onDownloadConfirmation?: () => void;
  className?: string;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  appointment,
  service,
  onTrackService,
  onContactShop,
  onDownloadConfirmation,
  className = ''
}) => {
  const copyTrackingCode = async () => {
    try {
      await navigator.clipboard.writeText(appointment.service_tracking_code);
      // Show success feedback
      const button = document.querySelector('[data-copy-button]') as HTMLElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy tracking code:', err);
    }
  };

  const estimatedCompletionTime = new Date(appointment.appointment_date);
  estimatedCompletionTime.setMinutes(
    estimatedCompletionTime.getMinutes() + service.estimated_time
  );

  const confirmationItems = [
    {
      icon: <CheckCircle className="w-5 h-5 text-success-600" />,
      title: 'Cita Confirmada',
      description: 'Tu servicio ha sido programado exitosamente'
    },
    {
      icon: <Calendar className="w-5 h-5 text-secondary-600" />,
      title: 'Fecha Programada',
      description: formatDate(appointment.appointment_date)
    },
    {
      icon: <Clock className="w-5 h-5 text-accent-600" />,
      title: 'Hora de Llegada',
      description: formatTime(appointment.appointment_time)
    },
    {
      icon: <Clock className="w-5 h-5 text-primary-600" />,
      title: 'Finalización Estimada',
      description: estimatedCompletionTime.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`max-w-4xl mx-auto space-y-6 ${className}`}
    >
      {/* Success Header */}
      <AutomotiveCard className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-success-600" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-primary-800 mb-4 heading-industrial">
          ¡Cita Confirmada!
        </h1>
        
        <p className="text-lg text-primary-600 mb-6 text-industrial">
          Tu servicio automotriz ha sido programado exitosamente. 
          Guarda tu código de seguimiento para rastrear el progreso.
        </p>

        {/* Tracking Code Display */}
        <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-6 mb-6">
          <div className="text-sm font-medium text-accent-700 mb-2">
            Código de Seguimiento
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="text-2xl font-bold text-accent-800 font-mono tracking-wider">
              {TrackingCodeGenerator.formatForDisplay(appointment.service_tracking_code)}
            </div>
            <AutomotiveButton
              variant="outline"
              size="sm"
              onClick={copyTrackingCode}
              icon={<Copy className="w-4 h-4" />}
              data-copy-button
            >
              Copiar
            </AutomotiveButton>
          </div>
          <div className="text-sm text-accent-600 mt-2">
            Usa este código para rastrear tu servicio en cualquier momento
          </div>
        </div>

        <StatusBadge status={appointment.status} size="lg" />
      </AutomotiveCard>

      {/* Confirmation Details Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {confirmationItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <AutomotiveCard className="p-4 text-center h-full">
              <div className="flex justify-center mb-3">
                {item.icon}
              </div>
              <h3 className="font-semibold text-primary-800 mb-2 heading-industrial">
                {item.title}
              </h3>
              <p className="text-primary-600 text-sm text-industrial">
                {item.description}
              </p>
            </AutomotiveCard>
          </motion.div>
        ))}
      </div>

      {/* Service and Vehicle Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Service Information */}
        <AutomotiveCard className="p-6">
          <h2 className="text-xl font-bold text-primary-800 mb-4 heading-industrial">
            Detalles del Servicio
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary-800">{service.name}</h3>
                <p className="text-primary-600 text-sm mt-1">{service.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-accent-600">
                  {formatPrice(service.price)}
                </div>
                <div className="text-sm text-primary-500">
                  {service.estimated_time} min
                </div>
              </div>
            </div>
            
            <div className="border-t border-primary-200 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-600">Categoría:</span>
                <span className="font-medium text-primary-800 capitalize">
                  {service.category}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-primary-600">Incluye repuestos:</span>
                <span className={`font-medium ${service.include_parts ? 'text-success-600' : 'text-warning-600'}`}>
                  {service.include_parts ? 'Sí' : 'Cotización adicional'}
                </span>
              </div>
            </div>
          </div>
        </AutomotiveCard>

        {/* Vehicle and Customer Information */}
        <AutomotiveCard className="p-6">
          <h2 className="text-xl font-bold text-primary-800 mb-4 heading-industrial">
            Información de la Cita
          </h2>
          
          {/* Vehicle Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-primary-800 flex items-center gap-2 mb-2">
                <Car className="w-4 h-4" />
                Vehículo
              </h3>
              <div className="bg-primary-50 p-3 rounded-lg">
                <div className="font-medium text-primary-800">
                  {appointment.vehicle_details.make} {appointment.vehicle_details.model} ({appointment.vehicle_details.year})
                </div>
                <div className="text-sm text-primary-600 mt-1">
                  Placa: {appointment.vehicle_details.license_plate} • 
                  Kilometraje: {appointment.vehicle_details.mileage.toLocaleString()} km
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <h3 className="font-semibold text-primary-800 flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Datos de Contacto
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary-500" />
                  <span className="text-primary-800">{appointment.customer_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary-500" />
                  <span className="text-primary-800">{appointment.customer_email}</span>
                </div>
                {appointment.customer_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary-500" />
                    <span className="text-primary-800">{appointment.customer_phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AutomotiveCard>
      </div>

      {/* Important Information */}
      <Alert type="info">
        <div className="space-y-2">
          <div className="font-semibold">Información Importante:</div>
          <ul className="text-sm space-y-1 ml-4">
            <li>• Llega 15 minutos antes de tu cita programada</li>
            <li>• Trae las llaves del vehículo y documentos de identificación</li>
            <li>• Si necesitas reprogramar, contáctanos con al menos 24 horas de anticipación</li>
            <li>• Puedes rastrear el progreso de tu servicio usando el código de seguimiento</li>
          </ul>
        </div>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onTrackService && (
          <AutomotiveButton
            onClick={onTrackService}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Rastrear Servicio
          </AutomotiveButton>
        )}
        
        {onContactShop && (
          <AutomotiveButton
            variant="secondary"
            onClick={onContactShop}
            icon={<MessageSquare className="w-4 h-4" />}
          >
            Contactar Taller
          </AutomotiveButton>
        )}
        
        {onDownloadConfirmation && (
          <AutomotiveButton
            variant="outline"
            onClick={onDownloadConfirmation}
            icon={<Download className="w-4 h-4" />}
          >
            Descargar Confirmación
          </AutomotiveButton>
        )}
      </div>

      {/* Email Template Preview (Hidden, for future email integration) */}
      <div className="hidden">
        <EmailConfirmationTemplate 
          appointment={appointment}
          service={service}
        />
      </div>
    </motion.div>
  );
};

// Email template component for future email integration
interface EmailConfirmationTemplateProps {
  appointment: AutomotiveAppointment;
  service: AutomotiveService;
}

const EmailConfirmationTemplate: React.FC<EmailConfirmationTemplateProps> = ({
  appointment,
  service
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#f97316', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>AutoTaller Pro</h1>
        <h2>Confirmación de Cita</h2>
      </div>
      
      <div style={{ padding: '20px' }}>
        <p>Estimado/a {appointment.customer_name},</p>
        
        <p>Su cita para el servicio <strong>{service.name}</strong> ha sido confirmada.</p>
        
        <div style={{ backgroundColor: '#f8fafc', padding: '15px', margin: '20px 0', borderRadius: '8px' }}>
          <h3>Detalles de la Cita:</h3>
          <p><strong>Código de Seguimiento:</strong> {appointment.service_tracking_code}</p>
          <p><strong>Fecha:</strong> {formatDate(appointment.appointment_date)}</p>
          <p><strong>Hora:</strong> {formatTime(appointment.appointment_time)}</p>
          <p><strong>Vehículo:</strong> {appointment.vehicle_details.make} {appointment.vehicle_details.model} ({appointment.vehicle_details.year})</p>
          <p><strong>Placa:</strong> {appointment.vehicle_details.license_plate}</p>
        </div>
        
        <p>Puede rastrear el progreso de su servicio en cualquier momento usando su código de seguimiento.</p>
        
        <p>Gracias por confiar en AutoTaller Pro.</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;