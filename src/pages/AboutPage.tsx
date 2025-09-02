import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Briefcase, Users, BarChart, Heart, Calendar, Wrench } from 'lucide-react';
import { WrenchIcon } from '../components/AutomotiveIcons';
import { AutomotiveButton } from '../components/AutomotiveForm';
import { motion } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';
import { Spinner } from '../components/Spinner';

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

const TimelineItem = ({ icon, title, children, isLast = false }: { icon: React.ReactNode, title: string, children: React.ReactNode, isLast?: boolean }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-4 sm:mr-6">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center shadow-tool">
        {icon}
      </div>
      {!isLast && <div className="w-px h-full bg-primary-300 my-2"></div>}
    </div>
    <div className="pb-10">
      <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-2 heading-automotive">{title}</h3>
      <p className="text-base text-primary-600 text-industrial leading-relaxed">{children}</p>
    </div>
  </div>
);

export function AboutPage() {
  const { content, loading } = useSiteContent();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <img src="/images/acerca-de.jpeg" alt="Interior del taller mecánico profesional con equipos y vehículos" className="absolute inset-0 w-full h-full object-cover object-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/50 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex justify-center mb-6">
            <div className="p-4 bg-accent-red rounded-full shadow-md">
              <WrenchIcon className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-4xl sm:text-5xl md:text-6xl font-impact mb-4 tracking-tight uppercase">
            {content.about_hero_title || 'Nuestro Taller Automotriz'}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} className="text-lg sm:text-xl md:text-2xl text-light-gray max-w-3xl mx-auto font-fugaz">
            {content.about_hero_subtitle || 'Conoce la historia, experiencia y compromiso que nos convierte en el taller de confianza para tu vehículo.'}
          </motion.p>
        </div>
      </section>

      {/* Shop Biography */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div className="relative order-last lg:order-first mt-10 lg:mt-0" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <img src="/images/acerca-de.jpeg" alt="Interior del taller mecánico con equipos profesionales y vehículos en servicio" className="rounded-xl shadow-md w-full object-cover aspect-square mx-auto" />
            <div className="absolute -bottom-6 -right-6 bg-accent-red text-white p-4 rounded-full shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-xs">AÑOS</div>
              </div>
            </div>
          </motion.div>
          <div className="order-first lg:order-last">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-dark-secondary rounded-lg">
                <WrenchIcon className="w-6 h-6 text-accent-red" />
              </div>
              <span className="text-accent-red font-franklin text-sm uppercase tracking-wide">Taller Certificado</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-impact text-white mb-6 uppercase">{content.about_bio_title || 'Nuestra Historia y Filosofía'}</h2>
            <p className="text-lg text-light-gray mb-6 font-franklin leading-relaxed">
              {content.about_bio_p1 || 'Desde 2003, nuestro taller ha sido sinónimo de confianza y excelencia en el sector automotriz. Comenzamos como un pequeño taller familiar y hemos crecido hasta convertirnos en uno de los centros de servicio más respetados de la región.'}
            </p>
            <p className="text-lg text-light-gray mb-8 font-franklin leading-relaxed">
              {content.about_bio_p2 || 'Nuestra filosofía se basa en la honestidad, la transparencia y el compromiso con la calidad. Cada vehículo que entra a nuestro taller recibe la misma atención y cuidado que le daríamos al nuestro propio.'}
            </p>
            <Link to="/contacto"><AutomotiveButton variant="primary" size="lg" className="bg-accent-red text-white hover:bg-red-700" icon={<ArrowRight className="w-5 h-5" />}>Contáctanos</AutomotiveButton></Link>
          </div>
        </div>
      </Section>

      {/* Credentials and Experience Timeline */}
      <Section className="py-16 sm:py-24 bg-dark-primary px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-accent-red rounded-full shadow-md">
                <WrenchIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-impact text-white mb-4 uppercase">{content.about_timeline_title || 'Nuestra Trayectoria Profesional'}</h2>
            <p className="text-lg sm:text-xl text-light-gray max-w-3xl mx-auto font-fugaz">{content.about_timeline_subtitle || 'Más de 20 años de experiencia especializada en el sector automotriz, brindando servicios de calidad en Punto Fijo, Estado Falcón.'}</p>
          </div>
          <div className="relative">
            <TimelineItem icon={<GraduationCap />} title={content.about_timeline_i1_title || 'Formación Técnica Especializada'}>{content.about_timeline_i1_text || 'Certificaciones ASE en diagnóstico automotriz, sistemas eléctricos y mecánica general. Formación continua en tecnologías automotrices modernas.'}</TimelineItem>
            <TimelineItem icon={<Briefcase />} title={content.about_timeline_i2_title || 'Experiencia en el Sector'}>{content.about_timeline_i2_text || 'Más de dos décadas trabajando con vehículos de todas las marcas, desde mantenimiento básico hasta reparaciones complejas de motor y transmisión.'}</TimelineItem>
            <TimelineItem icon={<Users />} title={content.about_timeline_i3_title || 'Liderazgo y Gestión'}>{content.about_timeline_i3_text || 'Fundador y director del taller, liderando un equipo de técnicos especializados y estableciendo estándares de calidad en el servicio automotriz.'}</TimelineItem>
            <TimelineItem icon={<Wrench />} title={content.about_timeline_i4_title || 'Tecnología y Equipamiento'}>{content.about_timeline_i4_text || 'Inversión constante en equipos de diagnóstico de última generación y herramientas especializadas para brindar servicios de calidad superior.'}</TimelineItem>
            <TimelineItem icon={<BarChart />} title={content.about_timeline_i5_title || 'Desarrollo Continuo'}>{content.about_timeline_i5_text || 'Participación activa en cursos de actualización técnica y seminarios sobre nuevas tecnologías automotrices para mantenerse a la vanguardia.'}</TimelineItem>
            <TimelineItem icon={<Heart />} title={content.about_timeline_i6_title || 'Compromiso Comunitario'} isLast>{content.about_timeline_i6_text || 'Apoyo a la comunidad local a través de servicios de mantenimiento preventivo gratuito para vehículos de emergencia y organizaciones benéficas.'}</TimelineItem>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <section className="py-24 bg-dark-primary px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-dark-secondary rounded-full backdrop-blur-sm">
                <WrenchIcon className="w-12 h-12 text-accent-red" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-impact mb-4 uppercase">{content.about_cta_title || '¿Necesitas Servicio Profesional para tu Vehículo?'}</h2>
            <p className="text-lg sm:text-xl mb-10 text-light-gray max-w-2xl mx-auto font-franklin">{content.about_cta_subtitle || 'Confía en nuestra experiencia y compromiso con la calidad. Agenda tu cita hoy mismo y experimenta la diferencia de un servicio profesional.'}</p>
            <Link to="/reservar"><AutomotiveButton variant="secondary" size="lg" className="bg-accent-red text-white hover:bg-red-700">Agenda tu Servicio<Calendar className="w-5 h-5 ml-2" /></AutomotiveButton></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}