# Sitio Web Profesional para Maestra de Música

Este repositorio contiene el código fuente de un sitio web completo y profesional para una maestra de música. La aplicación está diseñada para ser una plataforma atractiva y funcional que permita a la maestra presentar sus servicios, compartir su conocimiento a través de un blog, gestionar clases y reservas, y mostrar su trabajo en una galería multimedia.

## ✨ Características Principales

### Para Visitantes
- **Diseño Profesional y Atractivo**: Una interfaz cálida y elegante con una temática musical.
- **Totalmente Adaptable (Responsive)**: Se ve y funciona de maravilla en cualquier dispositivo, desde móviles hasta ordenadores de escritorio.
- **Navegación Intuitiva**: Un menú claro y sencillo para acceder a todas las secciones.
- **Reserva de Clases**: Un sistema interactivo para que los estudiantes puedan ver la disponibilidad y reservar clases.
- **Blog Educativo**: Una sección para compartir artículos, tutoriales y noticias.
- **Galería Multimedia**: Un espacio para mostrar fotos y videos de clases, recitales y eventos.

### Para el Administrador
- **Panel de Administración Completo**: Un área privada para gestionar todo el contenido del sitio.
- **Gestión de Contenido Dinámico**: Permite crear, editar y eliminar servicios, testimonios, entradas de blog y elementos de la galería.
- **Gestión de Reservas**: Permite ver y administrar las clases reservadas por los estudiantes.
- **Sistema de Autenticación Seguro**: Acceso protegido al panel de administración.

## 🚀 Secciones de la Aplicación

- **Inicio**: La página de bienvenida con una introducción, un resumen de los servicios y testimonios de estudiantes.
- **Sobre Mí**: Una página dedicada a la biografía, experiencia y filosofía de enseñanza de la maestra.
- **Servicios**: Un listado detallado de todas las clases y servicios ofrecidos, con sus precios y descripciones.
- **Galería**: Una colección de fotos y videos.
- **Blog**: Artículos y publicaciones para compartir conocimiento y conectar con los estudiantes.
- **Contacto**: Un formulario para que los visitantes puedan enviar sus consultas.
- **Reservar Clase**: La página donde los estudiantes pueden agendar sus clases.
- **/admin**: El panel de administración para gestionar el contenido del sitio.

## ✏️ Cómo Modificar Contenido Básico

Este sitio está diseñado para que la mayor parte del contenido se pueda gestionar fácilmente desde el panel de administración. Sin embargo, algunos textos e imágenes fijos se modifican directamente en el código.

### Contenido del Panel de Administración (Dinámico)

La forma más sencilla de actualizar el sitio es a través del panel de administración en la ruta `/admin`. Desde allí puedes gestionar:
- **Servicios**: Cambia los nombres, descripciones y precios de tus clases.
- **Testimonios**: Publica nuevas reseñas de tus estudiantes.
- **Blog**: Escribe y publica nuevos artículos.
- **Galería**: Sube nuevas fotos y videos.

### Contenido en el Código (Estático)

Algunos textos, como los títulos principales de las páginas o las descripciones generales, se encuentran directamente en los archivos del proyecto.

- **Textos de las páginas principales**:
  - **Página de Inicio**: `src/pages/HomePage.tsx`
  - **Página Sobre Mí**: `src/pages/AboutPage.tsx`
  - Para cambiar un texto, busca el texto actual en el archivo y reemplázalo por el nuevo.

- **Imágenes principales**:
  - Las imágenes de diseño como el logo o los banners se encuentran en la carpeta `public/images`. Puedes reemplazar los archivos de imagen existentes con los tuyos, manteniendo el mismo nombre de archivo para que se actualicen automáticamente en el sitio.

## 🛠️ Apartado Técnico

### Frontend
- **Framework**: React 18 con TypeScript.
- **Entorno de Desarrollo**: Vite para una experiencia de desarrollo rápida y optimizada.
- **Estilos**: Tailwind CSS para un diseño moderno y adaptable.
- **Componentes**: Shadcn UI y Radix UI para componentes accesibles y de alta calidad.
- **Iconos**: Lucide React.
- **Enrutamiento**: React Router.
- **Formularios**: React Hook Form con Zod para validaciones robustas.

### Backend
- **Plataforma**: Supabase (Backend-as-a-Service).
- **Base de Datos**: PostgreSQL.
- **Autenticación**: Sistema de usuarios de Supabase para proteger el panel de administración.
- **Almacenamiento**: Supabase Storage para guardar imágenes y otros archivos multimedia.
- **Seguridad**: Políticas de seguridad a nivel de fila (RLS) en la base de datos para proteger los datos.

## ⚙️ Instalación y Despliegue

### Desarrollo Local
1.  Clona el repositorio.
2.  Crea un archivo `.env` a partir del `.env.example` y añade tus claves de Supabase.
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```

### Construcción para Producción
```bash
npm run build
```
El resultado se generará en la carpeta `dist`, listo para ser desplegado en cualquier servicio de hosting para sitios estáticos como Netlify, Vercel o GitHub Pages.

### Despliegue en Netlify
Para que el enrutamiento de React funcione correctamente en Netlify, este proyecto incluye un archivo `public/_redirects` que redirige todas las solicitudes al `index.html`. Simplemente conecta tu repositorio a Netlify y se desplegará automáticamente.

## 🐘 Configuración de Supabase

Para que la aplicación funcione, necesitas configurar tu propia base de datos en Supabase.

1.  **Crea un proyecto en Supabase**.
2.  **Ve al Editor SQL** en el panel de tu proyecto.
3.  **Ejecuta el script de la base de datos**: Copia el contenido del archivo `database-setup-spanish.sql` y pégalo en el editor SQL de Supabase. Ejecuta el script para crear todas las tablas y configuraciones necesarias.
4.  **Configura las variables de entorno**: En tu archivo `.env`, añade la URL y la `anon key` de tu proyecto de Supabase. Las encontrarás en la sección de `Settings > API` de tu proyecto en Supabase.
```
VITE_SUPABASE_URL="TU_URL_DE_SUPABASE"
VITE_SUPABASE_ANON_KEY="TU_ANON_KEY_DE_SUPABASE"
```
5.  **Crea un usuario administrador**: Ve a la sección de `Authentication` en Supabase y crea un nuevo usuario. Este será el usuario que usarás para acceder al panel de administración en `/login`.