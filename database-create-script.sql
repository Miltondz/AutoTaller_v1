-- Taller Mecánico Website Database Creation Script
-- Run this in Supabase SQL Editor

-- Drop existing tables if they exist
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- Create services table
CREATE TABLE services (
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
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url TEXT,
    published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author TEXT DEFAULT 'Taller Mecánico',
    slug TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    service_id UUID,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID,
    amount NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_date);
CREATE INDEX IF NOT EXISTS idx_services_price ON services(price);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Services policies
CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials policies
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Blog posts policies
CREATE POLICY "Public can view blog posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- Appointments policies
CREATE POLICY "Public can create appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can manage appointments" ON appointments FOR ALL USING (auth.role() = 'authenticated');

-- Payments policies
CREATE POLICY "Authenticated users can manage payments" ON payments FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data for testing

-- Sample services
INSERT INTO services (name, description, price, duration_minutes, image_url) VALUES
('Cambio de Aceite', 'Cambio de aceite y filtro, revisión de niveles y puntos de seguridad.', 50000, 45, '/images/services/oil-change.jpg'),
('Alineación y Balanceo', 'Alineación computarizada y balanceo de las cuatro ruedas.', 40000, 60, '/images/services/alignment.jpg'),
('Frenos', 'Revisión y cambio de pastillas y discos de freno.', 80000, 90, '/images/services/brakes.jpg'),
('Diagnóstico Electrónico', 'Escaneo computarizado para detectar fallas en el sistema electrónico.', 60000, 50, '/images/services/diagnostics.jpg');

-- Sample testimonials
INSERT INTO testimonials (author_name, content, rating) VALUES
('Juan Pérez', 'Excelente servicio, mi auto quedó como nuevo. Muy profesionales y atentos.', 5),
('María Rodriguez', 'Rápido y confiable. Me explicaron todo el proceso y los precios son justos.', 5),
('Carlos Gómez', 'Llevé mi camioneta por un ruido extraño y lo solucionaron en el mismo día. ¡Recomendados!', 5),
('Ana Martínez', 'Muy buen servicio, el personal es amable y calificado.', 4);

-- Sample blog posts
INSERT INTO blog_posts (title, content, excerpt, slug) VALUES
('5 Consejos para el Mantenimiento de tu Auto', 
 'Mantener tu auto en buen estado es clave para tu seguridad y para evitar reparaciones costosas. Aquí te dejamos 5 consejos prácticos que puedes seguir...', 
 'Descubre cómo mantener tu auto en las mejores condiciones.',
 '5-consejos-mantenimiento-auto'),
('¿Cuándo Debes Cambiar los Neumáticos?', 
 'Los neumáticos son el único punto de contacto de tu auto con la carretera, por lo que es vital saber cuándo es el momento de cambiarlos. Te explicamos cómo revisar la profundidad del dibujo y otros signos de desgaste.', 
 'Aprende a identificar el momento correcto para cambiar tus neumáticos.',
 'cuando-cambiar-neumaticos'),
('La Importancia de los Frenos en tu Vehículo', 
 'El sistema de frenos es uno de los componentes de seguridad más importantes de tu auto. Aprende a identificar las señales de que tus frenos necesitan mantenimiento y por qué no debes posponerlo.', 
 'No descuides tus frenos, son vitales para tu seguridad.',
 'importancia-frenos-vehiculo');

COMMIT;