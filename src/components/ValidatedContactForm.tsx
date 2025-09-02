import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { validateField, validateForm, FieldValidationRules } from '../utils/formValidation';

interface ContactFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicle: string;
  serviceType: string;
  problemDescription: string;
}

interface ValidatedContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export const ValidatedContactForm: React.FC<ValidatedContactFormProps> = ({
  onSubmit,
  className = ''
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    vehicle: '',
    serviceType: '',
    problemDescription: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate field on blur
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  const validateFormData = (): boolean => {
    const result = validateForm(formData);
    setErrors(result.errors);
    return result.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    if (!validateFormData()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      setSubmitSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          vehicle: '',
          serviceType: '',
          problemDescription: ''
        });
        setTouched({});
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (field: keyof ContactFormData) => {
    const baseClass = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors";
    const hasError = touched[field] && errors[field];
    const isValid = touched[field] && !errors[field] && formData[field];
    
    if (hasError) {
      return `${baseClass} border-red-300 bg-red-50`;
    } else if (isValid) {
      return `${baseClass} border-green-300 bg-green-50`;
    }
    return `${baseClass} border-slate-300`;
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 rounded-lg border border-green-200"
      >
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          ¡Cotización Enviada!
        </h3>
        <p className="text-green-700">
          Hemos recibido tu solicitud. Te contactaremos pronto con una cotización detallada.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-slate-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            onBlur={() => handleBlur('customerName')}
            className={getInputClassName('customerName')}
            placeholder="Tu nombre completo"
            disabled={isSubmitting}
          />
          {touched.customerName && errors.customerName && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.customerName}
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-slate-700 mb-2">
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            onBlur={() => handleBlur('customerEmail')}
            className={getInputClassName('customerEmail')}
            placeholder="tu@email.com"
            disabled={isSubmitting}
          />
          {touched.customerEmail && errors.customerEmail && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.customerEmail}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-slate-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
            onBlur={() => handleBlur('customerPhone')}
            className={getInputClassName('customerPhone')}
            placeholder="(555) 123-4567"
            disabled={isSubmitting}
          />
          {touched.customerPhone && errors.customerPhone && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.customerPhone}
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium text-slate-700 mb-2">
            Vehículo
          </label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            value={formData.vehicle}
            onChange={(e) => handleInputChange('vehicle', e.target.value)}
            onBlur={() => handleBlur('vehicle')}
            className={getInputClassName('vehicle')}
            placeholder="Ej: Toyota Camry 2020"
            disabled={isSubmitting}
          />
          {touched.vehicle && errors.vehicle && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.vehicle}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700 mb-2">
          Tipo de Servicio *
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={(e) => handleInputChange('serviceType', e.target.value)}
          onBlur={() => handleBlur('serviceType')}
          className={getInputClassName('serviceType')}
          disabled={isSubmitting}
        >
          <option value="">Selecciona un servicio</option>
          <option value="maintenance">Mantenimiento preventivo</option>
          <option value="repair">Reparación</option>
          <option value="diagnostic">Diagnóstico</option>
          <option value="inspection">Inspección</option>
          <option value="emergency">Servicio de emergencia</option>
          <option value="other">Otro</option>
        </select>
        {touched.serviceType && errors.serviceType && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.serviceType}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="problemDescription" className="block text-sm font-medium text-slate-700 mb-2">
          Descripción del Problema o Servicio Requerido *
        </label>
        <textarea
          id="problemDescription"
          name="problemDescription"
          rows={6}
          value={formData.problemDescription}
          onChange={(e) => handleInputChange('problemDescription', e.target.value)}
          onBlur={() => handleBlur('problemDescription')}
          className={getInputClassName('problemDescription')}
          placeholder="Describe el problema de tu vehículo o el servicio que necesitas..."
          disabled={isSubmitting}
        />
        {touched.problemDescription && errors.problemDescription && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.problemDescription}
          </div>
        )}
        <div className="mt-1 text-sm text-slate-500">
          {formData.problemDescription.length}/1000 caracteres
        </div>
      </div>
      
      <Button 
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Enviando...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Send className="w-4 h-4 mr-2" />
            Solicitar Cotización
          </div>
        )}
      </Button>
      
      <div className="text-sm text-slate-600 text-center">
        * Campos obligatorios
      </div>
    </motion.form>
  );
};

export default ValidatedContactForm;