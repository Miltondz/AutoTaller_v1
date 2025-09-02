# Mechanic Shop Management System - Requirements Document

## Introduction

This project transforms the existing music teacher website into a comprehensive mechanic shop management system. The transformation reuses the proven React + TypeScript + Supabase architecture while adapting content, database schema, and business logic for automotive repair shop operations.

The system maintains the dual-interface approach with enhanced functionality:
- **Public Website**: Customer-facing pages for service browsing, appointment booking, and basic service tracking
- **Admin Dashboard**: Complete shop management including appointments, services, payments, and reporting
- **Client Dashboard**: Simple service tracking interface for customers using service codes

Key transformation areas include content adaptation, database schema enhancement, and business logic modification to support automotive service workflows.

## Requirements

### Requirement 1: Complete UI/UX Design Transformation

**User Story:** As a mechanic shop owner, I want a completely redesigned website with automotive branding and industrial aesthetics so that customers immediately recognize this as a professional automotive service business.

#### Acceptance Criteria

1. WHEN visitors access any page THEN the system SHALL use a completely new color palette with industrial/automotive themes (dark grays, metallic blues, orange accents, etc.)
2. WHEN viewing the interface THEN the system SHALL display automotive-specific iconography (wrenches, gears, vehicles, tools) replacing all music-related icons
3. WHEN navigating the site THEN the system SHALL use typography that conveys industrial strength and professionalism (bold, sans-serif fonts)
4. WHEN viewing layouts THEN the system SHALL implement a more structured, grid-based design reflecting mechanical precision
5. WHEN interacting with elements THEN the system SHALL use hover effects and animations that suggest mechanical movement and precision
6. WHEN viewing images THEN the system SHALL display high-quality automotive photography (shop interior, vehicles, equipment, team in work uniforms)
7. WHEN accessing forms THEN the system SHALL use industrial-style form elements with clear, functional design
8. WHEN viewing buttons and CTAs THEN the system SHALL use automotive-inspired styling (metallic effects, tool-like appearances)

### Requirement 2: Automotive Content and Branding

**User Story:** As a mechanic shop owner, I want all website content to reflect automotive services and expertise so that customers understand our specialization and capabilities.

#### Acceptance Criteria

1. WHEN a visitor accesses the homepage THEN the system SHALL display automotive-themed hero sections featuring the shop, mechanics at work, or vehicles being serviced
2. WHEN a visitor views the services section THEN the system SHALL show comprehensive mechanic shop services (Brake Installation, Oil Change, Engine Diagnostics, Transmission Repair, etc.)
3. WHEN a visitor browses testimonials THEN the system SHALL display authentic reviews from automotive customers about vehicle repairs and service quality
4. WHEN a visitor accesses the blog THEN the system SHALL show automotive-focused articles (maintenance guides, troubleshooting tips, seasonal car care)
5. WHEN a visitor views the gallery THEN the system SHALL display before/after repair photos, shop facilities, diagnostic equipment, and team expertise
6. WHEN viewing the about section THEN the system SHALL highlight automotive expertise, certifications, and years of mechanical experience

### Requirement 3: Service Management Enhancement

**User Story:** As a mechanic shop owner, I want to manage automotive services with specific pricing and parts information so that I can provide accurate quotes to customers.

#### Acceptance Criteria

1. WHEN creating a new service THEN the system SHALL allow specifying if the service price includes parts cost
2. WHEN defining a service THEN the system SHALL require an estimated work time field
3. WHEN a customer views services THEN the system SHALL clearly indicate whether parts are included in the price
4. WHEN managing services THEN the system SHALL support automotive service categories (maintenance, repair, diagnostics, etc.)
5. WHEN editing services THEN the system SHALL validate that estimated time is a positive number

### Requirement 4: Enhanced Appointment Booking System

**User Story:** As a customer, I want to book appointments for my vehicle with complete information so that the shop can prepare for my service and I receive a tracking code.

#### Acceptance Criteria

1. WHEN booking an appointment THEN the system SHALL require complete vehicle details (make, model, year, license plate, mileage)
2. WHEN submitting a booking THEN the system SHALL validate all required information and generate a unique service tracking code
3. WHEN appointment is confirmed THEN customers SHALL receive their service tracking code for future reference
4. WHEN an appointment is created THEN the system SHALL set initial status to "scheduled" and estimated completion time
5. WHEN booking THEN the system SHALL display service duration and whether parts are included in pricing
6. WHEN selecting services THEN the system SHALL show available time slots based on service duration requirements

### Requirement 5: Advanced Appointment Management

**User Story:** As a shop manager, I want to track appointment progress and manage service details so that I can efficiently run shop operations and provide accurate billing.

#### Acceptance Criteria

1. WHEN viewing appointments THEN the system SHALL display vehicle details, customer information, and current status in an organized interface
2. WHEN managing appointments THEN the system SHALL allow status transitions (scheduled → in_progress → completed, or cancelled at any stage)
3. WHEN updating to "in_progress" THEN the system SHALL record start time and allow adding work notes
4. WHEN completing an appointment THEN the system SHALL require final service details and allow adding parts costs if not included
5. WHEN adding parts costs THEN the system SHALL calculate total cost (service + parts) and update payment records
6. WHEN appointment status changes THEN the system SHALL automatically update timestamps and notify relevant parties
7. WHEN viewing appointment history THEN the system SHALL show complete timeline of status changes and work performed

### Requirement 6: Enhanced Payment Tracking

**User Story:** As a shop owner, I want to track payments for services and parts separately so that I can manage my finances accurately.

#### Acceptance Criteria

1. WHEN recording a payment THEN the system SHALL allow specifying if payment is for service, parts, or both
2. WHEN completing an appointment with additional parts THEN the system SHALL create separate payment records
3. WHEN viewing payment history THEN the system SHALL show breakdown of service vs parts costs
4. WHEN generating reports THEN the system SHALL calculate total revenue including parts and labor
5. WHEN managing payments THEN the system SHALL support different payment methods

### Requirement 7: Dashboard Analytics for Shop Operations

**User Story:** As a shop manager, I want to see key operational metrics and quick access to critical information so that I can monitor business performance and workflow efficiency.

#### Acceptance Criteria

1. WHEN accessing the admin dashboard THEN the system SHALL display key metrics: pending appointments, services in progress, completed this week, monthly revenue
2. WHEN viewing operational status THEN the system SHALL show current workload distribution and upcoming appointments
3. WHEN monitoring performance THEN the system SHALL display average service completion times and customer satisfaction trends
4. WHEN reviewing financial data THEN the system SHALL show revenue breakdown (services vs parts) and payment status overview
5. WHEN identifying urgent items THEN the system SHALL highlight overdue appointments and pending customer communications
6. WHEN accessing quick actions THEN the system SHALL provide shortcuts to common tasks (new appointment, service lookup, customer messages)

### Requirement 8: Database Schema Adaptation

**User Story:** As a system administrator, I want the database to support automotive business operations so that all shop data is properly structured and accessible.

#### Acceptance Criteria

1. WHEN storing services THEN the system SHALL include include_parts boolean field, estimated_time field, and support for multiple service images
2. WHEN saving appointments THEN the system SHALL store vehicle_details, status fields, and generate unique service_tracking_code
3. WHEN recording payments THEN the system SHALL include payment_details for service/parts breakdown
4. WHEN querying data THEN the system SHALL maintain referential integrity between appointments, services, and payments
5. WHEN migrating data THEN the system SHALL preserve existing table relationships while adding new fields
6. WHEN creating service images THEN the system SHALL store image URLs and metadata linked to specific services

### Requirement 9: Form Validation and User Experience

**User Story:** As a user of the system, I want comprehensive validation and clear feedback so that I can successfully complete all tasks without errors and understand system responses.

#### Acceptance Criteria

1. WHEN entering vehicle details THEN the system SHALL validate make, model, year (1900-current), license plate format, and mileage (positive number)
2. WHEN creating services THEN the system SHALL validate service name uniqueness, estimated time (positive number), and price format
3. WHEN submitting forms THEN the system SHALL provide specific, actionable error messages for each invalid field
4. WHEN successful operations occur THEN the system SHALL display clear confirmation messages with relevant details
5. WHEN updating critical data THEN the system SHALL require confirmation dialogs for destructive actions
6. WHEN form submission fails THEN the system SHALL preserve user input and highlight specific fields requiring correction
7. WHEN adding monetary amounts THEN the system SHALL validate currency format and prevent negative values

### Requirement 10: Content Management for Automotive Context

**User Story:** As a shop owner, I want to manage automotive-related content so that my website provides valuable information to customers.

#### Acceptance Criteria

1. WHEN creating blog posts THEN the system SHALL support automotive topics and technical content
2. WHEN managing testimonials THEN the system SHALL allow customer reviews about vehicle services
3. WHEN updating gallery THEN the system SHALL support before/after vehicle photos and shop images
4. WHEN editing content THEN the system SHALL maintain SEO optimization for automotive keywords
5. WHEN publishing content THEN the system SHALL ensure all automotive terminology is properly displayed

### Requirement 11: Service Image Management

**User Story:** As a shop owner, I want to upload and manage images for each service so that customers can see visual examples of the work we perform.

#### Acceptance Criteria

1. WHEN creating a service THEN the system SHALL allow uploading multiple images related to that service
2. WHEN editing services THEN the system SHALL support adding, removing, and reordering service images
3. WHEN customers view services THEN the system SHALL display service images in an attractive gallery format
4. WHEN uploading images THEN the system SHALL validate file types and sizes for optimal performance
5. WHEN managing images THEN the system SHALL provide image compression and optimization automatically

### Requirement 12: Client Access and Service Tracking

**User Story:** As a customer, I want to book appointments, browse the website, and track my service progress through a simple interface designed for my needs.

#### Acceptance Criteria

1. WHEN booking appointments THEN customers SHALL provide complete vehicle information (make, model, year, license plate, mileage) and service preferences
2. WHEN accessing the public website THEN customers SHALL browse all public content (services, blog, gallery, contact, about) without restrictions
3. WHEN using a service tracking code THEN customers SHALL access a dedicated client dashboard showing only their service information
4. WHEN viewing service status THEN customers SHALL see essential information: current status, estimated completion, service description, and total cost
5. WHEN communicating with the shop THEN customers SHALL send messages through a simple form linked to their service tracking code
6. WHEN receiving updates THEN customers SHALL see status changes reflected in real-time without technical jargon
7. WHEN accessing client features THEN the system SHALL ensure customers only see their own service information and cannot access other customer data

### Requirement 13: Admin Services Rendered Management

**User Story:** As a shop administrator, I want comprehensive service tracking and reporting capabilities so that I can maintain complete records, analyze performance, and manage billing accurately.

#### Acceptance Criteria

1. WHEN accessing the Services Rendered section THEN administrators SHALL view all completed services with comprehensive details (customer, vehicle, service type, completion date, costs)
2. WHEN managing service records THEN administrators SHALL edit service details, add work notes, attach photos, and update final costs
3. WHEN generating reports THEN the system SHALL provide filtering options (date range, service type, customer, mechanic) and export capabilities
4. WHEN analyzing performance THEN administrators SHALL view metrics including average completion times, revenue per service type, and customer return rates
5. WHEN reviewing vehicle history THEN administrators SHALL access complete service records for any vehicle across all appointments
6. WHEN managing billing THEN administrators SHALL track service costs, parts costs, and payment status for accurate financial reporting
7. WHEN searching records THEN administrators SHALL find services by customer name, vehicle details, service type, or date range
8. WHEN archiving data THEN administrators SHALL maintain historical records while keeping the active interface performant

### Requirement 14: Role-Based Access Control

**User Story:** As a system user, I want appropriate access levels based on my role so that customers and administrators have the right level of functionality.

#### Acceptance Criteria

1. WHEN customers access the system THEN they SHALL have full access to public website pages
2. WHEN customers use tracking codes THEN they SHALL access only their client-side dashboard with basic service information
3. WHEN administrators log in THEN they SHALL access the full admin dashboard with all management features
4. WHEN administrators manage services THEN they SHALL have access to the Services Rendered section for complete service tracking
5. WHEN different user types access dashboards THEN the system SHALL enforce appropriate permission levels
6. WHEN unauthorized access is attempted THEN the system SHALL redirect to appropriate login or public pages
7. WHEN session management occurs THEN the system SHALL maintain proper authentication for admin vs client access

### Requirement 15: Mock Data Development Support

**User Story:** As a developer, I want to use mock data during development so that I can build features independently of database changes.

#### Acceptance Criteria

1. WHEN developing features THEN the system SHALL use JSON mock data that matches the new schema structure
2. WHEN testing functionality THEN mock data SHALL include realistic automotive service and vehicle information
3. WHEN switching to real database THEN the system SHALL seamlessly replace mock data with database connections
4. WHEN validating features THEN mock data SHALL support all new fields and relationships
5. WHEN demonstrating the system THEN mock data SHALL provide comprehensive examples of shop operations