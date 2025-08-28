
#!/usr/bin/env python3
"""
Music Teacher Website Database Setup
This script creates all necessary database tables in Supabase
"""

import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# Supabase configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL")
DB_PASSWORD = os.environ.get("DB_PASSWORD")

if not SUPABASE_URL or not DB_PASSWORD:
    print("Error: SUPABASE_URL and DB_PASSWORD must be set in the environment.")
    exit(1)

# Construct the database connection string
DB_CONNECTION_STRING = f"postgres://postgres:{DB_PASSWORD}@{SUPABASE_URL.replace('https://', '')}:5432/postgres"

class SupabaseDatabaseSetup:
    def __init__(self):
        self.conn = None
        self.cursor = None

    def connect(self):
        """Connect to the PostgreSQL database"""
        try:
            self.conn = psycopg2.connect(DB_CONNECTION_STRING)
            self.cursor = self.conn.cursor()
            print("Successfully connected to the database.")
            return True
        except psycopg2.Error as e:
            print(f"Error connecting to the database: {e}")
            return False

    def create_table(self, table_name, table_sql):
        """Create a single table using direct SQL"""
        try:
            print(f"Creating {table_name} table...")
            self.cursor.execute(table_sql)
            self.conn.commit()
            print(f"Successfully created {table_name} table!")
            return True
        except psycopg2.Error as e:
            print(f"Error creating {table_name} table: {e}")
            self.conn.rollback()
            return False

    def create_all_tables(self):
        """Create all required tables for the music teacher website"""
        print("Starting Music Teacher Website Database Setup...")

        tables = {
            'services': '''
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
                ALTER TABLE services ENABLE ROW LEVEL SECURITY;
                CREATE POLICY IF NOT EXISTS "Public can view services" ON services FOR SELECT USING (true);
                CREATE POLICY IF NOT EXISTS "Authenticated users can manage services" ON services FOR ALL USING (auth.role() = 'authenticated');
            ''',

            'testimonials': '''
                CREATE TABLE IF NOT EXISTS testimonials (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    author_name TEXT NOT NULL,
                    content TEXT NOT NULL,
                    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
                    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
                ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
                CREATE POLICY IF NOT EXISTS "Public can view testimonials" ON testimonials FOR SELECT USING (true);
                CREATE POLICY IF NOT EXISTS "Authenticated users can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
            ''',

            'blog_posts': '''
                CREATE TABLE IF NOT EXISTS blog_posts (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    title TEXT NOT NULL,
                    content TEXT NOT NULL,
                    excerpt TEXT,
                    image_url TEXT,
                    published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    author TEXT DEFAULT 'Music Teacher',
                    slug TEXT UNIQUE,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
                ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
                CREATE POLICY IF NOT EXISTS "Public can view blog posts" ON blog_posts FOR SELECT USING (true);
                CREATE POLICY IF NOT EXISTS "Authenticated users can manage blog posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
            ''',

            'appointments': '''
                CREATE TABLE IF NOT EXISTS appointments (
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
                CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
                CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
                ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
                CREATE POLICY IF NOT EXISTS "Public can create appointments" ON appointments FOR INSERT WITH CHECK (true);
                CREATE POLICY IF NOT EXISTS "Authenticated users can manage appointments" ON appointments FOR ALL USING (auth.role() = 'authenticated');
            ''',

            'payments': '''
                CREATE TABLE IF NOT EXISTS payments (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    appointment_id UUID,
                    amount NUMERIC(10,2) NOT NULL,
                    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
                    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    payment_method TEXT,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
                CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
                ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
                CREATE POLICY IF NOT EXISTS "Authenticated users can manage payments" ON payments FOR ALL USING (auth.role() = 'authenticated');
            '''
        }

        if not self.connect():
            return

        success_count = 0
        for table_name, table_sql in tables.items():
            if self.create_table(table_name, table_sql):
                success_count += 1

        print(f"Database setup complete! {success_count}/{len(tables)} tables created successfully.")

        if success_count == len(tables):
            print("All tables created successfully!")
            print("The admin dashboard should now work properly.")
        else:
            print("Some tables failed to create. Manual setup may be required.")

        self.close()

    def close(self):
        """Close the database connection"""
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
        print("Database connection closed.")

def main():
    setup = SupabaseDatabaseSetup()
    setup.create_all_tables()

if __name__ == "__main__":
    main()
