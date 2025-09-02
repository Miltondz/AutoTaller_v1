import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { Spinner } from '../components/Spinner';
import { formatDate } from '../lib/utils';
import type { BlogPost } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { AutomotiveButton, AutomotiveCard, FormInput } from '../components/AutomotiveForm';
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

export function BlogPage() {
  const { blogPosts, loading, error } = useBlogPosts();
  const { content, loading: contentLoading } = useSiteContent();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!blogPosts) return [];
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogPosts, searchTerm]);

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/\*\*|\*/g, ''); // Remove markdown for excerpt
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  };

  if (loading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary p-8">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error al Cargar el Blog</h2>
          <p className="text-light-gray mb-6">{error}</p>
          <AutomotiveButton onClick={() => window.location.reload()}>Intentar de Nuevo</AutomotiveButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header Section */}
      <header className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-dark-primary text-white">
        <img src="/images/placeholders/blog_placeholder.jpg" alt="Mecánico escribiendo en un portapapeles en un taller bien iluminado" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary via-dark-primary/70 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-accent-red rounded-full shadow-md">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-impact mb-4 tracking-tight uppercase">
            {content.blog_hero_title || 'Blog Automotriz'}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-light-gray max-w-3xl mx-auto font-fugaz">
            {content.blog_hero_subtitle || 'Consejos, tips de mantenimiento y recursos para el cuidado de tu vehículo.'}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="max-w-lg mx-auto relative mt-10"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-gray w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-4 border-none rounded-full shadow-lg bg-dark-secondary text-white focus:outline-none focus:ring-4 focus:ring-accent-red transition-all"
          />
        </motion.div>
      </header>

      {/* Blog Posts */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence>
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16 text-white"
              >
                <h3 className="text-2xl font-semibold mb-3">
                  {searchTerm ? 'Sin Resultados' : 'No Hay Publicaciones'}
                </h3>
                <p className="text-light-gray max-w-md mx-auto font-franklin">
                  {searchTerm
                    ? `No se encontraron artículos para "${searchTerm}". Intenta una búsqueda diferente.`
                    : 'Vuelve pronto para leer nuevos artículos sobre mantenimiento automotriz y consejos técnicos.'}
                </p>
              </motion.div>
            ) : (
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AutomotiveCard hover className="flex flex-col h-full group bg-dark-secondary">
                      <div className="h-56 overflow-hidden rounded-t-xl">
                        <img
                          src={post.image_url || '/images/placeholders/blog_placeholder.jpg'}
                          alt={`Imagen del artículo de blog: ${post.title}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center text-sm text-light-gray mb-3 font-franklin">
                          <Calendar className="w-4 h-4 mr-2 text-accent-red" />
                          {formatDate(post.published_date)}
                        </div>
                        <h2 className="text-xl font-impact text-white line-clamp-2 h-14 uppercase group-hover:text-accent-red transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-light-gray line-clamp-4 flex-grow mb-6 font-franklin">
                          {getExcerpt(post.content)}
                        </p>
                        <Link to={`/blog/${post.slug}`}>
                          <AutomotiveButton variant="outline" className="w-full border-white/10 text-white hover:bg-white/20">
                            Leer Más
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </AutomotiveButton>
                        </Link>
                      </div>
                    </AutomotiveCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* Newsletter Signup */}
      <Section className="py-16 sm:py-24 bg-dark-secondary px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-impact mb-4 uppercase">
            {content.blog_cta_title || 'Únete a Nuestra Comunidad Automotriz'}
          </h2>
          <p className="text-lg sm:text-xl text-light-gray mb-8 font-franklin">
            {content.blog_cta_subtitle || 'Recibe los últimos artículos, consejos de mantenimiento y ofertas especiales directamente en tu correo.'}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <FormInput
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="flex-1"
              aria-label="Correo electrónico para newsletter"
            />
            <AutomotiveButton type="submit" className="bg-accent-red text-white hover:bg-red-700">
              Suscribirse
            </AutomotiveButton>
          </form>
        </div>
      </Section>
    </div>
  );
}