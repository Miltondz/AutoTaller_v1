import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { WrenchIcon } from '../components/AutomotiveIcons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useServices } from '../hooks/useServices';
import { appointmentsApi } from '../api/appointments';
import { formatTime } from '../lib/utils';
import { Spinner } from '../components/Spinner';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { AutomotiveButton, AutomotiveCard, FormInput, FormTextarea } from '../components/AutomotiveForm';
import { useSiteContent } from '../hooks/useSiteContent';

const bookingSchema = z.object({
  client_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  client_email: z.string().email('Por favor ingresa una dirección de correo válida'),
  service_id: z.string().min(1, 'Por favor selecciona un servicio'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const { services, loading: servicesLoading } = useServices();
  const { content, loading: contentLoading } = useSiteContent();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId && services.length > 0) {
      setValue('service_id', serviceId);
    }
  }, [searchParams, services, setValue]);

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime('');
    if (date) {
      setLoadingSlots(true);
      try {
        const dateStr = date.toISOString().split('T')[0];
        const slots = await appointmentsApi.getAvailableSlots(dateStr);
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error loading available slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    } else {
      setAvailableSlots([]);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTime) {
      setBookingError('Por favor selecciona una fecha y hora para tu servicio.');
      return;
    }

    setSubmitting(true);
    setBookingError(null);

    try {
      await appointmentsApi.create({
        client_name: data.client_name,
        client_email: data.client_email,
        service_id: data.service_id,
        notes: data.notes,
        appointment_date: selectedDate.toISOString().split('T')[0],
        appointment_time: selectedTime,
      });
      setBookingSuccess(true);
      reset();
      setSelectedDate(undefined);
      setSelectedTime('');
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'No se pudo enviar la solicitud. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary p-4 sm:p-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <AutomotiveCard className="max-w-lg w-full text-center bg-dark-secondary">
            <div className="p-8 sm:p-10">
              <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-impact text-white mb-4 uppercase">{content.booking_success_title || '¡Solicitud Enviada!'}</h2>
              <p className="text-base sm:text-lg text-light-gray mb-8 font-franklin">
                {content.booking_success_msg || 'Gracias por confiar en nosotros. Hemos recibido tu solicitud y nos pondremos en contacto contigo dentro de 24 horas para confirmar los detalles de tu servicio.'}
              </p>
              <AutomotiveButton onClick={() => setBookingSuccess(false)} size="lg" className="bg-accent-red text-white hover:bg-red-700">Reservar Otro Servicio</AutomotiveButton>
            </div>
          </AutomotiveCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      <header className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-dark-primary text-white">
        <img src="/images/booking_hero.jpeg" alt="Mecánico trabajando en el motor de un vehículo" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary via-dark-primary/70 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-accent-red rounded-full shadow-md">
              <CalendarIcon className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-impact mb-4 tracking-tight uppercase">{content.booking_hero_title || 'Agenda tu Servicio Automotriz'}</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-light-gray max-w-3xl mx-auto font-fugaz">
            {content.booking_hero_subtitle || 'Reserva tu servicio automotriz en Falcón, Punto Fijo. ¡Cuida tu vehículo con los mejores!'}
          </p>
        </motion.div>
      </header>

      <main className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 sm:space-y-12">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              <AutomotiveCard className="bg-dark-secondary">
                <div className="p-6 border-b border-white/10"><h2 className="text-xl sm:text-2xl font-impact text-white flex items-center uppercase"><CalendarIcon className="w-6 h-6 mr-3 text-accent-red" />1. Selecciona la Fecha</h2></div>
                <div className="p-2 sm:p-4">
                  <DayPicker mode="single" selected={selectedDate} onSelect={handleDateSelect} disabled={{ before: new Date() }} className="mx-auto scale-90 sm:scale-100" classNames={{ 
                    root: 'text-white',
                    caption: 'text-accent-red',
                    day: 'hover:bg-accent-red/20 rounded-full',
                    day_selected: 'bg-accent-red text-white rounded-full', 
                    day_today: 'text-accent-red font-bold',
                    head: 'text-light-gray',
                    nav_button: 'text-white hover:bg-white/10 rounded-full',
                  }} />
                </div>
              </AutomotiveCard>
              <div className="space-y-6 sm:space-y-8">
                <AutomotiveCard className="bg-dark-secondary">
                  <div className="p-6 border-b border-white/10"><h2 className="text-xl sm:text-2xl font-impact text-white flex items-center uppercase"><Clock className="w-6 h-6 mr-3 text-accent-red" />2. Elige la Hora</h2></div>
                  <div className="p-6">
                    {!selectedDate ? <p className="text-light-gray text-center py-8 font-franklin">Selecciona una fecha para ver horarios.</p> : loadingSlots ? <div className="flex justify-center py-8"><Spinner /></div> : availableSlots.length === 0 ? <p className="text-light-gray text-center py-8 font-franklin">No hay horarios para esta fecha.</p> : <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                      {availableSlots.map(slot => <AutomotiveButton key={slot} type="button" variant={selectedTime === slot ? 'primary' : 'outline'} onClick={() => setSelectedTime(slot)} className={selectedTime === slot ? 'bg-accent-red text-white hover:bg-red-700' : 'border-white/10 text-white hover:bg-white/20'}>{formatTime(slot)}</AutomotiveButton>)}
                    </div>}
                  </div>
                </AutomotiveCard>
                <AutomotiveCard className="bg-dark-secondary">
                  <div className="p-6 border-b border-white/10"><h2 className="text-xl sm:text-2xl font-impact text-white flex items-center uppercase"><WrenchIcon className="w-6 h-6 mr-3 text-accent-red" />3. Escoge el Servicio</h2></div>
                  <div className="p-6">
                    {servicesLoading ? <div className="flex justify-center py-4"><Spinner /></div> : <div className="space-y-3">
                      {services.map(service => <label key={service.id} className={`flex items-center p-3 sm:p-4 border rounded-lg cursor-pointer transition-all ${errors.service_id ? 'border-danger-500' : 'border-white/10'} ${watch('service_id') === service.id ? 'bg-dark-primary border-accent-red' : 'hover:bg-white/10'}`}>
                        <input type="radio" value={service.id} {...register('service_id')} className="mr-3 sm:mr-4 text-accent-red focus:ring-accent-red bg-dark-secondary border-light-gray" />
                        <div className="flex-1">
                          <div className="font-impact text-white uppercase">{service.name}</div>
                          <div className="text-sm text-light-gray font-franklin">{service.price}$ &bull; {service.estimated_time} min</div>
                        </div>
                      </label>)}
                      {errors.service_id && <p className="text-danger-600 text-sm mt-2">{errors.service_id.message}</p>}
                    </div>}
                  </div>
                </AutomotiveCard>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}>
              <AutomotiveCard className="bg-dark-secondary">
                <div className="p-6 border-b border-white/10"><h2 className="text-xl sm:text-2xl font-impact text-white flex items-center uppercase"><User className="w-6 h-6 mr-3 text-accent-red" />4. Tu Información</h2></div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <FormInput label="Nombre Completo" required {...register('client_name')} error={errors.client_name?.message} placeholder="Tu nombre y apellido" />
                    </div>
                    <div>
                      <FormInput label="Correo Electrónico" required {...register('client_email')} error={errors.client_email?.message} placeholder="tu@email.com" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <FormTextarea label="Notas Adicionales (Opcional)" {...register('notes')} rows={4} placeholder="Cualquier detalle que debamos saber sobre tu vehículo..."></FormTextarea>
                  </div>
                </div>
              </AutomotiveCard>
            </motion.div>

            <AnimatePresence>
              {bookingError && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 bg-danger-600/20 border border-danger-600 rounded-lg flex items-center text-danger-600"><AlertCircle className="w-5 h-5 mr-3" />{bookingError}</motion.div>}
            </AnimatePresence>

            <div className="text-center pt-4 sm:pt-6">
              <AutomotiveButton type="submit" disabled={submitting || !selectedDate || !selectedTime} size="lg" className="w-full max-w-md mx-auto bg-accent-red text-white hover:bg-red-700" loading={submitting}>
                Confirmar y Enviar Solicitud
              </AutomotiveButton>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}