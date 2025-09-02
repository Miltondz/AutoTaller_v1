# Documentación del Proyecto: Taller Mecánico

## 1. Resumen

Este proyecto es una aplicación web completa diseñada para la gestión de un taller mecánico. Ofrece una doble interfaz: un sitio público para que los clientes vean servicios, lean el blog, contacten al taller y agenden citas, y un panel de administración interno para que el personal del taller gestione todas las operaciones. La plataforma busca modernizar la interacción cliente-taller, centralizar la gestión y optimizar los procesos internos.

## 2. Alcance del Proyecto

El alcance del proyecto abarca tanto las funcionalidades orientadas al cliente como las herramientas de gestión interna.

### 2.1. Sitio Público

- **Página de Inicio:** Presenta una bienvenida, un resumen de los servicios clave y acceso a las últimas entradas del blog.
- **Página de Servicios:** Muestra un listado detallado de todos los servicios ofrecidos por el taller, con descripciones y precios.
- **Página de Citas (Booking):** Un formulario interactivo que permite a los clientes seleccionar servicios, elegir una fecha y hora, y proporcionar la información de su vehículo para agendar una cita.
- **Página de Blog:** Un espacio para publicar artículos de interés, noticias y consejos sobre mantenimiento de vehículos.
- **Página de Galería:** Muestra imágenes de los trabajos realizados, instalaciones y equipo.
- **Página de Contacto:** Un formulario para que los usuarios envíen consultas o mensajes directamente al taller.
- **Página de Seguimiento de Servicio:** Permite a los clientes consultar el estado de su vehículo introduciendo un código de seguimiento.
- **Página "Acerca de":** Proporciona información sobre la historia, misión y valores del taller.

### 2.2. Panel de Administración

- **Dashboard Principal:** Ofrece una vista general con métricas clave, como citas programadas, ingresos recientes y servicios en progreso.
- **Gestión de Citas:** Permite al personal ver, modificar, cancelar y gestionar el estado de todas las citas de los clientes. Incluye la capacidad de añadir costos adicionales y notas de trabajo.
- **Gestión de Pagos:** Un panel para rastrear y administrar todos los pagos, ver ingresos totales, montos pendientes y filtrar por método de pago o estado.
- **Gestión de Contenido:** Una interfaz para editar el contenido de las páginas principales del sitio web (Inicio, Acerca de, etc.).
- **Gestión de Blog:** Herramientas para crear, editar y eliminar entradas del blog.
- **Gestión de Servicios:** Permite añadir, modificar o eliminar los servicios ofrecidos por el taller.
- **Gestión de Testimonios:** Administra los testimonios de los clientes que se mostrarán en el sitio.
- **Gestión de Mensajes:** Visualiza y gestiona los mensajes recibidos a través del formulario de contacto.
- **Gestión Multimedia:** Sube y administra las imágenes para la galería y los servicios.

## 3. Secciones Principales

La aplicación está dividida lógicamente en dos grandes áreas:

- **`src/pages`**: Contiene los componentes de React que definen las páginas principales del sitio, tanto públicas como del panel de administración.
  - **`src/pages/admin`**: Subdirectorio específico para las vistas del panel de administración.
- **`src/components`**: Alberga los componentes reutilizables de React utilizados en toda la aplicación, como encabezados, pies de página, formularios, tablas y tarjetas.
- **`src/hooks`**: Contiene los hooks personalizados de React para manejar la lógica de negocio, como la obtención de datos, la autenticación y la gestión de estado.
- **`src/api`**: Define la capa de comunicación con el backend (en este caso, Supabase), gestionando las operaciones CRUD para las diferentes entidades de la aplicación.
- **`src/contexts`**: Proporciona el contexto de React para funcionalidades transversales como la autenticación.

## 4. Detalles Técnicos

- **Frontend:**
  - **Framework:** React con Vite.
  - **Lenguaje:** TypeScript.
  - **Estilos:** Tailwind CSS para el diseño de la interfaz.
  - **Iconos:** Lucide React.
- **Backend y Base de Datos:**
  - **Plataforma:** Supabase (utilizado para la base de datos PostgreSQL, autenticación y almacenamiento).
- **Estado de Desarrollo:**
  - La aplicación utiliza datos `mock` (simulados) en varios de sus hooks (`useMock...`), lo que indica que está en una fase de desarrollo y aún no está completamente conectada a una base de datos de producción.

## 5. Futuras Mejoras

A continuación, se presenta una lista de posibles mejoras y funcionalidades a implementar en el futuro:

- **Integración Completa con Supabase:** Reemplazar todos los hooks con datos `mock` por implementaciones funcionales que interactúen con la API de Supabase para una gestión de datos en tiempo real.
- **Autenticación de Clientes:** Crear un sistema de inicio de sesión para clientes, donde puedan ver su historial de servicios, gestionar sus vehículos y citas futuras.
- **Notificaciones Automáticas:** Implementar un sistema de notificaciones por correo electrónico o SMS para recordar a los clientes sus próximas citas o para avisarles cuando el servicio de su vehículo esté completado.
- **Inventario de Repuestos:** Añadir un módulo en el panel de administración para gestionar el inventario de piezas y repuestos.
- **Facturación Avanzada:** Generar facturas en formato PDF y enviarlas automáticamente a los clientes.
- **Informes y Analíticas Detalladas:** Mejorar el dashboard de administración con gráficos más detallados y la capacidad de generar informes personalizables sobre ingresos, servicios más populares, etc.
- **Optimización para Motores de Búsqueda (SEO):** Mejorar el SEO del sitio público para aumentar la visibilidad en los buscadores.
- **Internacionalización (i18n):** Preparar la aplicación para soportar múltiples idiomas en el futuro.
