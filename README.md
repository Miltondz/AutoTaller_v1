# ⚙️ AutoTaller Pro – Sistema Web para Talleres Mecánicos

![AutoTaller Pro Banner](public/images/placeholders/blog_placeholder.jpg)

---

## 🚀 Resumen
**AutoTaller Pro** es un sistema web integral diseñado específicamente para **talleres mecánicos y servicios automotrices** que buscan modernizar y digitalizar su gestión.
El proyecto combina lo mejor de las tecnologías web modernas con un enfoque práctico en el día a día del taller, ofreciendo desde la **agenda inteligente de servicios**, hasta la **gestión de clientes, vehículos y pagos**.

Con este sistema, un taller puede **optimizar tiempos, reducir errores administrativos y mejorar la comunicación con sus clientes**, quienes a su vez obtienen una experiencia transparente y confiable: agendan en línea, reciben confirmaciones inmediatas, y pueden dar seguimiento en tiempo real al estado de sus reparaciones.

El resultado es una plataforma **lista para producción**, adaptable a talleres de cualquier tamaño, que ayuda a **incrementar la productividad, fidelizar clientes y mejorar la rentabilidad** del negocio.

---

## 📖 Descripción General
Los talleres mecánicos enfrentan diariamente múltiples desafíos: organización de citas, control de servicios, gestión de clientes, coordinación de mecánicos, y seguimiento de vehículos. Muchas veces estas tareas se realizan manualmente, lo que genera retrasos, errores y pérdida de oportunidades.

**AutoTaller Pro** surge como una solución digital integral que **centraliza todos estos procesos en un único sistema web profesional**. Está diseñado con una interfaz temática automotriz moderna, totalmente responsive y optimizada para dispositivos móviles, de modo que puede ser utilizado tanto desde la recepción del taller como desde un smartphone por parte del cliente.

Entre sus principales características destacan:
- Un **panel de administración completo** con acceso por roles (administrador, mecánico, cliente) para gestionar citas, contenido y usuarios.
- **Sistema de citas inteligentes**, con agenda interactiva que muestra la disponibilidad de horarios y tiempos estimados de cada servicio.
- **Seguimiento en tiempo real** del estado de los servicios mediante códigos únicos, que mejoran la transparencia hacia el cliente.
- **Gestión de servicios y materiales asociados**, permitiendo definir precios y tiempos para cada tipo de trabajo.
- **Reportes visuales** de productividad, ingresos y satisfacción del cliente a través de dashboards interactivos.
- **SEO optimizado** para aumentar la visibilidad del taller en Google.
- **Blog automotriz integrado** como estrategia de marketing de contenidos para atraer y educar a los clientes.
- **Diseño temático industrial** con animaciones mecánicas y elementos visuales propios del sector, ofreciendo una experiencia de usuario inmersiva.

En otras palabras, AutoTaller Pro no solo digitaliza el taller, sino que también lo convierte en un negocio **más competitivo, organizado y preparado para crecer en la era digital**.

---

## ✨ Características y Beneficios

### Beneficios para el Taller
- 📈 Aumento de productividad y control administrativo.
- ⏱️ Ahorro de tiempo en la gestión de citas y servicios.
- 💰 Mayor rentabilidad gracias a reportes de costos e ingresos en tiempo real.
- 🌐 Visibilidad online optimizada (SEO + blog educativo).
- 🔐 Seguridad con autenticación de usuarios y roles diferenciados.
- 🤝 Fidelización de clientes al brindar transparencia y confianza en los servicios.

### Funcionalidades Clave
- 🎨 **Diseño Moderno**: Interfaz responsive, rápida y con una estética automotriz profesional.
- 📅 **Agenda Inteligente**: Gestión de citas con disponibilidad de horarios actualizada en tiempo real.
- ⚙️ **Seguimiento Online**: Estado de cada servicio accesible con un código único para el cliente.
- 🛠️ **Gestión de Servicios**: Definición y administración de los servicios ofrecidos, incluyendo precios y tiempos estimados.
- 📊 **Dashboard Industrial**: Indicadores clave de productividad y finanzas para una toma de decisiones informada.
- 📑 **Reportes Visuales**: Visualización de datos importantes directamente en el dashboard.
- ⭐ **Testimonios Validados**: Recopilación y visualización de opiniones verificadas de clientes reales.
- 🖼️ **Galería y Blog**: Contenido visual y educativo para atraer y retener más clientes.

---

## 🚀 Futuras Mejoras (Baja Complejidad y Alto Valor)

Estas son algunas ideas para expandir la funcionalidad del sistema con un esfuerzo de desarrollo relativamente bajo, pero que pueden generar un valor significativo:

- 📧 **Notificaciones Automatizadas**: Implementar envío de correos electrónicos o SMS para confirmaciones de citas, recordatorios y actualizaciones de estado del servicio. Esto mejoraría la comunicación con el cliente y reduciría las ausencias.
- 📜 **Historial de Servicios por Cliente/Vehículo**: Desarrollar una vista simple donde los clientes o administradores puedan consultar el historial de servicios realizados para un vehículo o cliente específico, utilizando los datos de citas existentes.
- 🔍 **Búsqueda Avanzada**: Añadir funcionalidades de búsqueda y filtrado más robustas en el panel de administración para citas, clientes y blog posts, facilitando la gestión de grandes volúmenes de datos.
- 📝 **Módulo Básico de Facturación**: Aunque no es un sistema contable completo, se podría añadir una funcionalidad para generar un resumen de servicio o una "pro-forma" de factura simple, mostrando los servicios y costos asociados a una cita.
- 🖼️ **Optimización de Carga de Imágenes**: Implementar lazy loading o compresión automática de imágenes para mejorar el rendimiento de la galería y el blog, especialmente en dispositivos móviles.

---

## 📊 Esquema de Base de Datos (Supabase/PostgreSQL)

> La base de datos está optimizada para talleres mecánicos y gestionada en **Supabase** con funciones y triggers automáticos.

### Tablas Principales
| Tabla | Propósito | Campos Destacados |
|-------|-----------|------------------|
| **services** | Servicios automotrices | `id`, `name`, `price`, `estimated_time`, `category` |
| **service_images** | Imágenes de servicios | `id`, `service_id`, `image_url`, `is_primary` |
| **appointments** | Citas agendadas | `id`, `tracking_code`, `customer_name`, `status`, `total_cost` |
| **service_timeline_events** | Eventos de servicios | `id`, `appointment_id`, `event_type`, `timestamp` |
| **payments** | Pagos realizados | `id`, `appointment_id`, `total_amount`, `payment_method` |
| **testimonials** | Testimonios de clientes | `id`, `author_name`, `rating`, `service_type` |
| **blog_posts** | Artículos educativos | `id`, `title`, `slug`, `tags[]`, `content` |
| **customer_messages** | Mensajes de clientes | `id`, `appointment_id`, `message`, `is_read` |
| **site_content** | Contenido dinámico | `id`, `section_name`, `content` |

### Funciones y Triggers
- `generate_service_tracking_code()` → Genera códigos únicos tipo `MC-YYYY-XXXXXX`.
- `set_service_tracking_code` → Asigna tracking antes de insertar citas.
- `update_updated_at_column()` → Actualiza `updated_at` en todas las tablas.

---


## ⚙️ Instalación y Despliegue

### 🔽 Requisitos Previos
- Node.js `v18+`
- npm
- Cuenta en [Supabase](https://supabase.com/)

### 🚧 Desarrollo Local
```bash
git clone https://github.com/your-repo/autotaller-pro.git
cd autotaller-pro
npm install
```

---

## 🔑 Credenciales de Prueba (Solo Desarrollo)

Para facilitar las pruebas y el desarrollo, se han configurado las siguientes credenciales mock:

### Credenciales del Login (src/pages/LoginPage.tsx)
- **Administrador:** `admin@autotallerpro.com` / `admin123`
- **Mecánico:** `mecanico@autotallerpro.com` / `mecanico123`

### Credenciales del Contexto Mock (src/contexts/MockAuthContextValue.ts)
- **Usuario Mock:** `test@example.com` / `password`