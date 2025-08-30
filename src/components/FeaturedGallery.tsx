import React from 'react';
import { Link } from 'react-router-dom';
import { ImageIcon, ArrowRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useMediaGallery } from '../hooks/useMediaGallery';
import { Spinner } from '../components/Spinner';

export function FeaturedGallery() {
  const { mediaItems, loading, error } = useMediaGallery();

  const featuredPhotos = mediaItems.filter(item => item.is_featured && item.media_type === 'photo').slice(0, 3);

  if (loading) {
    return (
      <section className="py-12 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Únete a Nuestra Comunidad</h2>
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  if (error || featuredPhotos.length === 0) {
    return null; // Don't render section if error or no featured photos
  }

  return (
    <section className="py-12 sm:py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Únete a Nuestra Comunidad</h2>
          <p className="text-lg text-slate-600">Explora momentos de nuestras clases y eventos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredPhotos.map((item) => (
            <Link to="/galeria" key={item.id}>
              <Card className="overflow-hidden group">
                <div className="h-64 relative">
                  <img
                    src={item.thumbnail_url || item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/galeria">
            <Button size="lg">Ver Galería Completa</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
