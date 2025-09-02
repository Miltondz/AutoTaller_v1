-- Taller Mecánico Website Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    author_role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    service_id UUID,
    is_booked BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID,
    amount NUMERIC(10,2) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'pending',
    payment_method TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media_gallery table
CREATE TABLE IF NOT EXISTS media_gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video', 'youtube', 'instagram')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT NOT NULL DEFAULT 'general',
    tags TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    inquiry_type TEXT NOT NULL DEFAULT 'general',
    is_read BOOLEAN DEFAULT FALSE,
    admin_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Services policies - public read, authenticated write
DROP POLICY IF EXISTS "Services are publicly readable" ON services;
CREATE POLICY "Services are publicly readable" ON services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage services" ON services;
CREATE POLICY "Authenticated users can manage services" ON services 
FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials policies - public read, authenticated write
DROP POLICY IF EXISTS "Testimonials are publicly readable" ON testimonials;
CREATE POLICY "Testimonials are publicly readable" ON testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON testimonials;
CREATE POLICY "Authenticated users can manage testimonials" ON testimonials 
FOR ALL USING (auth.role() = 'authenticated');

-- Blog posts policies - public read, authenticated write
DROP POLICY IF EXISTS "Blog posts are publicly readable" ON blog_posts;
CREATE POLICY "Blog posts are publicly readable" ON blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON blog_posts;
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts 
FOR ALL USING (auth.role() = 'authenticated');

-- Appointments policies - public can create, authenticated can manage
DROP POLICY IF EXISTS "Anyone can create appointments" ON appointments;
CREATE POLICY "Anyone can create appointments" ON appointments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view appointments" ON appointments;
CREATE POLICY "Anyone can view appointments" ON appointments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage appointments" ON appointments;
CREATE POLICY "Authenticated users can manage appointments" ON appointments 
FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can delete appointments" ON appointments;
CREATE POLICY "Authenticated users can delete appointments" ON appointments 
FOR DELETE USING (auth.role() = 'authenticated');

-- Payments policies - authenticated only
DROP POLICY IF EXISTS "Authenticated users can manage payments" ON payments;
CREATE POLICY "Authenticated users can manage payments" ON payments 
FOR ALL USING (auth.role() = 'authenticated');

-- Media gallery policies - public read, authenticated write
DROP POLICY IF EXISTS "Media gallery items are publicly readable" ON media_gallery;
CREATE POLICY "Media gallery items are publicly readable" ON media_gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage media gallery" ON media_gallery;
CREATE POLICY "Authenticated users can manage media gallery" ON media_gallery 
FOR ALL USING (auth.role() = 'authenticated');

-- Contact messages policies - anyone can create, authenticated can manage
DROP POLICY IF EXISTS "Anyone can create contact messages" ON contact_messages;
CREATE POLICY "Anyone can create contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage contact messages" ON contact_messages;
CREATE POLICY "Authenticated users can manage contact messages" ON contact_messages 
FOR SELECT, UPDATE, DELETE USING (auth.role() = 'authenticated');

-- Insert initial services data
INSERT INTO services (name, description, price, duration_minutes, image_url) VALUES
('Cambio de Aceite', 'Cambio de aceite y filtro, revisión de niveles y puntos de seguridad.', 50000, 45, '/images/services/oil-change.jpg'),
('Alineación y Balanceo', 'Alineación computarizada y balanceo de las cuatro ruedas.', 40000, 60, '/images/services/alignment.jpg'),
('Frenos', 'Revisión y cambio de pastillas y discos de freno.', 80000, 90, '/images/services/brakes.jpg'),
('Diagnóstico Electrónico', 'Escaneo computarizado para detectar fallas en el sistema electrónico.', 60000, 50, '/images/services/diagnostics.jpg')
ON CONFLICT (id) DO NOTHING;

-- Insert testimonials data
INSERT INTO testimonials (author, content, author_role) VALUES
('Juan Pérez', 'Excelente servicio, mi auto quedó como nuevo. Muy profesionales y atentos.', 'Cliente Satisfecho'),
('María Rodriguez', 'Rápido y confiable. Me explicaron todo el proceso y los precios son justos.', 'Cliente Frecuente'),
('Carlos Gómez', 'Llevé mi camioneta por un ruido extraño y lo solucionaron en el mismo día. ¡Recomendados!', 'Cliente Ocasional')
ON CONFLICT (id) DO NOTHING;

-- Insert blog posts data
INSERT INTO blog_posts (title, slug, content, image_url) VALUES
('5 Consejos para el Mantenimiento de tu Auto', '5-consejos-mantenimiento-auto', 'Mantener tu auto en buen estado es clave para tu seguridad y para evitar reparaciones costosas. Aquí te dejamos 5 consejos prácticos que puedes seguir...', '/images/blog/mantenimiento.jpg'),
('¿Cuándo Debes Cambiar los Neumáticos?', 'cuando-cambiar-neumaticos', 'Los neumáticos son el único punto de contacto de tu auto con la carretera, por lo que es vital saber cuándo es el momento de cambiarlos. Te explicamos cómo revisar la profundidad del dibujo y otros signos de desgaste.', '/images/blog/neumaticos.jpg'),
('La Importancia de los Frenos en tu Vehículo', 'importancia-frenos-vehiculo', 'El sistema de frenos es uno de los componentes de seguridad más importantes de tu auto. Aprende a identificar las señales de que tus frenos necesitan mantenimiento y por qué no debes posponerlo.', '/images/blog/frenos.jpg')
ON CONFLICT (slug) DO NOTHING;