-- Sample data for services
INSERT INTO services (name, description, price, duration_minutes, image_url) VALUES
('Cambio de Aceite', 'Cambio de aceite y filtro, revisión de niveles y puntos de seguridad.', 50000, 45, '/images/services/oil-change.jpg'),
('Alineación y Balanceo', 'Alineación computarizada y balanceo de las cuatro ruedas.', 40000, 60, '/images/services/alignment.jpg'),
('Frenos', 'Revisión y cambio de pastillas y discos de freno.', 80000, 90, '/images/services/brakes.jpg'),
('Diagnóstico Electrónico', 'Escaneo computarizado para detectar fallas en el sistema electrónico.', 60000, 50, '/images/services/diagnostics.jpg')
ON CONFLICT DO NOTHING;

-- Sample data for testimonials
INSERT INTO testimonials (author_name, content, rating) VALUES
('Juan Pérez', 'Excelente servicio, mi auto quedó como nuevo. Muy profesionales y atentos.', 5),
('María Rodriguez', 'Rápido y confiable. Me explicaron todo el proceso y los precios son justos.', 5),
('Carlos Gómez', 'Llevé mi camioneta por un ruido extraño y lo solucionaron en el mismo día. ¡Recomendados!', 5),
('Ana Martínez', 'Muy buen servicio, el personal es amable y calificado.', 4)
ON CONFLICT DO NOTHING;

-- Sample data for blog posts
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
 'importancia-frenos-vehiculo')
ON CONFLICT (slug) DO NOTHING;