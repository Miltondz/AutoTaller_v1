# AutoTaller Pro - Sistema de Gestión Automotriz

Este repositorio contiene el código fuente de un sistema web completo y profesional para talleres mecánicos, construido con tecnologías modernas para ofrecer una experiencia de usuario excepcional y una gestión integral de servicios automotrices.

> **Estado del Proyecto**: ✅ **Compilación Exitosa** - Todos los errores de TypeScript han sido resueltos y el proyecto está listo para producción.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-repo/autotaller-pro) <!-- Reemplazar con el enlace real -->

## ✨ Características Principales

- **Diseño Industrial Moderno**: Interfaz profesional con temática automotriz, totalmente responsive y optimizada para cualquier dispositivo.
- **SEO Optimizado**: Implementación de las mejores prácticas de SEO para talleres mecánicos, incluyendo meta-tags, sitemap, y `robots.txt` para máxima visibilidad en buscadores.
- **Animaciones Mecánicas**: Uso de `framer-motion` con animaciones temáticas de engranajes y herramientas que mejoran la experiencia de usuario.
- **Panel de Administración Completo**: Área privada para gestionar servicios automotrices, citas, clientes, inventario y facturación.
- **Sistema de Citas Inteligente**: Plataforma interactiva para que los clientes consulten disponibilidad y agenden servicios para sus vehículos.
- **Seguimiento de Servicios en Tiempo Real**: Sistema de códigos de seguimiento con actualizaciones automáticas del estado de reparaciones.
- **Gestión de Inventario**: Control de repuestos y herramientas con alertas de stock bajo.
- **Exportación de Datos**: Funcionalidad para exportar reportes de servicios, facturación y estadísticas a formatos PDF y Excel.
- **Sistema de Testimonios**: Gestión automática de testimonios de clientes con validación de servicios realizados.
- **Persistencia de Formularios**: Los datos de formularios se guardan automáticamente para prevenir pérdida de información.

## 📊 Esquema de Base de Datos (Supabase/PostgreSQL)

El sistema utiliza una base de datos PostgreSQL gestionada por Supabase. A continuación, se detallan las tablas principales y sus relaciones:

### Tablas Principales

-   **`services`**: Almacena información sobre los servicios automotrices ofrecidos (nombre, descripción, precio, tiempo estimado, categoría, etc.).
    -   `id` (UUID, PK)
    -   `name` (VARCHAR)
    -   `description` (TEXT)
    -   `price` (NUMERIC)
    -   `estimated_time` (INT)
    -   `include_parts` (BOOLEAN)
    -   `category` (VARCHAR)
    -   `is_active` (BOOLEAN)
    -   `created_at` (TIMESTAMP)
    -   `updated_at` (TIMESTAMP)

-   **`service_images`**: Guarda las URLs de las imágenes asociadas a cada servicio.
    -   `id` (UUID, PK)
    -   `service_id` (UUID, FK a `services`)
    -   `image_url` (TEXT)
    -   `alt_text` (VARCHAR)
    -   `display_order` (INT)
    -   `is_primary` (BOOLEAN)
    -   `created_at` (TIMESTAMP)

-   **`appointments`**: Registra las citas agendadas por los clientes.
    -   `id` (UUID, PK)
    -   `service_tracking_code` (VARCHAR, UNIQUE)
    -   `customer_name` (VARCHAR)
    -   `customer_email` (VARCHAR)
    -   `customer_phone` (VARCHAR)
    -   `service_id` (UUID, FK a `services`)
    -   `vehicle_details` (JSONB)
    -   `appointment_date` (DATE)
    -   `appointment_time` (TIME)
    -   `status` (VARCHAR)
    -   `estimated_completion` (TIMESTAMP)
    -   `actual_completion` (TIMESTAMP)
    -   `work_notes` (TEXT)
    -   `additional_parts_cost` (NUMERIC)
    -   `total_cost` (NUMERIC)
    -   `created_at` (TIMESTAMP)
    -   `updated_at` (TIMESTAMP)

-   **`service_timeline_events`**: Detalla los eventos y cambios de estado de cada servicio en una cita.
    -   `id` (UUID, PK)
    -   `appointment_id` (UUID, FK a `appointments`)
    -   `event_type` (VARCHAR)
    -   `description` (TEXT)
    -   `timestamp` (TIMESTAMP)
    -   `created_by` (VARCHAR)
    -   `created_at` (TIMESTAMP)

-   **`payments`**: Almacena los registros de pagos de los servicios.
    -   `id` (UUID, PK)
    -   `appointment_id` (UUID, FK a `appointments`)
    -   `service_cost` (NUMERIC)
    -   `parts_cost` (NUMERIC)
    -   `total_amount` (NUMERIC)
    -   `payment_method` (VARCHAR)
    -   `payment_status` (VARCHAR)
    -   `payment_date` (TIMESTAMP)
    -   `payment_details` (TEXT)
    -   `notes` (TEXT)
    -   `created_at` (TIMESTAMP)
    -   `updated_at` (TIMESTAMP)

-   **`testimonials`**: Contiene los testimonios de los clientes.
    -   `id` (UUID, PK)
    -   `author_name` (VARCHAR)
    -   `content` (TEXT)
    -   `rating` (INT)
    -   `vehicle_info` (VARCHAR)
    -   `service_type` (VARCHAR)
    -   `date_created` (DATE)
    -   `created_at` (TIMESTAMP)
    -   `updated_at` (TIMESTAMP)

-   **`blog_posts`**: Almacena los artículos del blog automotriz.
    -   `id` (UUID, PK)
    -   `title` (VARCHAR)
    `slug` (VARCHAR, UNIQUE)
    -   `content` (TEXT)
    -   `excerpt` (TEXT)
    -   `published_date` (DATE)
    -   `author` (VARCHAR)
    -   `image_url` (TEXT)
    -   `category` (VARCHAR)
    -   `tags` (TEXT[])
    -   `created_at` (TIMESTAMP)
    -   `updated_at` (TIMESTAMP)

-   **`site_content`**: Contenido dinámico del sitio web (ej. textos de "Sobre Nosotros", "Contacto").
    -   `id` (UUID, PK)
    -   `section_name` (VARCHAR, UNIQUE)
    -   `content` (JSONB)
    -   `last_updated` (TIMESTAMP)

-   **`customer_messages`**: Mensajes enviados por los clientes a través del formulario de contacto o seguimiento.
    -   `id` (UUID, PK)
    -   `appointment_id` (UUID, FK a `appointments`)
    -   `service_tracking_code` (VARCHAR)
    -   `customer_name` (VARCHAR)
    -   `customer_email` (VARCHAR)
    -   `message` (TEXT)
    -   `message_type` (VARCHAR)
    -   `is_read` (BOOLEAN)
    -   `admin_response` (TEXT)
    -   `created_at` (TIMESTAMP)
    -   `updated_at` (TIMESTAMP)

### Funciones y Triggers

-   **`generate_service_tracking_code()`**: Función que genera un código de seguimiento único para cada cita (ej. `MC-YYYY-XXXXXX`).
-   **`set_service_tracking_code`**: Trigger que asigna automáticamente un código de seguimiento antes de insertar una nueva cita.
-   **`update_updated_at_column()`**: Función genérica para actualizar automáticamente la columna `updated_at` en las tablas.
-   **Triggers `update_*_updated_at`**: Triggers que utilizan `update_updated_at_column()` para mantener la columna `updated_at` actualizada en las tablas `services`, `appointments`, `payments`, `testimonials`, `blog_posts`, y `customer_messages`.

## 🚀 Secciones Clave

- **Inicio**: Página de bienvenida con servicios destacados, testimonios de clientes automotrices y llamadas a la acción claras.
- **Sobre Nosotros**: Historia del taller, certificaciones técnicas y experiencia en diagnóstico automotriz, presentada con una línea de tiempo interactiva.
- **Servicios**: Catálogo completo de servicios automotrices con descripciones, precios, duración y opción de agendar directamente.
- **Galería**: Colección de fotos de trabajos realizados, instalaciones del taller y equipo, con filtros por tipo de servicio.
- **Blog Automotriz**: Sistema completo de gestión de artículos educativos sobre mantenimiento vehicular, consejos y novedades del sector.
- **Contacto**: Formulario de contacto con validación avanzada, ubicación del taller y detalles de información.
- **Agendar Servicio**: Página dedicada con formularios especializados para diferentes tipos de servicios automotrices.
- **Seguimiento**: Portal en tiempo real para que los clientes rastreen el estado de sus servicios usando códigos de seguimiento únicos.
- **Dashboard de Servicios**: Panel para visualizar servicios completados con métricas y estadísticas.
- **/admin**: Panel de administración para la gestión integral del taller con roles diferenciados.

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: React 18 con TypeScript y Vite para desarrollo rápido y moderno.
- **Estilos**: Tailwind CSS con tema industrial personalizado y paleta de colores automotriz.
- **Animaciones**: Framer Motion con efectos mecánicos (engranajes giratorios, herramientas, etc.).
- **Componentes**: Biblioteca de componentes automotrices reutilizables y accesibles con sistema de diseño industrial.
- **Iconos**: Lucide React + iconografía automotriz personalizada (llaves, engranajes, vehículos).
- **Enrutamiento**: React Router con rutas protegidas para administración.
- **Formularios**: React Hook Form con validaciones robustas y persistencia automática de datos.
- **Estado**: Gestión de estado con hooks personalizados para datos automotrices.
- **Utilidades**: Sistema de utilidades para seguimiento de servicios, gestión de imágenes y exportación de datos.

### Backend (BaaS)
- **Plataforma**: Supabase para gestión completa de datos.
- **Base de Datos**: PostgreSQL con esquemas optimizados para talleres mecánicos.
- **Autenticación**: Supabase Auth con roles diferenciados (admin, mecánico, cliente).
- **Almacenamiento**: Supabase Storage para fotos de vehículos, facturas y documentos.

## ⚙️ Instalación y Despliegue

### Requisitos
- Node.js (v18 o superior)
- npm

### Desarrollo Local
1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/your-repo/autotaller-pro.git
    cd autotaller-pro
    ```
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Configurar Supabase**:
    - Crea un proyecto en [Supabase](https://supabase.com/).
    - En el editor SQL, ejecuta el script de `supabase_schema.sql` para crear las tablas y funciones necesarias para el taller.
    - Opcionalmente, puedes ejecutar `insert_sample_data.sql` para poblar la base de datos con datos de ejemplo.
    - Crea un archivo `.env` a partir de `.env.example` y añade tus claves de API de Supabase.
    ```env
    VITE_SUPABASE_URL="TU_URL_DE_SUPABASE"
    VITE_SUPABASE_ANON_KEY="TU_ANON_KEY_DE_SUPABASE"
    ```
4.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

### Verificación de Compilación
Para verificar que el proyecto compila correctamente sin errores:
```bash
npm run build
```
El proyecto ha sido optimizado y todos los errores de TypeScript han sido resueltos.

### 🔐 Acceso de Prueba

En modo de desarrollo (sin configurar Supabase), el sistema utiliza autenticación simulada con los siguientes usuarios de prueba:

**Administrador del Taller:**
- Email: `admin@autotallerpro.com`
- Contraseña: `admin123`
- Acceso completo al panel de administración

**Mecánico:**
- Email: `mecanico@autotallerpro.com`
- Contraseña: `mecanico123`
- Acceso limitado a funciones operativas

Para acceder al panel de administración:
1. Ve a `http://localhost:5173/login`
2. Usa cualquiera de las credenciales de prueba
3. Serás redirigido al dashboard administrativo

### Construcción para Producción
```bash
npm run build
```
Esto generará la carpeta `dist` con los archivos estáticos listos para producción.

### Despliegue
El proyecto está listo para ser desplegado en plataformas como Netlify, Vercel o GitHub Pages. Incluye un archivo `public/_redirects` para una configuración sencilla en Netlify.

## 🔧 Características Automotrices Especializadas

Este sistema ha sido diseñado específicamente para talleres mecánicos con las siguientes funcionalidades:

- **Gestión de Vehículos**: 
  - Registro completo de vehículos (marca, modelo, año, placa, kilometraje).
  - Historial de servicios por vehículo.
  - Alertas de mantenimiento preventivo.

- **Sistema de Códigos de Seguimiento**: 
  - Generación automática de códigos únicos (formato: MC-YYYY-XXXXXX).
  - Portal de seguimiento en tiempo real para clientes.
  - Notificaciones automáticas de cambio de estado.
  - Indicadores visuales de progreso del servicio.

- **Gestión de Servicios Automotrices**:
  - Catálogo de servicios con precios diferenciados (mano de obra vs. repuestos).
  - Estimación de tiempo de servicio.
  - Categorización por tipo (mantenimiento, reparación, diagnóstico).
  - Formularios especializados por tipo de servicio.

- **Panel de Control Industrial**:
  - Dashboard con métricas clave del taller.
  - Gestión de citas con vista de calendario.
  - Control de inventario de repuestos.
  - Reportes financieros y de productividad.
  - Sistema de confirmación de servicios con códigos QR.

- **Diseño Temático Automotriz**:
  - Paleta de colores industriales (azul metálico, naranja de seguridad, grises).
  - Iconografía automotriz (llaves, engranajes, vehículos).
  - Animaciones mecánicas (engranajes giratorios, efectos metálicos).
  - Tipografía industrial y elementos visuales profesionales.
  - Componentes especializados con temática de taller mecánico.

- **Sistema de Testimonios Automotrices**:
  - Testimonios específicos por tipo de servicio realizado.
  - Validación automática de servicios completados.
  - Gestión de reseñas con datos del vehículo atendido.

## 🚗 Módulos del Sistema

- **Gestión de Clientes**: Registro y seguimiento de clientes con historial vehicular completo.
- **Agenda de Servicios**: Programación inteligente basada en duración estimada de servicios automotrices.
- **Control de Inventario**: Gestión de repuestos con alertas de stock mínimo y categorización por vehículo.
- **Facturación**: Sistema de facturación con desglose de mano de obra y repuestos, exportación a PDF.
- **Reportes**: Análisis de productividad, ingresos y satisfacción del cliente con métricas específicas del taller.
- **Portal del Cliente**: Acceso para clientes con seguimiento en tiempo real de servicios y historial vehicular.
- **Sistema de Imágenes**: Gestión de fotos de vehículos antes/después del servicio con compresión automática.
- **Blog Automotriz**: Sistema completo de gestión de contenido educativo sobre mantenimiento vehicular.
- **Formularios Especializados**: Formularios adaptativos según el tipo de servicio automotriz solicitado.
- **Persistencia de Datos**: Sistema automático de guardado de formularios para prevenir pérdida de información.

## 🔧 Mejoras Recientes

- ✅ **Compilación Optimizada**: Todos los errores de TypeScript han sido resueltos.
- ✅ **Componentes Mejorados**: Optimización de componentes de seguimiento y formularios.
- ✅ **Validaciones Robustas**: Mejora en la validación de datos de vehículos y servicios.
- ✅ **Interfaz Pulida**: Refinamiento de la interfaz de usuario con temática automotriz.
- ✅ **Persistencia Mejorada**: Sistema automático de guardado de datos de formularios.
- ✅ **Indicadores de Estado**: Mejora en los indicadores visuales de estado de servicios.
