import React, { useState } from 'react';
import { useContactMessages } from '../hooks/useContactMessages';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spinner } from '../components/Spinner';
import { useSiteContent } from '../hooks/useSiteContent';

type InquiryType = 'general' | 'lessons' | 'events' | 'technical';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  inquiry_type: InquiryType;
  message: string;
}

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

export function ContactPage() {
  const { createMessage } = useContactMessages();
  const { content, loading: contentLoading } = useSiteContent();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    inquiry_type: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inquiryTypes = [
    { value: 'general' as InquiryType, label: 'Consulta General' },
    { value: 'lessons' as InquiryType, label: 'Clases en Falcón, Punto Fijo, etc.' },
    { value: 'events' as InquiryType, label: 'Eventos y Recitales' },
    { value: 'technical' as InquiryType, label: 'Soporte Técnico del Sitio Web' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setLoading(true);

    try {
      await createMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        inquiry_type: formData.inquiry_type,
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', inquiry_type: 'general', message: '' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  if (contentLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  return (
    <div className="bg-dark-primary">
      {/* Header */}
      <header className="relative py-20 sm:py-28 bg-dark-primary text-white text-center px-4">
        <img src="/images/contacto.jpg" alt="Fondo de contacto" className="absolute inset-0 w-full h-full object-cover object-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/50 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl font-impact mb-4 tracking-tight uppercase"
          >
            {content.contact_hero_title || 'Ponte en Contacto'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl text-light-gray max-w-3xl mx-auto font-fugaz"
          >
            {content.contact_hero_subtitle || '¿Preguntas sobre clases de música en Maracaibo, Caracas o Mérida? ¿Listo para empezar? Contáctame.'}
          </motion.p>
        </div>
      </header>

      <Section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-dark-secondary border border-white/10">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-impact text-white mb-6 uppercase">Información de Contacto</h2>
                <div className="space-y-6">
                  <InfoItem icon={<Mail />} label="Email" value={content.contact_info_email || 'MaestraLauraKarol@gmail.com'} href={`mailto:${content.contact_info_email}`} />
                  <InfoItem icon={<Phone />} label="Teléfono" value={content.contact_info_phone || '+58 123 456 7890'} href={`tel:${content.contact_info_phone}`} />
                  <InfoItem icon={<MapPin />} label="Ubicación Principal" value={content.contact_info_location || 'Punto Fijo, Falcón, Venezuela'} />
                  <InfoItem icon={<Clock />} label="Horario de Atención" value={content.contact_info_hours || 'Lun - Sáb: 9am - 6pm'} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-secondary border border-white/10">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-impact text-white mb-6 uppercase">Sígueme en Redes</h3>
                <div className="flex space-x-4">
                  <SocialIcon href={content.contact_info_facebook_url || '#'} icon={<Facebook />} />
                  <SocialIcon href={content.contact_info_instagram_url || '#'} icon={<Instagram />} />
                  <SocialIcon href={content.contact_info_youtube_url || '#'} icon={<Youtube />} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-dark-secondary border border-white/10">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <h2 className="text-2xl sm:text-3xl font-impact text-white mb-6 uppercase">{content.contact_form_title || 'Envíame un Mensaje'}</h2>
                
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-dark-secondary border border-accent-red rounded-lg flex items-center space-x-3 text-white"
                  >
                    <CheckCircle className="w-6 h-6 text-accent-red" />
                    <div>
                      <p className="font-franklin">¡Mensaje enviado con éxito!</p>
                      <p className="text-sm font-franklin">Gracias por tu interés, te contactaré pronto.</p>
                    </div>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-dark-secondary border border-danger-600 rounded-lg flex items-center space-x-3 text-white"
                  >
                    <AlertTriangle className="w-6 h-6 text-danger-600" />
                    <p className="font-franklin">{submitError}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField id="name" label="Nombre Completo *" value={formData.name} onChange={handleInputChange} placeholder="Tu nombre" required />
                    <FormField id="email" label="Correo Electrónico *" type="email" value={formData.email} onChange={handleInputChange} placeholder="tu@email.com" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField id="phone" label="Teléfono (Opcional)" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+58 123 456 7890" />
                    <div>
                      <label htmlFor="inquiry_type" className="block text-sm font-franklin text-white mb-2">Tipo de Consulta</label>
                      <select id="inquiry_type" name="inquiry_type" value={formData.inquiry_type} onChange={handleInputChange} className="form-input">
                        {inquiryTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-franklin text-white mb-2">Mensaje *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="form-input resize-none" placeholder="Cuéntame cómo puedo ayudarte..."></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={!isFormValid || loading} size="lg" className="bg-accent-red text-white hover:bg-red-700">
                      {loading ? <Spinner size="sm" /> : <Send className="w-5 h-5 mr-2" />}
                      {loading ? 'Enviando...' : 'Enviar Mensaje'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}

// Helper components for cleaner structure
const InfoItem = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-10 h-10 bg-dark-secondary rounded-full flex items-center justify-center text-accent-red border border-white/10">{icon}</div>
    <div>
      <p className="font-franklin text-white">{label}</p>
      {href ? (
        <a href={href} className="text-light-gray hover:text-accent-red transition-colors font-franklin">
          {value}
        </a>
      ) : (
        <p className="text-light-gray font-franklin">{value}</p>
      )}
    </div>
  </div>
);

const SocialIcon = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="p-3 bg-dark-secondary rounded-full hover:bg-white/10 transition-colors group border border-white/10">
    {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 text-light-gray group-hover:text-accent-red" })}
  </a>
);

const FormField = ({ id, label, type = 'text', value, onChange, placeholder, required = false }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-franklin text-white mb-2">{label}</label>
    <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} className="form-input" placeholder={placeholder} />
  </div>
);