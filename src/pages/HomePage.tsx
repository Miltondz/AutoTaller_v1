import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Star, Search } from 'lucide-react';
// Removed unused imports - using AutomotiveButton and AutomotiveCard instead
import { useServices } from '../hooks/useServices';
import { useMockAutomotiveTestimonials } from '../hooks/useMockAutomotiveTestimonials';
import { useFeaturedMedia } from '../hooks/useMediaGallery';
import { useSiteContent } from '../hooks/useSiteContent';
import { formatPrice } from '../lib/utils';
import { BlogCarousel } from '../components/BlogCarousel';
import { Spinner } from '../components/Spinner';
import { motion } from 'framer-motion';
import { WrenchIcon, GearIcon, CarIcon } from '../components/AutomotiveIcons';
import { AutomotiveButton, AutomotiveCard } from '../components/AutomotiveForm';

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

export function HomePage() {
  const { services, loading: servicesLoading } = useServices();
  const { testimonials, loading: testimonialsLoading } = useMockAutomotiveTestimonials();
  const { featuredItems, loading: mediaLoading } = useFeaturedMedia();
  const { content, loading: contentLoading } = useSiteContent();

  const featuredServices = services.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);
  const featuredPhotos = featuredItems.filter(item => item.is_featured && item.media_type === 'photo').slice(0, 2);

  if (contentLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Enhanced Automotive Hero Section */}
      <section
        className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-dark-primary overflow-hidden"
        style={{
          backgroundImage: 'url(/images/main_header.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/90 via-dark-primary/70 to-dark-primary/50"></div>
        
        {/* Floating Automotive Elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <GearIcon className="w-32 h-32 text-white animate-spin" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <WrenchIcon className="w-24 h-24 text-white transform rotate-45" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Certifications Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex justify-center mb-8"
          >
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-light-gray font-franklin">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                CERTIFICADO ASE
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                20+ AÑOS EXPERIENCIA
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                TODAS LAS MARCAS
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                GARANTÍA TOTAL
              </span>
            </div>
          </motion.div>

          <div className="text-center text-white">
            {/* Enhanced Hero Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="p-6 bg-accent-red rounded-full shadow-md">
                  <WrenchIcon className="w-20 h-20 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-dark-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                  PRO
                </div>
              </div>
            </motion.div>

            {/* Enhanced Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl md:text-7xl font-impact mb-6 tracking-tight uppercase"
            >
              <span className="block text-accent-red">TALLER MECÁNICO</span>
              <span className="block text-white">PROFESIONAL</span>
            </motion.h1>

            {/* Enhanced Subtitle with Value Propositions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mb-10"
            >
              <p className="text-xl sm:text-2xl md:text-3xl mb-6 text-light-gray max-w-4xl mx-auto font-fugaz">
                {content.home_hero_subtitle || 'Servicios automotrices de excelencia en Punto Fijo, Estado Falcón'}
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-light-gray">
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-dark-secondary rounded-lg">
                    <GearIcon className="w-6 h-6 text-accent-red" />
                  </div>
                  <span className="text-sm sm:text-base font-franklin">Diagnóstico Computarizado</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-dark-secondary rounded-lg">
                    <CarIcon className="w-6 h-6 text-accent-red" />
                  </div>
                  <span className="text-sm sm:text-base font-franklin">Todas las Marcas</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-dark-secondary rounded-lg">
                    <WrenchIcon className="w-6 h-6 text-accent-red" />
                  </div>
                  <span className="text-sm sm:text-base font-franklin">Repuestos Originales</span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Call-to-Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link to="/reservar">
                <AutomotiveButton 
                  size="lg" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 bg-accent-red text-white"
                  icon={<Calendar className="w-6 h-6" />}
                >
                  AGENDA TU SERVICIO
                </AutomotiveButton>
              </Link>
              <Link to="/servicios">
                <AutomotiveButton 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-dark-secondary border-2 border-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  VER SERVICIOS
                </AutomotiveButton>
              </Link>
              <Link to="/rastrear">
                <AutomotiveButton 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-dark-secondary text-white hover:bg-white/20"
                  icon={<Search className="w-6 h-6" />}
                >
                  RASTREAR SERVICIO
                </AutomotiveButton>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent-red mb-1">500+</div>
                <div className="text-xs sm:text-sm text-light-gray uppercase tracking-wide font-franklin">Vehículos Reparados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent-red mb-1">20+</div>
                <div className="text-xs sm:text-sm text-light-gray uppercase tracking-wide font-franklin">Años Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent-red mb-1">98%</div>
                <div className="text-xs sm:text-sm text-light-gray uppercase tracking-wide font-franklin">Satisfacción Cliente</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent-red mb-1">24h</div>
                <div className="text-xs sm:text-sm text-light-gray uppercase tracking-wide font-franklin">Servicio Express</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced About Preview Section with Certifications */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-dark-secondary rounded-lg">
                  <WrenchIcon className="w-6 h-6 text-accent-red" />
                </div>
                <span className="text-accent-red font-franklin text-sm uppercase tracking-wide">Taller Certificado</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-impact text-white mb-6 uppercase">
                {content.home_about_title || 'Experiencia Automotriz de Confianza'}
              </h2>
              
              <p className="text-lg text-light-gray mb-6 font-franklin leading-relaxed">
                {content.home_about_p1 || 'Con más de 20 años de experiencia especializada en el sector automotriz, nuestro taller certificado se dedica a brindar servicios de excelencia para vehículos de todas las marcas y modelos en Punto Fijo, Estado Falcón.'}
              </p>
              
              <p className="text-lg text-light-gray mb-8 font-franklin leading-relaxed">
                {content.home_about_p2 || 'Nuestro compromiso es mantener tu vehículo en óptimas condiciones utilizando tecnología de diagnóstico avanzada, repuestos originales y un servicio personalizado que garantiza tu total tranquilidad en la carretera.'}
              </p>

              {/* Certifications and Expertise */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-dark-secondary rounded-lg">
                  <div className="w-3 h-3 bg-accent-red rounded-full"></div>
                  <span className="text-sm font-franklin text-white">Certificación ASE</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-dark-secondary rounded-lg">
                  <div className="w-3 h-3 bg-accent-red rounded-full"></div>
                  <span className="text-sm font-franklin text-white">Diagnóstico Computarizado</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-dark-secondary rounded-lg">
                  <div className="w-3 h-3 bg-accent-red rounded-full"></div>
                  <span className="text-sm font-franklin text-white">Repuestos Originales</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-dark-secondary rounded-lg">
                  <div className="w-3 h-3 bg-accent-red rounded-full"></div>
                  <span className="text-sm font-franklin text-white">Garantía Total</span>
                </div>
              </div>
              
              <Link to="/acerca-de">
                <AutomotiveButton variant="secondary" size="lg" className="bg-accent-red text-white hover:bg-red-700" icon={<ArrowRight className="w-5 h-5" />}>
                  Conoce Nuestro Taller Certificado
                </AutomotiveButton>
              </Link>
            </motion.div>
            
            <motion.div
              className="relative mt-10 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative">
                <img
                  src="/images/imagen_main.jpg"
                  alt="Interior del taller automotriz profesional con equipos de diagnóstico y vehículos en servicio"
                  className="rounded-xl shadow-md w-full h-auto object-cover aspect-[4/3]"
                />
                
                {/* Enhanced Badge */}
                <div className="absolute -bottom-6 -right-6 bg-accent-red text-white p-6 rounded-full shadow-md flex flex-col items-center justify-center w-32 h-32 sm:w-36 sm:h-36">
                  <div className="text-4xl sm:text-5xl font-bold">20+</div>
                  <div className="text-xs sm:text-sm text-center leading-tight font-franklin">AÑOS<br/>EXPERIENCIA</div>
                </div>

                {/* Floating Certification Badge */}
                <div className="absolute -top-4 -left-4 bg-dark-secondary text-white px-4 py-2 rounded-lg shadow-md transform -rotate-3">
                  <div className="text-xs font-bold">CERTIFICADO</div>
                  <div className="text-xs">ASE PROFESSIONAL</div>
                </div>

                {/* Equipment Highlight */}
                <div className="absolute top-4 right-4 bg-dark-secondary/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <GearIcon className="w-4 h-4 text-accent-red" />
                    <span className="text-xs font-franklin">Equipos Profesionales</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Enhanced Why Choose Us Section */}
      <Section className="py-16 sm:py-24 bg-dark-primary px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-accent-red rounded-full shadow-md">
              <WrenchIcon className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-impact text-white mb-6 uppercase">
            {content.home_why_title || '¿Por Qué Somos Tu Mejor Opción Automotriz?'}
          </h2>
          
          <p className="text-lg sm:text-xl text-light-gray mb-12 sm:mb-16 max-w-4xl mx-auto font-franklin leading-relaxed">
            {content.home_why_subtitle || 'Nuestro compromiso es con la excelencia automotriz total. Combinamos experiencia profesional, tecnología de punta y atención personalizada para garantizar que tu vehículo reciba el mejor cuidado posible.'}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            <AutomotiveCard className="flex flex-col items-center text-center p-8 group bg-dark-secondary" hover>
              <div className="relative mb-6">
                <div className="p-5 bg-white/10 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                  <WrenchIcon className="w-14 h-14 text-accent-red group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -top-2 -right-2 bg-accent-red text-white text-xs font-bold px-2 py-1 rounded-full">
                  PRO
                </div>
              </div>
              <h3 className="text-xl font-impact text-white mb-4 uppercase">
                {content.home_why_f1_title || 'Servicio Profesional Certificado'}
              </h3>
              <p className="text-primary-600 text-industrial leading-relaxed mb-4">
                {content.home_why_f1_text || 'Técnicos certificados ASE con más de 20 años de experiencia especializada en diagnóstico y reparación de vehículos de todas las marcas y modelos.'}
              </p>
              <div className="flex items-center gap-2 text-sm text-accent-red font-franklin">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                Certificación ASE Profesional
              </div>
            </AutomotiveCard>

            <AutomotiveCard className="flex flex-col items-center text-center p-8 group bg-dark-secondary" hover>
              <div className="relative mb-6">
                <div className="p-5 bg-white/10 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                  <GearIcon className="w-14 h-14 text-accent-red group-hover:rotate-180 transition-transform duration-500" />
                </div>
                <div className="absolute -top-2 -right-2 bg-accent-red text-white text-xs font-bold px-2 py-1 rounded-full">
                  TECH
                </div>
              </div>
              <h3 className="text-xl font-impact text-white mb-4 uppercase">
                {content.home_why_f2_title || 'Tecnología de Diagnóstico Avanzada'}
              </h3>
              <p className="text-light-gray mb-4 font-franklin leading-relaxed">
                {content.home_why_f2_text || 'Equipos de diagnóstico computarizado de última generación y herramientas especializadas para garantizar precisión y eficiencia en cada servicio.'}
              </p>
              <div className="flex items-center gap-2 text-sm text-accent-red font-franklin">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                Diagnóstico Computarizado
              </div>
            </AutomotiveCard>

            <AutomotiveCard className="flex flex-col items-center text-center p-8 group bg-dark-secondary" hover>
              <div className="relative mb-6">
                <div className="p-5 bg-white/10 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                  <CarIcon className="w-14 h-14 text-accent-red group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -top-2 -right-2 bg-accent-red text-white text-xs font-bold px-2 py-1 rounded-full">
                  100%
                </div>
              </div>
              <h3 className="text-xl font-impact text-white mb-4 uppercase">
                {content.home_why_f3_title || 'Garantía Total y Confianza'}
              </h3>
              <p className="text-light-gray mb-4 font-franklin leading-relaxed">
                {content.home_why_f3_text || 'Todos nuestros servicios incluyen garantía completa con repuestos originales. Tu tranquilidad y satisfacción total son nuestra prioridad número uno.'}
              </p>
              <div className="flex items-center gap-2 text-sm text-accent-red font-franklin">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                Garantía en Todos los Servicios
              </div>
            </AutomotiveCard>
          </div>

          {/* Additional Trust Indicators */}
          <div className="mt-16 p-8 bg-dark-secondary rounded-xl text-white">
            <h3 className="text-2xl font-impact mb-6 uppercase">Respaldados por la Experiencia</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-2">500+</div>
                <div className="text-sm text-light-gray font-franklin">Vehículos Reparados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-2">98%</div>
                <div className="text-sm text-light-gray font-franklin">Satisfacción Cliente</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-2">24h</div>
                <div className="text-sm text-light-gray font-franklin">Servicio Express</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-2">20+</div>
                <div className="text-sm text-light-gray font-franklin">Años Experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Enhanced Featured Services Section */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-accent-red rounded-full shadow-md">
                <GearIcon className="w-10 h-10 text-white gear-spin" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-impact text-white mb-6 uppercase">
              {content.home_services_title || 'Servicios Automotrices Especializados'}
            </h2>
            <p className="text-lg sm:text-xl text-light-gray max-w-4xl mx-auto font-franklin leading-relaxed mb-8">
              {content.home_services_subtitle || 'Servicios profesionales para el mantenimiento y reparación de tu vehículo. Tecnología avanzada, repuestos originales y garantía total en cada servicio.'}
            </p>

            {/* Service Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-secondary text-white rounded-full text-sm font-franklin">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                Mantenimiento
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-secondary text-white rounded-full text-sm font-franklin">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                Reparaciones
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-secondary text-white rounded-full text-sm font-franklin">
                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                Diagnóstico
              </div>
            </div>
          </div>

          {servicesLoading ? (
            <div className="flex justify-center"><Spinner size="lg" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <AutomotiveCard variant="service" hover className="group h-full flex flex-col bg-dark-secondary">
                    {/* Enhanced Service Image */}
                    <div className="relative h-56 overflow-hidden rounded-t-xl">
                      <img 
                        src={service.image_urls?.[0] || '/images/placeholders/serv_placeholder.jpg'} 
                        alt={`Servicio de ${service.name}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Service Category Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-accent-red text-white text-xs font-bold rounded-full shadow-md">
                        {service.category || 'SERVICIO'}
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-dark-secondary/90 backdrop-blur-sm text-white text-xs font-franklin rounded-full">
                        {service.estimated_time} min
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Service Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-impact text-white mb-3 uppercase group-hover:text-accent-red transition-colors">
                        {service.name}
                      </h3>
                      
                      <p className="text-light-gray mb-4 font-franklin leading-relaxed flex-1">
                        {service.description}
                      </p>

                      {/* Service Features */}
                      <div className="space-y-2 mb-4">
                        {service.include_parts !== undefined && (
                          <div className={`flex items-center gap-2 text-sm font-franklin ${service.include_parts ? 'text-accent-red' : 'text-light-gray'}`}>
                            <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                            {service.include_parts ? 'Incluye repuestos originales' : 'Repuestos adicionales según necesidad'}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm font-franklin text-white">
                          <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                          Garantía incluida
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <div className="text-2xl font-bold text-accent-red">
                          {formatPrice(service.price)}
                          {!service.include_parts && (
                            <span className="text-sm font-franklin text-light-gray block">+ repuestos</span>
                          )}
                        </div>
                        <Link to="/reservar">
                          <button className="px-4 py-2 bg-accent-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md">
                            Agendar
                          </button>
                        </Link>
                      </div>
                    </div>
                  </AutomotiveCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Enhanced CTA Section */}
          <div className="text-center">
            <div className="bg-dark-secondary rounded-xl p-8 text-white mb-8">
              <h3 className="text-2xl font-impact mb-4 uppercase">¿No Encuentras el Servicio que Necesitas?</h3>
              <p className="text-light-gray mb-6 max-w-2xl mx-auto font-franklin">
                Ofrecemos servicios personalizados para todas las marcas y modelos. Contáctanos para una cotización especializada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/servicios">
                  <AutomotiveButton size="lg" variant="secondary" className="bg-accent-red text-white hover:bg-red-700" icon={<ArrowRight className="w-5 h-5" />}>
                    Ver Todos los Servicios
                  </AutomotiveButton>
                </Link>
                <Link to="/contacto">
                  <AutomotiveButton size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/20">
                    Cotización Personalizada
                  </AutomotiveButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Enhanced Testimonials Section */}
      <Section className="py-16 sm:py-24 bg-dark-primary px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-accent-red rounded-full shadow-md">
                <Star className="w-10 h-10 text-white fill-current" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-impact text-white mb-6 uppercase">
              {content.home_testimonials_title || 'Clientes Satisfechos Hablan por Nosotros'}
            </h2>
            <p className="text-lg sm:text-xl text-light-gray max-w-4xl mx-auto font-franklin leading-relaxed mb-8">
              {content.home_testimonials_subtitle || 'Testimonios reales de propietarios de vehículos que confían en nuestro servicio automotriz profesional. Su satisfacción es nuestro mejor respaldo.'}
            </p>

            {/* Trust Statistics */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-1">4.9/5</div>
                <div className="text-sm text-light-gray font-franklin">Calificación Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-1">98%</div>
                <div className="text-sm text-light-gray font-franklin">Clientes Satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-1">500+</div>
                <div className="text-sm text-light-gray font-franklin">Reseñas Positivas</div>
              </div>
            </div>
          </div>

          {testimonialsLoading ? (
            <div className="flex justify-center"><Spinner size="lg" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <AutomotiveCard className="p-8 flex flex-col h-full group bg-dark-secondary" hover>
                    {/* Rating Stars */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-accent-red fill-current" />
                        ))}
                      </div>
                      <div className="text-sm font-franklin text-accent-red bg-white/10 px-2 py-1 rounded-full">
                        {testimonial.rating || 5}/5
                      </div>
                    </div>

                    {/* Service Type Badge */}
                    {testimonial.service_type && (
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-dark-secondary text-white text-xs font-franklin rounded-full border border-white/10">
                          <WrenchIcon className="w-3 h-3" />
                          {testimonial.service_type}
                        </span>
                      </div>
                    )}

                    {/* Testimonial Content */}
                    <blockquote className="text-light-gray mb-6 flex-grow font-franklin leading-relaxed">
                      <div className="text-4xl text-white/20 mb-2">"</div>
                      <p className="italic relative z-10">{testimonial.content}</p>
                    </blockquote>

                    {/* Customer Info */}
                    <div className="border-t border-white/10 pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-impact text-white text-lg mb-1 uppercase">
                            {testimonial.author_name}
                          </div>
                          {testimonial.vehicle_info && (
                            <div className="text-sm text-light-gray mb-2 flex items-center gap-2 font-franklin">
                              <CarIcon className="w-4 h-4 text-accent-red" />
                              {testimonial.vehicle_info}
                            </div>
                          )}
                          <div className="text-xs text-light-gray font-franklin">
                            Servicio: {testimonial.service_type}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <span className="text-accent-red font-bold text-lg">
                              {testimonial.author_name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Verified Badge */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-accent-red">
                      <div className="w-4 h-4 bg-accent-red rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-franklin">Cliente Verificado</span>
                    </div>
                  </AutomotiveCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Enhanced CTA Section */}
          <div className="text-center">
            <div className="bg-dark-secondary rounded-xl p-8 text-white">
              <h3 className="text-2xl font-impact mb-4 uppercase">¿Quieres Ser Nuestro Próximo Cliente Satisfecho?</h3>
              <p className="text-light-gray mb-6 max-w-2xl mx-auto font-franklin">
                Únete a cientos de propietarios de vehículos que ya confían en nuestro servicio profesional. 
                Tu satisfacción está garantizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/reservar">
                  <AutomotiveButton size="lg" variant="secondary" className="bg-accent-red text-white hover:bg-red-700" icon={<Calendar className="w-5 h-5" />}>
                    Agenda tu Servicio Ahora
                  </AutomotiveButton>
                </Link>
                <Link to="/testimonios">
                  <AutomotiveButton size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/20">
                    Ver Más Testimonios
                  </AutomotiveButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Blog Carousel */}
      <BlogCarousel />

      {/* Call to Action - Combined with Featured Gallery */}
      <section className="py-16 sm:py-24 bg-dark-primary px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center text-white">
          {mediaLoading ? (
            <div className="flex justify-center lg:col-span-2"><Spinner size="lg" /></div>
          ) : featuredPhotos.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="grid grid-cols-2 gap-4"
            >
              {featuredPhotos.map((item) => (
                <div key={item.id} className="relative overflow-hidden rounded-lg shadow-md aspect-video">
                  <img
                    src={item.thumbnail_url || item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-lg font-bold">Ver</span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="lg:col-span-2 text-center">
              <WrenchIcon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-accent-red" />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-impact mb-4 uppercase">
              {content.home_cta_title || 'Mantén Tu Vehículo en Perfectas Condiciones'}
            </h2>
            <p className="text-lg sm:text-xl mb-10 text-light-gray max-w-2xl lg:max-w-none mx-auto lg:mx-0 font-franklin">
              {content.home_cta_subtitle || 'No esperes a que sea demasiado tarde. Agenda tu servicio hoy y mantén tu vehículo funcionando como nuevo con nuestro servicio profesional.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/reservar">
                <AutomotiveButton variant="secondary" size="lg" className="bg-accent-red text-white hover:bg-red-700" icon={<Calendar className="w-5 h-5" />}>
                  Agenda tu Servicio
                </AutomotiveButton>
              </Link>
              <Link to="/rastrear">
                <AutomotiveButton variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/20" icon={<Search className="w-5 h-5" />}>
                  Rastrear Servicio
                </AutomotiveButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}