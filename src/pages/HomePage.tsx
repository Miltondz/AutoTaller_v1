import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, BookOpen, GraduationCap, ClipboardEdit, HeartHandshake, Star } from 'lucide-react'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { useServices } from '../hooks/useServices'
import { useTestimonials } from '../hooks/useTestimonials'
import { useFeaturedMedia } from '../hooks/useMediaGallery'
import { formatPrice } from '../lib/utils'
import { BlogCarousel } from '../components/BlogCarousel'
import { Spinner } from '../components/Spinner'

export function HomePage() {
  const { services, loading: servicesLoading } = useServices()
  const { testimonials, loading: testimonialsLoading } = useTestimonials()
  const { featuredItems, loading: mediaLoading } = useFeaturedMedia()
  
  const featuredServices = services.slice(0, 3) // Display up to 3 services
  const featuredTestimonials = testimonials.slice(0, 3) // Display up to 3 testimonials
  const featuredPhotos = featuredItems.filter(item => item.media_type === 'photo').slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-amber-50 overflow-hidden"
        style={{
          backgroundImage: 'url(/images/main_header.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Descubre tu Pasión Musical
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200">
            Tu viaje musical, a medida. Conoce nuestras clases de piano, guitarra y violín diseñadas para inspirarte, guiarte y nutrir tu talento único.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservar">
              <Button size="lg" className="w-full sm:w-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Reserva tu Primera Clase
              </Button>
            </Link>
            <Link to="/servicios">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-slate-800">
                Explorar Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Una Trayectoria Dedicada a la Música
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Con más de 25 años de experiencia profesional en la instrucción musical, mi compromiso es guiar a estudiantes de todas las edades a través de su propio viaje de autodescubrimiento. Desde mi primera experiencia como coralista hasta mi rol actual como docente, he dedicado mi vida a la música y siento una profunda pasión por compartirla.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Mi filosofía se centra en la excelencia y el acompañamiento personalizado. Combino una sólida formación académica con metodologías modernas y creativas, creando un ambiente de aprendizaje positivo donde cada nota cuenta y cada estudiante puede alcanzar su máximo potencial.
              </p>
              <Link to="/acerca-de">
                <Button variant="outline">
                  Conoce más sobre mí
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="/images/main_hero.jpeg" 
                alt="Profesora de música en estudio"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-amber-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm">Años de Experiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-amber-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Tu Éxito es Nuestra Pasión
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Estamos comprometidos con tu crecimiento musical y personal.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <GraduationCap className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Instrucción de Vanguardia
              </h3>
              <p className="text-slate-600">
                La Licda. Laura Díaz M. es una profesional altamente calificada con una trayectoria que abarca la coralidad, la docencia y la dirección musical. Su experiencia garantiza una guía experta y personalizada, centrada en las necesidades y aspiraciones únicas de cada estudiante.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <ClipboardEdit className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Planes Personalizados
              </h3>
              <p className="text-slate-600">
                Aquí no existe un enfoque único. Diseñamos un plan de estudio que se adapta a tu estilo de aprendizaje, a tu ritmo y, lo más importante, a tus intereses. Porque creemos que el camino para dominar un instrumento debe ser tan gratificante y personal como la música misma.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <HeartHandshake className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Comunidad de Apoyo
              </h3>
              <p className="text-slate-600">
                Únete a una vibrante red de estudiantes y amantes de la música que comparten tu pasión. Tendrás acceso a talleres, presentaciones y eventos que fomentan la colaboración y el crecimiento mutuo, haciendo que tu experiencia de aprendizaje sea más enriquecedora y duradera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      {!mediaLoading && featuredPhotos.length > 0 && (
        <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Galería Destacada
              </h2>
              <p className="text-lg text-slate-600">
                Momentos especiales de nuestras clases y logros estudiantiles
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredPhotos.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={item.media_url} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium text-center px-2">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/galeria">
                <Button>
                  Ver Galería Completa
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-slate-600">
              Instrucción profesional adaptada a tus aspiraciones musicales
            </p>
          </div>

          {servicesLoading ? (
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {featuredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image_url || '/images/placeholders/elegant_music_education_blog_placeholder.jpg'} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-amber-600">
                        {formatPrice(service.price)}
                      </div>
                      <div className="text-sm text-slate-500">
                        {service.duration_minutes} minutos
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/servicios">
              <Button>
                Ver Todos los Servicios
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Testimonios
            </h2>
            <p className="text-lg text-slate-600">
              Escucha de estudiantes que han descubierto su potencial musical
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-slate-600 mb-4">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="text-right">
                      <div className="font-semibold text-slate-800">
                        {testimonial.author_name}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Carousel */}
      <BlogCarousel />

      {/* Call to Action */}
      <section className="py-16 bg-amber-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-amber-200" />
          <h2 className="text-3xl font-bold mb-4">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Descubre el poder de la música y comienza tu viaje hoy mismo. Reserva tu primera clase y da el primer paso hacia tu futuro musical.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservar">
              <Button variant="secondary" size="lg">
                Reserva tu Clase
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-amber-600">
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
