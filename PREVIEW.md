# Previsualización de AutoLavado App

## Pantallas de la Aplicación

### 1. Pantalla de Login
```
┌─────────────────────────────┐
│                             │
│      [Icono de Auto]        │
│       AutoLavado            │
│   Tu auto siempre limpio    │
│                             │
│  ┌───────────────────────┐  │
│  │  Iniciar Sesión       │  │
│  │                       │  │
│  │  ┌─────────────────┐ │  │
│  │  │ Correo electr... │ │  │
│  │  └─────────────────┘ │  │
│  │                       │  │
│  │  ┌─────────────────┐ │  │
│  │  │ Contraseña      │ │  │
│  │  └─────────────────┘ │  │
│  │                       │  │
│  │  ┌─────────────────┐ │  │
│  │  │    Ingresar     │ │  │
│  │  └─────────────────┘ │  │
│  │                       │  │
│  │  Usuarios de prueba:  │  │
│  │  • juan@email.com     │  │
│  │  • maria@email.com    │  │
│  │  • carlos@email.com   │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Descripción:**
- Fondo oscuro (#3D4454)
- Tarjeta blanca redondeada
- Icono de auto grande
- Campos de texto con fondo gris claro
- Botón negro para ingresar
- Lista de usuarios de prueba

---

### 2. Pantalla de Home (Búsqueda)
```
┌─────────────────────────────┐
│ ◀ Buscar Lavaderos          │
├─────────────────────────────┤
│  🔍 Buscar lavaderos...     │
│                             │
│  ┌───────────────────────┐  │
│  │     [MAPA GOOGLE]     │  │
│  │   Asunción, Paraguay   │  │
│  │   📍 8 Lavaderos       │  │
│  └───────────────────────┘  │
│                             │
│  Lavaderos Disponibles      │
│                             │
│  ┌───────────────────────┐  │
│  │ Jack's Car Wash    ⭐4.8│ │
│  │ 📍 Av. España 1234    │  │
│  │ ⏰ Lun-Sab: 7:00-19:00│  │
│  │ 💧 Lavado Básico      │  │
│  │ ✨ Lavado Premium     │  │
│  │ Desde 50.000 Gs       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Auto Shine Express ⭐4.5││
│  │ 📍 Av. Mariscal López │  │
│  │ ⏰ Lun-Vie: 7:00-20:00│  │
│  │ Desde 50.000 Gs       │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
│  🏠    📅    👤            │
└─────────────────────────────┘
```

**Descripción:**
- Header con título
- Barra de búsqueda
- Mapa de Google Maps con marcadores
- Lista scrollable de lavaderos
- Tarjetas blancas con información
- Rating con estrellas
- Servicios disponibles
- Precio desde...
- Tabs en la parte inferior

---

### 3. Pantalla de Reservas
```
┌─────────────────────────────┐
│ ◀ Mis Reservas              │
├─────────────────────────────┤
│ ┌─────────┬─────────────┐   │
│ │ Activas │ Completadas │   │
│ └─────────┴─────────────┘   │
│                             │
│  ┌───────────────────────┐  │
│  │ [Confirmada]       ❌ │  │
│  │ Jack's Car Wash       │  │
│  │ Lavado Completo       │  │
│  │ 📅 02/11/2025         │  │
│  │ ⏰ 11:00 AM           │  │
│  │ 🚗 Honda Civic-XYZ789 │  │
│  │ Total: 120.000 Gs     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ [Pendiente]        ❌ │  │
│  │ Car Clean Pro         │  │
│  │ Pulido                │  │
│  │ 📅 03/11/2025         │  │
│  │ ⏰ 03:00 PM           │  │
│  │ 🚗 Toyota Corolla     │  │
│  │ Total: 150.000 Gs     │  │
│  └───────────────────────┘  │
│                             │
│                      [+]    │
└─────────────────────────────┘
│  🏠    📅    👤            │
└─────────────────────────────┘
```

**Descripción:**
- Segmentos para filtrar (Activas/Completadas)
- Tarjetas con estado de la reserva
- Icono para cancelar
- Información detallada de cada reserva
- Botón flotante para nueva reserva
- Tabs en la parte inferior

---

### 4. Pantalla de Perfil
```
┌─────────────────────────────┐
│ ◀ Mi Perfil                 │
├─────────────────────────────┤
│                             │
│      ┌─────────────┐        │
│      │    👤      │        │
│      └─────────────┘        │
│     Juan Pérez              │
│  juan@email.com             │
│                             │
│  Información Personal       │
│  ┌───────────────────────┐  │
│  │ ✉️  juan@email.com    │  │
│  │ 📞  0981-123456       │  │
│  └───────────────────────┘  │
│                             │
│  Mis Vehículos              │
│  ┌───────────────────────┐  │
│  │ 🚗 Toyota Corolla     │  │
│  │    2020 • Blanco      │  │
│  │    Placa: ABC-123     │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ 🚗 Honda Civic        │  │
│  │    2019 • Negro       │  │
│  │    Placa: XYZ-789     │  │
│  └───────────────────────┘  │
│                             │
│  Estadísticas               │
│  ┌─────┬─────┬─────────┐   │
│  │ 📅  │ ✓   │ 💰      │   │
│  │ 4   │ 2   │ 200K Gs │   │
│  │Total│Comp.│ Gastado │   │
│  └─────┴─────┴─────────┘   │
│                             │
│  ┌───────────────────────┐  │
│  │   🚪 Cerrar Sesión    │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
│  🏠    📅    👤            │
└─────────────────────────────┘
```

**Descripción:**
- Avatar circular
- Nombre y email del usuario
- Información de contacto
- Lista de vehículos con detalles
- Estadísticas en grid (3 columnas)
- Botón rojo para cerrar sesión
- Tabs en la parte inferior

---

## Flujo de Navegación

1. **Login** → Ingresar credenciales → **Tabs (Home)**
2. **Home** → Buscar lavadero → Seleccionar → **Detalle** → **Reservas**
3. **Reservas** → Ver reservas activas/completadas → Cancelar si es necesario
4. **Perfil** → Ver información → Cerrar sesión → **Login**

## Colores Principales

- **Fondo Login**: #3D4454 (Azul grisáceo oscuro)
- **Fondo App**: #F5F5F5 (Gris claro)
- **Primary**: #2D3142 (Negro azulado)
- **Texto**: #2D3142 (Oscuro)
- **Texto Secundario**: #666 (Gris)
- **Tarjetas**: #FFFFFF (Blanco)
- **Acento Success**: #28A745 (Verde)
- **Acento Warning**: #FFC107 (Amarillo)
- **Acento Danger**: #DC3545 (Rojo)

## Características de Diseño

- ✅ Bordes redondeados (12-15px)
- ✅ Sombras suaves
- ✅ Iconos de Ionicons
- ✅ Tipografía San Francisco/Roboto
- ✅ Espaciado consistente
- ✅ Animaciones suaves
- ✅ Responsive design
- ✅ Tema claro y oscuro

## Funcionalidades Implementadas

✅ Login con validación
✅ Búsqueda de lavaderos
✅ Integración con Google Maps
✅ Ver detalles de lavaderos
✅ Gestión de reservas (crear, ver, cancelar)
✅ Perfil de usuario
✅ Estadísticas
✅ Múltiples vehículos por usuario
✅ Sistema de estados de reserva
✅ Precios en Guaraníes
✅ Mock data completo

---

**Nota**: Esta es una representación textual de las pantallas. Para ver la aplicación en funcionamiento, ejecuta `ionic serve` después de instalar las dependencias.
