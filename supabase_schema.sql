
-- Create the 'services' table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    estimated_time INT NOT NULL, -- in minutes
    include_parts BOOLEAN DEFAULT FALSE,
    category VARCHAR(50) NOT NULL, -- 'maintenance', 'repair', 'diagnostics', 'inspection'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'service_images' table
CREATE TABLE service_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'appointments' table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_tracking_code VARCHAR(255) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    vehicle_details JSONB NOT NULL, -- Stores make, model, year, license_plate, mileage
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled'
    estimated_completion TIMESTAMP WITH TIME ZONE,
    actual_completion TIMESTAMP WITH TIME ZONE,
    work_notes TEXT,
    additional_parts_cost NUMERIC(10, 2) DEFAULT 0.00,
    total_cost NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'service_timeline_events' table
CREATE TABLE service_timeline_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'scheduled', 'started', 'parts_ordered', 'completed', 'cancelled'
    description TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'payments' table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    service_cost NUMERIC(10, 2) NOT NULL,
    parts_cost NUMERIC(10, 2) DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50), -- 'cash', 'card', 'check', 'transfer'
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    payment_date TIMESTAMP WITH TIME ZONE,
    payment_details TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'testimonials' table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    vehicle_info VARCHAR(255),
    service_type VARCHAR(255),
    date_created DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'blog_posts' table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    published_date DATE NOT NULL,
    author VARCHAR(255),
    image_url TEXT,
    category VARCHAR(50), -- 'maintenance', 'repair', 'tips', 'seasonal'
    tags TEXT[], -- Array of tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'site_content' table
CREATE TABLE site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_name VARCHAR(255) UNIQUE NOT NULL,
    content JSONB NOT NULL, -- Flexible JSON for various content types
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'customer_messages' table
CREATE TABLE customer_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    service_tracking_code VARCHAR(255),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    message TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'general', -- 'inquiry', 'complaint', 'update', 'general'
    is_read BOOLEAN DEFAULT FALSE,
    admin_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only for most, insert for some)
-- Services: Public can read
CREATE POLICY "Public services are viewable." ON services
  FOR SELECT USING (TRUE);

-- Service Images: Public can read
CREATE POLICY "Public service images are viewable." ON service_images
  FOR SELECT USING (TRUE);

-- Appointments: Authenticated users can insert, customers can read their own
CREATE POLICY "Authenticated users can create appointments." ON appointments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Customers can view their own appointments." ON appointments
  FOR SELECT USING (auth.uid() = (SELECT id FROM auth.users WHERE email = customer_email)); -- This needs adjustment based on how customer_email maps to auth.users

-- Service Timeline Events: Customers can read their own
CREATE POLICY "Customers can view their own service timeline events." ON service_timeline_events
  FOR SELECT USING (EXISTS (SELECT 1 FROM appointments WHERE appointments.id = service_timeline_events.appointment_id AND auth.uid() = (SELECT id FROM auth.users WHERE email = appointments.customer_email)));

-- Payments: Authenticated users can insert, customers can read their own
CREATE POLICY "Authenticated users can create payments." ON payments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Customers can view their own payments." ON payments
  FOR SELECT USING (EXISTS (SELECT 1 FROM appointments WHERE appointments.id = payments.appointment_id AND auth.uid() = (SELECT id FROM auth.users WHERE email = appointments.customer_email)));

-- Testimonials: Public can read, authenticated can insert
CREATE POLICY "Public testimonials are viewable." ON testimonials
  FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can create testimonials." ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Blog Posts: Public can read
CREATE POLICY "Public blog posts are viewable." ON blog_posts
  FOR SELECT USING (TRUE);

-- Site Content: Public can read
CREATE POLICY "Public site content is viewable." ON site_content
  FOR SELECT USING (TRUE);

-- Customer Messages: Authenticated users can insert, customers can read their own
CREATE POLICY "Authenticated users can create customer messages." ON customer_messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Customers can view their own customer messages." ON customer_messages
  FOR SELECT USING (auth.uid() = (SELECT id FROM auth.users WHERE email = customer_email));

-- Admin policies (assuming 'admin' role)
-- Admins can perform all operations on all tables
CREATE POLICY "Admins can manage services." ON services
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Admins can manage service images." ON service_images
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Admins can manage appointments." ON appointments
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Admins can manage service timeline events." ON service_timeline_events
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Admins can manage payments." ON payments
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Admins can manage testimonials." ON testimonials
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Admins can manage blog posts." ON blog_posts
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Admins can manage site content." ON site_content
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Admins can manage customer messages." ON customer_messages
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

-- Functions (if necessary, based on automotive.ts)
-- Function to generate a unique service tracking code
CREATE OR REPLACE FUNCTION generate_service_tracking_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    prefix TEXT := 'MC';
    current_year TEXT := TO_CHAR(CURRENT_DATE, 'YYYY');
    random_suffix TEXT;
    new_code TEXT;
BEGIN
    LOOP
        random_suffix := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
        new_code := prefix || '-' || current_year || '-' || random_suffix;
        EXIT WHEN NOT EXISTS (SELECT 1 FROM appointments WHERE service_tracking_code = new_code);
    END LOOP;
    RETURN new_code;
END;
$$;

-- Trigger to set service_tracking_code before insert
CREATE TRIGGER set_service_tracking_code
BEFORE INSERT ON appointments
FOR EACH ROW
EXECUTE FUNCTION generate_service_tracking_code();

-- Function to update 'updated_at' column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for 'updated_at' on relevant tables
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON testimonials
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_messages_updated_at
BEFORE UPDATE ON customer_messages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
