import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'

const SQL_COMMAND = `
CREATE TABLE site_content (
    key TEXT PRIMARY KEY,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view site content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage site content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO site_content (key, value) VALUES
('home_hero_title', 'Tu Taller Mecánico de Confianza'),
('home_hero_subtitle', 'Servicios automotrices de calidad en Venezuela. Ofrecemos mantenimiento, reparación y diagnóstico para todo tipo de vehículos.'),
('home_about_title', 'Una Trayectoria Dedicada a la Mecánica'),
('home_about_p1', 'Con más de 20 años de experiencia, nuestra misión es mantener tu vehículo en las mejores condiciones. Ofrecemos servicios en Falcón, Punto Fijo, y para toda Venezuela.'),
('home_about_p2', 'Nuestra filosofía combina la excelencia técnica con un servicio al cliente honesto y transparente, creando un ambiente de confianza donde cada cliente se siente seguro.'),
('home_why_title', '¿Por Qué Elegir Nuestro Taller?'),
('home_why_subtitle', 'Nuestro compromiso es con tu seguridad y la de tu vehículo. Ofrecemos una experiencia de servicio única, ya sea en Maracaibo, Caracas, Mérida o desde casa.'),
('home_why_f1_title', 'Servicio de Calidad'),
('home_why_f1_text', 'Guía experta y personalizada de un equipo de mecánicos certificados con una sólida trayectoria en reparación y mantenimiento de vehículos.'),
('home_why_f2_title', 'Planes de Mantenimiento'),
('home_why_f2_text', 'Planes de mantenimiento adaptados a tu vehículo, estilo de manejo y presupuesto. Tu seguridad es nuestra prioridad.'),
('home_why_f3_title', 'Comunidad y Confianza'),
('home_why_f3_text', 'Únete a nuestra red de clientes satisfechos, participa en nuestras promociones y eventos, y enriquece tu experiencia como conductor.'),
('home_services_title', 'Nuestros Servicios'),
('home_services_subtitle', 'Servicios de mecánica para todo tipo de vehículos. Explora nuestros servicios y encuentra el ideal para ti.'),
('home_testimonials_title', 'Lo Que Dicen Nuestros Clientes'),
('home_testimonials_subtitle', 'Testimonios de clientes que han confiado en nuestro taller.'),
('home_cta_title', 'Únete a Nuestra Comunidad de Conductores'),
('home_cta_subtitle', 'Da el primer paso hacia la seguridad de tu vehículo. Agenda tu servicio hoy y descubre el poder de un auto bien mantenido.'),
('about_hero_title', 'Nuestra Pasión, Tu Seguridad'),
('about_hero_subtitle', 'Conoce la trayectoria y la filosofía que nos convierten en tu mejor aliado para el mantenimiento de tu vehículo en Venezuela.'),
('about_bio_title', 'Nuestro Viaje y Filosofía'),
('about_bio_p1', 'Desde jóvenes, los autos han sido nuestra vocación. Nuestro camino comenzó en talleres familiares, llevándonos a una formación profesional en mecánica automotriz. Como técnicos certificados, nuestro compromiso es compartir nuestra pasión por los autos, ofreciendo servicios en Falcón, Punto Fijo y remotamente a toda Venezuela.'),
('about_bio_p2', 'Nuestra filosofía se centra en un servicio honesto y personalizado. Adaptamos nuestros métodos para potenciar la vida útil de tu vehículo, buscando nutrir no solo la mecánica, sino la confianza y el amor por los autos. Nuestra meta es guiarte a descubrir el potencial de tu vehículo y cultivar una pasión que te acompañe siempre.'),
('about_timeline_title', 'Nuestra Trayectoria Profesional'),
('about_timeline_subtitle', 'Un resumen de nuestra experiencia y formación, dedicada a la excelencia en la mecánica automotriz en ciudades como Maracaibo, Caracas y Mérida.'),
('about_timeline_i1_title', 'Educación Formal'),
('about_timeline_i1_text', 'Técnicos Superiores en Mecánica Automotriz. Estudios avanzados en diagnóstico electrónico y reparación de motores en prestigiosas escuelas de Venezuela.'),
('about_timeline_i2_title', 'Experiencia Laboral'),
('about_timeline_i2_text', 'Hemos tenido el honor de ser mecánicos en talleres de renombre en el Estado Falcón y en la Universidad Nacional Experimental Francisco de Miranda (UNEFM).'),
('about_timeline_i3_title', 'Liderazgo y Emprendimiento'),
('about_timeline_i3_text', 'Fundadores de nuestro propio taller, fomentando el talento joven y la mecánica de calidad.'),
('about_timeline_i4_title', 'Agrupaciones y Afiliaciones'),
('about_timeline_i4_text', 'Miembros activos de la Cámara de Talleres Mecánicos de Venezuela.'),
('about_timeline_i5_title', 'Desarrollo Profesional'),
('about_timeline_i5_text', 'Participantes activos en talleres de actualización de tecnología automotriz para mantenernos a la vanguardia de la industria.'),
('about_timeline_i6_title', 'Impacto Comunitario'),
('about_timeline_i6_text', 'Colaboradores del Proyecto de Acción Social por la Mecánica y fundadores de proyectos para jóvenes de bajos recursos.'),
('about_cta_title', '¿Listo para Empezar a Cuidar tu Auto?'),
('about_cta_subtitle', 'Ya sea que estés en Punto Fijo, Falcón o cualquier parte de Venezuela, estamos aquí para ayudarte. ¡Agenda tu servicio personalizado hoy!'),
('contact_hero_title', 'Ponte en Contacto'),
('contact_hero_subtitle', '¿Preguntas sobre nuestros servicios en Maracaibo, Caracas o Mérida? ¿Listo para empezar? Contáctanos.'),
('contact_form_title', 'Envíame un Mensaje'),
('contact_info_email', 'contacto@tallerpro.com'),
('contact_info_phone', '+58 123 456 7890'),
('contact_info_location', 'Punto Fijo, Falcón, Venezuela'),
('contact_info_hours', 'Lun - Sáb: 8am - 5pm'),
('contact_info_facebook_url', '#'),
('contact_info_instagram_url', '#'),
('contact_info_youtube_url', '#'),
('footer_logo_text', 'TallerPro'),
('footer_description', 'Servicio mecánico profesional para vehículos de todas las marcas y modelos. Descubre la tranquilidad de un auto en buen estado con nuestros servicios personalizados.'),
('footer_copyright', '© 2025 TallerPro & DunaTech. Todos los derechos reservados. Inspirando confianza en la carretera desde 2000.');
`;

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')

    if (!serviceRoleKey || !supabaseUrl) {
      throw new Error('Missing Supabase credentials')
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey
      },
      body: JSON.stringify({ query: SQL_COMMAND })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Database setup failed: ${response.status} - ${errorText}`)
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Site content table created and populated successfully',
        result: result
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || 'Failed to create site content table'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
