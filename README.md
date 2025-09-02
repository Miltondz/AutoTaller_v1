# ⚙️ AutoTaller Pro – Sistema Web para Talleres Mecánicos  

![AutoTaller Pro Banner](public/images/placeholders/blog_placeholder.jpg)  

---

## 🚀 Resumen  
**AutoTaller Pro** es un sistema web integral diseñado específicamente para **talleres mecánicos y servicios automotrices** que buscan modernizar y digitalizar su gestión.  
El proyecto combina lo mejor de las tecnologías web modernas con un enfoque práctico en el día a día del taller, ofreciendo desde la **agenda inteligente de servicios**, hasta la **gestión de inventario, clientes, vehículos y facturación**.  

Con este sistema, un taller puede **optimizar tiempos, reducir errores administrativos y mejorar la comunicación con sus clientes**, quienes a su vez obtienen una experiencia transparente y confiable: agendan en línea, reciben confirmaciones inmediatas, y pueden dar seguimiento en tiempo real al estado de sus reparaciones.  

El resultado es una plataforma **lista para producción**, adaptable a talleres de cualquier tamaño, que ayuda a **incrementar la productividad, fidelizar clientes y mejorar la rentabilidad** del negocio.  

---

## 📖 Descripción General  
Los talleres mecánicos enfrentan diariamente múltiples desafíos: organización de citas, control de inventario, gestión de clientes, coordinación de mecánicos, facturación y seguimiento de vehículos. Muchas veces estas tareas se realizan manualmente, lo que genera retrasos, errores y pérdida de oportunidades.  

**AutoTaller Pro** surge como una solución digital integral que **centraliza todos estos procesos en un único sistema web profesional**. Está diseñado con una interfaz temática automotriz moderna, totalmente responsive y optimizada para dispositivos móviles, de modo que puede ser utilizado tanto desde la recepción del taller como desde un smartphone por parte del cliente.  

Entre sus principales características destacan:  
- Un **panel de administración completo** con acceso por roles (administrador, mecánico, cliente).  
- **Sistema de citas inteligentes**, con agenda interactiva y tiempos estimados de cada servicio.  
- **Seguimiento en tiempo real** mediante códigos únicos, que mejoran la transparencia hacia el cliente.  
- **Gestión de inventario y repuestos** con alertas de stock bajo.  
- **Reportes automáticos** de productividad, ingresos y satisfacción del cliente.  
- **SEO optimizado** para aumentar la visibilidad del taller en Google.  
- **Blog automotriz integrado** como estrategia de marketing de contenidos.  
- **Diseño temático industrial** con animaciones mecánicas y elementos visuales propios del sector.  

En otras palabras, AutoTaller Pro no solo digitaliza el taller, sino que también lo convierte en un negocio **más competitivo, organizado y preparado para crecer en la era digital**.  

---

## ✨ Características y Beneficios  

### Beneficios para el Taller  
- 📈 Aumento de productividad y control administrativo.  
- ⏱️ Ahorro de tiempo en la gestión de citas, inventario y facturación.  
- 💰 Mayor rentabilidad gracias a reportes de costos e ingresos en tiempo real.  
- 🌐 Visibilidad online optimizada (SEO + blog educativo).  
- 🔐 Seguridad con autenticación de usuarios y roles diferenciados.  
- 🤝 Fidelización de clientes al brindar transparencia y confianza en los servicios.  

### Funcionalidades Clave  
- 🎨 **Diseño Moderno**: Responsive, rápido y con estética automotriz.  
- 📅 **Agenda Inteligente**: Disponibilidad de horarios actualizada en tiempo real.  
- ⚙️ **Seguimiento Online**: Estado de cada servicio accesible con un código único.  
- 🛠️ **Gestión de Inventario**: Control de repuestos y herramientas.  
- 📊 **Dashboard Industrial**: Indicadores clave de productividad y finanzas.  
- 📑 **Reportes Exportables**: Compatible con PDF y Excel.  
- ⭐ **Testimonios Validados**: Opiniones verificadas de clientes reales.  
- 🖼️ **Galería y Blog**: Contenido visual y educativo para atraer más clientes.  

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
