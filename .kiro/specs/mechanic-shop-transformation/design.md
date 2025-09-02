# Mechanic Shop Management System - Design Document

## Overview

This design document outlines the transformation of the existing music teacher website into a comprehensive mechanic shop management system. The design leverages the proven React + TypeScript + Supabase architecture while implementing a complete visual redesign and enhanced functionality for automotive service operations.

The system maintains the successful dual-interface pattern but adapts it for automotive business needs:
- **Public Website**: Customer-facing interface with automotive branding and service booking
- **Admin Dashboard**: Comprehensive shop management with enhanced appointment tracking and service management
- **Client Portal**: Simple service tracking interface using service codes

## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + TypeScript)            │
├─────────────────────────────────────────────────────────────┤
│  Public Website  │  Admin Dashboard  │  Client Portal      │
│  - Homepage      │  - Analytics      │  - Service Tracking │
│  - Services      │  - Appointments   │  - Status Updates   │
│  - Booking       │  - Services Mgmt  │  - Messaging        │
│  - Blog/Gallery  │  - Payments       │                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Custom Hooks)                 │
├─────────────────────────────────────────────────────────────┤
│  - useServices    │  - useAppointments  │  - usePayments    │
│  - useVehicles    │  - useCustomers     │  - useReports     │
│  - useMockData    │  - useAuth          │  - useTracking    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Supabase)                       │
├─────────────────────────────────────────────────────────────┤
│  Database (PostgreSQL)  │  Authentication  │  Storage       │
│  - taller_servicios     │  - Admin Users   │  - Images      │
│  - citas_taller         │  - Sessions      │  - Documents   │
│  - payments             │  - RLS Policies  │                │
│  - vehicles             │                  │                │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack Retention

The design maintains the existing technology stack with enhancements:
- **Frontend**: React 18 + TypeScript + Vite (retained)
- **Styling**: Tailwind CSS with automotive color scheme (enhanced)
- **UI Components**: Radix UI with industrial styling (enhanced)
- **Backend**: Supabase with extended schema (enhanced)
- **Forms**: React Hook Form + Zod with automotive validation (enhanced)
- **Animations**: Framer Motion with mechanical themes (enhanced)

## Components and Interfaces

### UI/UX Design System

#### Color Palette Transformation
```css
/* Automotive Color Scheme */
:root {
  /* Primary Colors */
  --primary-900: #1a1a1a;     /* Deep charcoal */
  --primary-800: #2d2d2d;     /* Dark gray */
  --primary-700: #404040;     /* Medium gray */
  --primary-600: #525252;     /* Light gray */
  
  /* Accent Colors */
  --accent-600: #ea580c;      /* Safety orange */
  --accent-500: #f97316;      /* Bright orange */
  --accent-400: #fb923c;      /* Light orange */
  
  /* Secondary Colors */
  --secondary-600: #1e40af;   /* Metallic blue */
  --secondary-500: #3b82f6;   /* Bright blue */
  --secondary-400: #60a5fa;   /* Light blue */
  
  /* Status Colors */
  --success: #16a34a;         /* Green for completed */
  --warning: #ca8a04;         /* Yellow for in-progress */
  --error: #dc2626;           /* Red for cancelled */
}
```

#### Typography System
```css
/* Industrial Typography */
.heading-primary {
  font-family: 'Inter', 'Roboto', sans-serif;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.heading-secondary {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: -0.015em;
}

.body-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}
```

#### Component Design Patterns

**Industrial Button Design**
```tsx
interface IndustrialButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'tool'
  size: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

// Tool-inspired button with metallic effects
const ToolButton = styled.button`
  background: linear-gradient(145deg, #404040, #2d2d2d);
  border: 1px solid #525252;
  box-shadow: 
    inset 2px 2px 4px rgba(255,255,255,0.1),
    inset -2px -2px 4px rgba(0,0,0,0.3);
  
  &:hover {
    background: linear-gradient(145deg, #525252, #404040);
    transform: translateY(-1px);
  }
`
```

### Page Layout Designs

#### Homepage Layout
```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Bar                            │
│  [Logo] [Services] [About] [Gallery] [Contact] [Track]     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Hero Section                             │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │   Shop Image    │  │  "Professional Auto Repair"    │   │
│  │   (Mechanics    │  │  "Expert Service Since XXXX"   │   │
│  │   at work)      │  │  [Book Service] [Track Service] │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Services Preview                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Oil Change  │ │ Brake Repair│ │ Diagnostics │           │
│  │ [Image]     │ │ [Image]     │ │ [Image]     │           │
│  │ $XX.XX      │ │ $XX.XX      │ │ $XX.XX      │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Customer Testimonials                    │
│  "Great service..." - John D. | "Fixed my car..." - Sarah M.│
└─────────────────────────────────────────────────────────────┘
```

#### Service Booking Flow
```
Step 1: Service Selection
┌─────────────────────────────────────────────────────────────┐
│  Select Service Type                                        │
│  ○ Oil Change ($XX.XX - 30 min) [Parts Included]          │
│  ○ Brake Inspection ($XX.XX - 45 min) [Parts Extra]       │
│  ○ Engine Diagnostics ($XX.XX - 60 min) [Parts Extra]     │
└─────────────────────────────────────────────────────────────┘

Step 2: Vehicle Information
┌─────────────────────────────────────────────────────────────┐
│  Vehicle Details                                            │
│  Make: [________] Model: [________] Year: [____]           │
│  License Plate: [________] Mileage: [________]             │
└─────────────────────────────────────────────────────────────┘

Step 3: Date & Time Selection
┌─────────────────────────────────────────────────────────────┐
│  [Calendar Widget]     Available Times:                    │
│                        [9:00 AM] [10:00 AM] [11:00 AM]    │
│                        [1:00 PM] [2:00 PM] [3:00 PM]      │
└─────────────────────────────────────────────────────────────┘

Step 4: Confirmation
┌─────────────────────────────────────────────────────────────┐
│  Booking Summary                                            │
│  Service: Oil Change | Vehicle: 2020 Honda Civic          │
│  Date: March 15, 2024 | Time: 10:00 AM                    │
│  Your Tracking Code: MC-2024-001234                       │
└─────────────────────────────────────────────────────────────┘
```

### Admin Dashboard Interface

#### Dashboard Overview Layout
```
┌─────────────────────────────────────────────────────────────┐
│  Admin Navigation                                           │
│  [Dashboard] [Appointments] [Services] [Customers] [Reports]│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Key Metrics                                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Pending: 12 │ │In Progress:5│ │Completed: 28│           │
│  │ Appointments│ │ Services    │ │This Week    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Revenue:    │ │ Avg Time:   │ │ Customer    │           │
│  │ $12,450     │ │ 2.3 hours   │ │ Rating: 4.8 │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Today's Schedule                                           │
│  9:00 AM - Oil Change - Honda Civic (MC-001234) [Pending]  │
│  10:30 AM - Brake Repair - Ford F150 (MC-001235) [Progress]│
│  2:00 PM - Diagnostics - Toyota Camry (MC-001236) [Pending]│
└─────────────────────────────────────────────────────────────┘
```

#### Appointment Management Interface
```
┌─────────────────────────────────────────────────────────────┐
│  Appointment Details - MC-001234                            │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │ Customer Info   │  │ Vehicle Information             │   │
│  │ John Smith      │  │ 2020 Honda Civic               │   │
│  │ (555) 123-4567  │  │ License: ABC-123               │   │
│  │ john@email.com  │  │ Mileage: 45,000                │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Service: Oil Change ($45.00 - Parts Included)          │ │
│  │ Status: [Scheduled ▼] → [In Progress] → [Completed]    │ │
│  │ Estimated Time: 30 minutes                             │ │
│  │ Notes: [Customer requested synthetic oil]              │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Additional Costs (if applicable):                      │ │
│  │ Parts: $[____] Labor: $[____] Total: $[____]          │ │
│  │ [Update Status] [Send Message] [Print Invoice]        │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Client Portal Interface

#### Service Tracking Layout
```
┌─────────────────────────────────────────────────────────────┐
│  Track Your Service                                         │
│  Enter Tracking Code: [MC-001234] [Track]                  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Service Status - MC-001234                                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Your Vehicle: 2020 Honda Civic (ABC-123)               │ │
│  │ Service: Oil Change                                     │ │
│  │ Status: ● In Progress                                   │ │
│  │ Estimated Completion: Today, 11:00 AM                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Progress Timeline:                                      │ │
│  │ ✓ Scheduled (March 15, 9:00 AM)                       │ │
│  │ ● In Progress (March 15, 9:30 AM)                     │ │
│  │ ○ Completed (Estimated: 11:00 AM)                     │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Send Message to Shop:                                  │ │
│  │ [Text area for customer message]                       │ │
│  │ [Send Message]                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### Enhanced Database Schema

#### Services Table (taller_servicios)
```sql
CREATE TABLE taller_servicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    estimated_time INTEGER NOT NULL, -- in minutes
    include_parts BOOLEAN DEFAULT false,
    category VARCHAR(100), -- 'maintenance', 'repair', 'diagnostics'
    image_urls TEXT[], -- array of image URLs
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Appointments Table (citas_taller)
```sql
CREATE TABLE citas_taller (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_tracking_code VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    service_id UUID REFERENCES taller_servicios(id),
    vehicle_make VARCHAR(100) NOT NULL,
    vehicle_model VARCHAR(100) NOT NULL,
    vehicle_year INTEGER NOT NULL,
    vehicle_license_plate VARCHAR(20) NOT NULL,
    vehicle_mileage INTEGER,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled'
    estimated_completion TIMESTAMP WITH TIME ZONE,
    actual_completion TIMESTAMP WITH TIME ZONE,
    work_notes TEXT,
    additional_parts_cost DECIMAL(10,2) DEFAULT 0,
    total_cost DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Enhanced Payments Table
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES citas_taller(id),
    service_cost DECIMAL(10,2) NOT NULL,
    parts_cost DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50), -- 'cash', 'card', 'check', 'transfer'
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    payment_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Service Images Table
```sql
CREATE TABLE service_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES taller_servicios(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Customer Messages Table
```sql
CREATE TABLE customer_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES citas_taller(id),
    service_tracking_code VARCHAR(20),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    message TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'inquiry', -- 'inquiry', 'complaint', 'update'
    is_read BOOLEAN DEFAULT false,
    admin_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Mock Data Structure

During development, the system will use comprehensive mock data:

```typescript
// Mock Services Data
export const mockServices = [
  {
    id: 'srv-001',
    name: 'Oil Change',
    description: 'Complete oil and filter change with multi-point inspection',
    price: 45.00,
    estimated_time: 30,
    include_parts: true,
    category: 'maintenance',
    image_urls: ['/images/oil-change-1.jpg', '/images/oil-change-2.jpg'],
    is_active: true
  },
  {
    id: 'srv-002',
    name: 'Brake Inspection',
    description: 'Comprehensive brake system inspection and diagnosis',
    price: 75.00,
    estimated_time: 45,
    include_parts: false,
    category: 'diagnostics',
    image_urls: ['/images/brake-inspection.jpg'],
    is_active: true
  }
  // ... more services
];

// Mock Appointments Data
export const mockAppointments = [
  {
    id: 'apt-001',
    service_tracking_code: 'MC-2024-001234',
    customer_name: 'John Smith',
    customer_email: 'john@email.com',
    customer_phone: '(555) 123-4567',
    service_id: 'srv-001',
    vehicle_make: 'Honda',
    vehicle_model: 'Civic',
    vehicle_year: 2020,
    vehicle_license_plate: 'ABC-123',
    vehicle_mileage: 45000,
    appointment_date: '2024-03-15',
    appointment_time: '10:00:00',
    status: 'in_progress',
    work_notes: 'Customer requested synthetic oil',
    additional_parts_cost: 0,
    total_cost: 45.00
  }
  // ... more appointments
];
```

## Error Handling

### Validation Strategy

#### Form Validation Rules
```typescript
// Vehicle Information Validation
const vehicleSchema = z.object({
  make: z.string().min(2, 'Make must be at least 2 characters'),
  model: z.string().min(2, 'Model must be at least 2 characters'),
  year: z.number()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  license_plate: z.string()
    .min(3, 'License plate must be at least 3 characters')
    .max(10, 'License plate cannot exceed 10 characters'),
  mileage: z.number()
    .min(0, 'Mileage cannot be negative')
    .max(999999, 'Mileage seems unrealistic')
});

// Service Validation
const serviceSchema = z.object({
  name: z.string().min(3, 'Service name must be at least 3 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  estimated_time: z.number().min(15, 'Estimated time must be at least 15 minutes'),
  include_parts: z.boolean(),
  category: z.enum(['maintenance', 'repair', 'diagnostics', 'inspection'])
});
```

#### Error Handling Patterns
```typescript
// API Error Handling
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    // Database connection errors
    if (error.message.includes('connection')) {
      return 'Unable to connect to the database. Please try again later.';
    }
    
    // Validation errors
    if (error.message.includes('validation')) {
      return 'Please check your input and try again.';
    }
    
    // Authentication errors
    if (error.message.includes('auth')) {
      return 'Please log in to access this feature.';
    }
    
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// User Feedback Components
const ErrorAlert = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
    <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
    <span className="text-red-800">{message}</span>
  </div>
);

const SuccessAlert = ({ message }: { message: string }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
    <span className="text-green-800">{message}</span>
  </div>
);
```

## Testing Strategy

### Component Testing Approach

#### Mock Data Testing
```typescript
// Service Component Tests
describe('ServiceCard Component', () => {
  it('displays service information correctly', () => {
    const mockService = mockServices[0];
    render(<ServiceCard service={mockService} />);
    
    expect(screen.getByText('Oil Change')).toBeInTheDocument();
    expect(screen.getByText('$45.00')).toBeInTheDocument();
    expect(screen.getByText('Parts Included')).toBeInTheDocument();
  });
  
  it('handles booking button click', () => {
    const mockService = mockServices[0];
    const onBook = jest.fn();
    render(<ServiceCard service={mockService} onBook={onBook} />);
    
    fireEvent.click(screen.getByText('Book Service'));
    expect(onBook).toHaveBeenCalledWith(mockService.id);
  });
});

// Appointment Management Tests
describe('AppointmentManager', () => {
  it('updates appointment status correctly', async () => {
    const mockAppointment = mockAppointments[0];
    render(<AppointmentManager appointment={mockAppointment} />);
    
    const statusSelect = screen.getByDisplayValue('in_progress');
    fireEvent.change(statusSelect, { target: { value: 'completed' } });
    
    await waitFor(() => {
      expect(screen.getByText('Status updated successfully')).toBeInTheDocument();
    });
  });
});
```

#### Integration Testing
```typescript
// Booking Flow Integration Test
describe('Complete Booking Flow', () => {
  it('allows customer to book service end-to-end', async () => {
    render(<BookingPage />);
    
    // Select service
    fireEvent.click(screen.getByText('Oil Change'));
    
    // Fill vehicle information
    fireEvent.change(screen.getByLabelText('Make'), { target: { value: 'Honda' } });
    fireEvent.change(screen.getByLabelText('Model'), { target: { value: 'Civic' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2020' } });
    fireEvent.change(screen.getByLabelText('License Plate'), { target: { value: 'ABC-123' } });
    
    // Select date and time
    fireEvent.click(screen.getByText('March 15'));
    fireEvent.click(screen.getByText('10:00 AM'));
    
    // Submit booking
    fireEvent.click(screen.getByText('Book Appointment'));
    
    await waitFor(() => {
      expect(screen.getByText(/tracking code/i)).toBeInTheDocument();
    });
  });
});
```

### Performance Testing

#### Load Testing Considerations
- Test appointment booking under concurrent users
- Validate dashboard performance with large datasets
- Ensure image upload and optimization works efficiently
- Test service tracking code generation uniqueness

#### Accessibility Testing
- Ensure all forms are keyboard navigable
- Validate screen reader compatibility
- Test color contrast ratios for automotive color scheme
- Verify focus management in modal dialogs

This design provides a comprehensive foundation for transforming the music teacher website into a professional mechanic shop management system while maintaining the robust architecture and adding automotive-specific functionality.