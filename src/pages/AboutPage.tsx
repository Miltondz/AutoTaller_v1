import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Briefcase, Users, Music, BarChart, Heart, Calendar } from 'lucide-react'
import { Card, CardContent } from '../components/Card'
import { Button } from '../components/Button'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-amber-800 overflow-hidden"
      >
        <img 
          src="/images/acerca_de_mi.jpeg" 
          alt="Banner Acerca de Mí" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold text-white mb-6">
            Acerca de Mí
          </h1>
          <p className="text-xl text-slate-200">
            Conoce mi trayectoria y mi pasión por la enseñanza musical.
          </p>
        </div>
      </section>

      {/* Teacher Biography */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-last md:order-first">
            <img
              src="/images/acerca_de_mi.jpeg"
              alt="Retrato de la Maestra de Música"
              className="rounded-lg shadow-lg w-full object-contain mx-auto"
            />
            <div className="absolute -bottom-4 -right-4 bg-amber-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm">Años de Experiencia</div>
              </div>
            </div>
          </div>
          <div className="order-first md:order-last">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Mi Viaje Musical y Filosofía de Enseñanza
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Desde muy joven, la música ha sido el motor de mi vida y mi más grande vocación. Mi camino comenzó entre las voces de coros y las cuerdas del cuatro venezolano, una pasión que me llevó a formarme profesionalmente en piano, canto y dirección musical. Obtuve mi Licenciatura en Educación Mención Música, consolidando mi compromiso de no solo interpretar, sino también de compartir el poder transformador de la música.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              Mi filosofía de enseñanza se centra en crear un ambiente de aprendizaje inspirador, personalizado y humano. Creo firmemente que la música es una herramienta para el desarrollo integral, por lo que adapto mis métodos para potenciar las fortalezas únicas de cada estudiante. Mi objetivo va más allá de la técnica; busco nutrir la creatividad, la expresión personal y el amor por la música, creando una base sólida que los acompañará toda la vida.
            </p>
            <p className="text-lg text-slate-600 mb-8">
              Me dedico a guiar a cada alumno en su propio viaje musical, ayudándoles a descubrir su potencial y a cultivar una pasión duradera.
            </p>
            <Link to="/contacto">
              <Button variant="primary">
                Contáctame
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Credentials and Experience */}
      <section className="py-16 bg-amber-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Credenciales y Experiencia
            </h2>
            <p className="text-xl text-slate-600">
              Una trayectoria dedicada a la excelencia en la educación musical.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <GraduationCap className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Educación Formal</h3>
                <p className="text-slate-600">
                  Licenciatura en Educación, Mención Música (UNEFM). Estudios de Cuatro, Guitarra y Piano en prestigiosas escuelas de música.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Briefcase className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Experiencia Docente</h3>
                <p className="text-slate-600">
                  Docente en el Conservatorio Musical del Estado Falcón (COMESFAL) y en la Universidad Nacional Experimental Francisco de Miranda (UNEFM).
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Dirección y Liderazgo</h3>
                <p className="text-slate-600">
                  Directora Musical de la Coral UNEFM y fundadora de la agrupación infantil "Cantores del 23".
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Music className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Agrupaciones Corales</h3>
                <p className="text-slate-600">
                  Extensa experiencia como coralista en agrupaciones como la Coral del Centro de Refinación Paraguaná y la Coral Cotraedup.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <BarChart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Desarrollo Profesional</h3>
                <p className="text-slate-600">
                  Locutora Profesional Certificada y participación continua en talleres de pedagogía musical para mantenerme actualizada.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Impacto Comunitario</h3>
                <p className="text-slate-600">
                  Fundadora de proyectos para niños de bajos recursos y colaboradora del Proyecto de acción social por la música Simón Bolívar.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para Empezar tu Viaje Musical?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Da el primer paso hacia la realización musical. Reserva tu clase personalizada hoy.
          </p>
          <Link to="/reservar">
            <Button variant="secondary" size="lg">
              Agenda tu Primera Clase
              <Calendar className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
