import React from 'react';
import { Clock, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import { WrenchIcon, GearIcon } from '../components/AutomotiveIcons';
import { AutomotiveButton, AutomotiveCard } from '../components/AutomotiveForm';
import { useServices } from '../hooks/useServices';
import { Spinner } from '../components/Spinner';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.section>
);

export function ServicesPage() {
  const { services, loading, error } = useServices();
  const { content, loading: contentLoading } = useSiteContent();

  if (loading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <div className="text-center p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Error al Cargar Servicios</h2>
          <p className="text-light-gray mb-6">{error}</p>
          <AutomotiveButton onClick={() => window.location.reload()}>
            Intentar de Nuevo
          </AutomotiveButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-dark-primary text-white">
        <img src="/images/placeholders/serv_placeholder.jpg" alt="Taller mecánico con herramientas profesionales y de fondo un vehículo siendo reparado" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary via-dark-primary/70 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex justify-center mb-6">
            <div className="p-4 bg-accent-red rounded-full shadow-md">
              <WrenchIcon className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl font-impact mb-4 tracking-tight uppercase"
          >
            {content.services_hero_title || 'Servicios Automotrices Profesionales'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl text-light-gray max-w-3xl mx-auto font-fugaz"
          >
            {content.services_hero_subtitle || 'Ofrecemos servicios automotrices especializados en Falcón, Punto Fijo. Encuentra el servicio perfecto para tu vehículo.'}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AutomotiveCard variant="service" hover className="group h-full flex flex-col bg-dark-secondary">
                  <div className="relative h-56 overflow-hidden rounded-t-xl">
                    <img
                      src={service.image_urls?.[0] || '/images/placeholders/serv_placeholder.jpg'}
                      alt={`Servicio de ${service.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-accent-red text-white text-xs font-bold rounded-full shadow-md">
                      {service.category || 'SERVICIO'}
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-dark-secondary/90 backdrop-blur-sm text-white text-xs font-franklin rounded-full">
                      {service.estimated_time} min
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-impact text-white mb-3 uppercase group-hover:text-accent-red transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-light-gray mb-4 font-franklin leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="text-2xl font-bold text-accent-red">
                        {formatPrice(service.price)}
                        {!service.include_parts && (
                          <span className="text-sm font-franklin text-light-gray block">+ repuestos</span>
                        )}
                      </div>
                      <Link to={`/reservar?service=${service.id}`}>
                        <AutomotiveButton className="bg-accent-red text-white hover:bg-red-700" size="sm">
                          Agendar
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </AutomotiveButton>
                      </Link>
                    </div>
                  </div>
                </AutomotiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Additional Info Section */}
      <Section className="py-16 sm:py-24 bg-dark-primary px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-accent-red rounded-full shadow-md">
                <GearIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-impact text-white mb-4 uppercase">
              {content.services_features_title || 'Todo lo que tu Vehículo Necesita'}
            </h2>
            <p className="text-lg sm:text-xl text-light-gray max-w-3xl mx-auto font-franklin">
              {content.services_features_subtitle || 'Nuestros servicios incluyen todo para el cuidado de tu vehículo, con la garantía y calidad que nos caracteriza.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 text-white">
            <div className="text-center p-6 bg-dark-secondary rounded-xl">
              <div className="bg-accent-red w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                <WrenchIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl font-impact uppercase mb-2">
                {content.services_f1_title || 'Servicio Personalizado'}
              </h3>
              <p className="text-light-gray font-franklin">
                {content.services_f1_text || 'Diagnósticos y reparaciones adaptadas a las necesidades específicas de tu vehículo para un rendimiento óptimo.'}
              </p>
            </div>
            <div className="text-center p-6 bg-dark-secondary rounded-xl">
              <div className="bg-accent-red w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl font-impact uppercase mb-2">
                {content.services_f2_title || 'Horarios Convenientes'}
              </h3>
              <p className="text-light-gray font-franklin">
                {content.services_f2_text || 'Agenda tu servicio en horarios que se ajusten a tu rutina, incluyendo tardes y fines de semana.'}
              </p>
            </div>
            <div className="text-center p-6 bg-dark-secondary rounded-xl">
              <div className="bg-accent-red w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl font-impact uppercase mb-2">
                {content.services_f3_title || 'Repuestos de Calidad'}
              </h3>
              <p className="text-light-gray font-franklin">
                {content.services_f3_text || 'Utilizamos repuestos originales y de alta calidad, con garantía incluida en todos nuestros servicios.'}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <section className="py-24 bg-dark-secondary px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl font-impact mb-4 uppercase">
              {content.services_cta_title || '¿Listo para Cuidar tu Vehículo?'}
            </h2>
            <p className="text-lg sm:text-xl mb-10 text-light-gray max-w-2xl mx-auto font-franklin">
              {content.services_cta_subtitle || 'No esperes más para darle a tu vehículo el mantenimiento que merece. Agenda tu servicio y mantén tu auto en perfectas condiciones.'}
            </p>
            <Link to="/reservar">
              <AutomotiveButton variant="primary" size="lg" className="bg-accent-red text-white hover:bg-red-700">
                Agendar mi Servicio Ahora
                <Calendar className="w-5 h-5 ml-2" />
              </AutomotiveButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}