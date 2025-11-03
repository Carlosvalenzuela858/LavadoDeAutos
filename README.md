# AutoLavado App

Aplicación móvil de reservas de lavaderos de autos desarrollada con Ionic + Angular + TypeScript

## Características

- 🔐 Sistema de autenticación con usuarios mock
- 🏠 Búsqueda de lavaderos con Google Maps integrado
- 📅 Gestión de reservas (crear, ver, cancelar)
- 👤 Perfil de usuario con estadísticas
- 🚗 Gestión de vehículos
- 💰 Precios en Guaraníes (Gs)
- 📱 Diseño responsive y moderno

## Tecnologías

- Ionic 7
- Angular 17+ (Standalone Components)
- TypeScript
- Google Maps API
- SCSS

## Estructura del Proyecto

```
src/
├── app/
│   ├── data/           # Mock data (usuarios, lavaderos, reservas)
│   ├── models/         # Interfaces y modelos
│   ├── services/       # Servicios (auth, lavaderos, reservas)
│   ├── guards/         # Guards de autenticación
│   └── pages/          # Páginas de la aplicación
│       ├── login/      # Página de inicio de sesión
│       ├── tabs/       # Tabs principales
│       ├── home/       # Búsqueda de lavaderos
│       ├── reservas/   # Gestión de reservas
│       └── perfil/     # Perfil de usuario
```

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar Google Maps API:
- Obtener una API key de Google Maps
- Actualizar en `src/app/pages/home/home.page.ts` línea 113

4. Ejecutar en modo desarrollo:
```bash
ionic serve
```

## Usuarios de Prueba

- juan@email.com - 123456
- maria@email.com - 123456
- carlos@email.com - 123456
- ana@email.com - 123456
- pedro@email.com - 123456

## Distribución de Tareas y Commits

### Carlos - Autenticación y Seguridad (8 commits)
1. feat: Crear modelo de Usuario y Vehículo
2. feat: Implementar servicio de autenticación con mock data
3. feat: Crear guard de autenticación para rutas protegidas
4. feat: Diseñar página de login con tema oscuro
5. feat: Implementar lógica de login con validaciones
6. feat: Agregar estilos personalizados al login
7. feat: Configurar rutas con guards de autenticación
8. fix: Corregir redirección después del login

### Mariza - Home y Búsqueda (9 commits)
1. feat: Crear modelos de Lavadero y Servicio
2. feat: Implementar mock data de lavaderos de Asunción
3. feat: Crear servicio de lavaderos con búsqueda
4. feat: Diseñar página de home con lista de lavaderos
5. feat: Integrar Google Maps en la página de home
6. feat: Implementar búsqueda de lavaderos
7. feat: Agregar marcadores al mapa
8. style: Aplicar estilos personalizados a las tarjetas
9. feat: Agregar tema global y colores de la app

### Guillermo - Reservas y Perfil (10 commits)
1. feat: Crear modelo de Reserva con estados
2. feat: Implementar mock data de reservas
3. feat: Crear servicio de gestión de reservas
4. feat: Diseñar página de tabs con navegación
5. feat: Implementar página de reservas con segmentos
6. feat: Agregar funcionalidad de cancelar reservas
7. feat: Diseñar página de perfil de usuario
8. feat: Implementar estadísticas en el perfil
9. feat: Agregar funcionalidad de cerrar sesión
10. style: Aplicar estilos a tabs, reservas y perfil

**Total de commits: 27**

## Páginas de la Aplicación

### 1. Login
- Autenticación con email y contraseña
- Validaciones de formulario
- Mensajes de error
- Lista de usuarios de prueba

### 2. Home (Inicio)
- Barra de búsqueda de lavaderos
- Mapa interactivo de Google Maps
- Lista de lavaderos disponibles
- Información de servicios y precios

### 3. Reservas
- Segmentos: Activas y Completadas
- Visualización de detalles de reservas
- Cancelación de reservas activas
- Botón flotante para crear nueva reserva

### 4. Perfil
- Información del usuario
- Lista de vehículos registrados
- Estadísticas (total reservas, completadas, gasto total)
- Botón de cerrar sesión

## Diseño

La aplicación sigue un diseño moderno con:
- Fondo oscuro (#3D4454) para login
- Tema claro para la aplicación
- Tarjetas con sombras suaves
- Bordes redondeados
- Iconos de Ionicons
- Paleta de colores consistente

## API de Google Maps

Para usar la integración de Google Maps:
1. Obtener API key en [Google Cloud Console](https://console.cloud.google.com/)
2. Habilitar las APIs:
   - Maps JavaScript API
   - Places API
3. Reemplazar `YOUR_API_KEY_HERE` en el código

## Próximas Mejoras

- [ ] Implementar backend real
- [ ] Agregar sistema de pagos
- [ ] Notificaciones push
- [ ] Sistema de calificaciones
- [ ] Chat con el lavadero
- [ ] Historial de servicios
- [ ] Programa de fidelidad

## Licencia

Este proyecto es un prototipo educativo.

---
<img width="469" height="917" alt="image" src="https://github.com/user-attachments/assets/2bae3619-e459-44b3-b4d8-771ab6f6d136" />
<img width="466" height="898" alt="image" src="https://github.com/user-attachments/assets/c3d6c035-6f53-4abb-b566-0ee6c5590e97" />
<img width="469" height="910" alt="image" src="https://github.com/user-attachments/assets/471fa60f-3f66-47cf-9070-71910d89b102" />
<img width="473" height="907" alt="image" src="https://github.com/user-attachments/assets/b4db5842-7f46-4d33-86b5-f3d04df3f0bc" />


Desarrollado por Carlos, Mariza y Guillermo
