import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { WrenchIcon } from './AutomotiveIcons';
import { useSiteContent } from '../hooks/useSiteContent';

export function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="bg-dark-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <WrenchIcon className="w-8 h-8 text-accent-red" />
              <span className="text-xl font-impact">{content.footer_logo_text || 'AutoTaller Pro'}</span>
            </div>
            <p className="text-light-gray mb-6 max-w-md font-franklin leading-relaxed">
              {content.footer_description || 'Servicios automotrices profesionales para vehículos de todas las marcas y modelos. Descubre la tranquilidad de tener tu auto en las mejores manos con mantenimiento especializado y reparaciones de calidad.'}
            </p>
            <Link to="/reservar">
              <button className="bg-accent-red text-white px-6 py-3 rounded-md font-bold hover:bg-red-700 transition-colors shadow-md">
                Agenda tu Primer Servicio
              </button>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-fugaz mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/servicios" className="text-light-gray hover:text-accent-red transition-colors">Servicios</Link></li>
              <li><Link to="/acerca-de" className="text-light-gray hover:text-accent-red transition-colors">Acerca del Taller</Link></li>
              <li><Link to="/reservar" className="text-light-gray hover:text-accent-red transition-colors">Agendar Servicio</Link></li>
              <li><Link to="/blog" className="text-light-gray hover:text-accent-red transition-colors">Blog Automotriz</Link></li>
              <li><Link to="/galeria" className="text-light-gray hover:text-accent-red transition-colors">Galería</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-fugaz mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-red" />
                <span className="text-light-gray">{content.contact_info_email || 'contacto@autotallerpro.com'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-red" />
                <span className="text-light-gray">{content.contact_info_phone || '+58 269 000-0000'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent-red" />
                <span className="text-light-gray">{content.contact_info_location || 'Punto Fijo, Estado Falcon, Venezuela'}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href={content.contact_info_facebook_url || '#'} className="text-light-gray hover:text-accent-red transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href={content.contact_info_instagram_url || '#'} className="text-light-gray hover:text-accent-red transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href={content.contact_info_youtube_url || '#'} className="text-light-gray hover:text-accent-red transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-light-gray">
          <p>{content.footer_copyright || '© 2025 AutoTaller Pro & DunaTech. Todos los derechos reservados. Cuidando tu vehículo desde 2000.'}</p>
        </div>
      </div>
    </footer>
  );
}