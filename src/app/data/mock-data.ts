import { Usuario, Lavadero, Servicio, Reserva } from '../models/interfaces';

// Usuarios Mock
export const USUARIOS_MOCK: Usuario[] = [
  {
    id: '1',
    nombre: 'Carlos',
    apellido: 'González',
    email: 'carlos@email.com',
    password: '123456',
    telefono: '+595 981 123 456',
    fechaRegistro: new Date('2024-01-15'),
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    nombre: 'María',
    apellido: 'Rodríguez',
    email: 'maria@email.com',
    password: '123456',
    telefono: '+595 981 234 567',
    fechaRegistro: new Date('2024-02-10'),
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: '3',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@email.com',
    password: '123456',
    telefono: '+595 981 345 678',
    fechaRegistro: new Date('2024-03-05'),
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana@email.com',
    password: '123456',
    telefono: '+595 981 456 789',
    fechaRegistro: new Date('2024-03-20'),
    avatar: 'https://i.pravatar.cc/150?img=9'
  }
];

// Lavaderos Mock - Ubicaciones en Asunción, Paraguay
export const LAVADEROS_MOCK: Lavadero[] = [
  {
    id: '1',
    nombre: 'AutoLavado Express',
    direccion: 'Av. Mariscal López 3421, Asunción',
    coordenadas: {
      lat: -25.2887,
      lng: -57.5759
    },
    rating: 4.8,
    numReviews: 234,
    distancia: 1.2,
    imagen: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500',
    horarioApertura: '08:00',
    horarioCierre: '20:00',
    servicios: ['Lavado básico', 'Lavado premium', 'Encerado', 'Pulido'],
    precioDesde: 35000
  },
  {
    id: '2',
    nombre: 'Clean Car Center',
    direccion: 'Av. España 1234, Asunción',
    coordenadas: {
      lat: -25.2971,
      lng: -57.6089
    },
    rating: 4.6,
    numReviews: 189,
    distancia: 2.5,
    imagen: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500',
    horarioApertura: '07:00',
    horarioCierre: '21:00',
    servicios: ['Lavado básico', 'Lavado premium', 'Limpieza interior', 'Aspirado'],
    precioDesde: 30000
  },
  {
    id: '3',
    nombre: 'Lavadero Premium',
    direccion: 'Av. Aviadores del Chaco 2789, Asunción',
    coordenadas: {
      lat: -25.3015,
      lng: -57.5890
    },
    rating: 4.9,
    numReviews: 412,
    distancia: 3.1,
    imagen: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500',
    horarioApertura: '08:00',
    horarioCierre: '19:00',
    servicios: ['Lavado premium', 'Detallado completo', 'Encerado', 'Pulido', 'Limpieza de motor'],
    precioDesde: 50000
  },
  {
    id: '4',
    nombre: 'Shine Auto Spa',
    direccion: 'Calle Eligio Ayala 987, Asunción',
    coordenadas: {
      lat: -25.2823,
      lng: -57.6354
    },
    rating: 4.7,
    numReviews: 301,
    distancia: 1.8,
    imagen: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500',
    horarioApertura: '07:30',
    horarioCierre: '20:30',
    servicios: ['Lavado básico', 'Lavado completo', 'Limpieza interior', 'Encerado'],
    precioDesde: 40000
  },
  {
    id: '5',
    nombre: 'Aqua Clean',
    direccion: 'Av. Santa Teresa 456, Asunción',
    coordenadas: {
      lat: -25.3156,
      lng: -57.5645
    },
    rating: 4.5,
    numReviews: 167,
    distancia: 4.2,
    imagen: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=500',
    horarioApertura: '08:00',
    horarioCierre: '18:00',
    servicios: ['Lavado básico', 'Limpieza express', 'Aspirado'],
    precioDesde: 25000
  },
  {
    id: '6',
    nombre: 'Mega Wash',
    direccion: 'Av. General Santos 1567, Asunción',
    coordenadas: {
      lat: -25.2734,
      lng: -57.5998
    },
    rating: 4.8,
    numReviews: 278,
    distancia: 2.9,
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    horarioApertura: '06:00',
    horarioCierre: '22:00',
    servicios: ['Lavado básico', 'Lavado premium', 'Detallado', 'Limpieza interior'],
    precioDesde: 38000
  }
];

// Servicios Mock
export const SERVICIOS_MOCK: Servicio[] = [
  // AutoLavado Express
  {
    id: 's1',
    lavaderoId: '1',
    nombre: 'Lavado Básico',
    descripcion: 'Lavado exterior completo con jabón y enjuague',
    precio: 35000,
    duracion: 30,
    icono: 'water-outline'
  },
  {
    id: 's2',
    lavaderoId: '1',
    nombre: 'Lavado Premium',
    descripcion: 'Lavado exterior + interior + aspirado',
    precio: 65000,
    duracion: 60,
    icono: 'sparkles-outline'
  },
  {
    id: 's3',
    lavaderoId: '1',
    nombre: 'Encerado',
    descripcion: 'Aplicación de cera protectora',
    precio: 80000,
    duracion: 45,
    icono: 'shield-outline'
  },
  {
    id: 's4',
    lavaderoId: '1',
    nombre: 'Pulido',
    descripcion: 'Pulido profesional de carrocería',
    precio: 120000,
    duracion: 90,
    icono: 'star-outline'
  },
  // Clean Car Center
  {
    id: 's5',
    lavaderoId: '2',
    nombre: 'Lavado Básico',
    descripcion: 'Lavado exterior rápido',
    precio: 30000,
    duracion: 25,
    icono: 'water-outline'
  },
  {
    id: 's6',
    lavaderoId: '2',
    nombre: 'Lavado Premium',
    descripcion: 'Lavado completo interior y exterior',
    precio: 60000,
    duracion: 55,
    icono: 'sparkles-outline'
  },
  {
    id: 's7',
    lavaderoId: '2',
    nombre: 'Limpieza Interior',
    descripcion: 'Limpieza profunda del interior',
    precio: 45000,
    duracion: 40,
    icono: 'home-outline'
  },
  // Lavadero Premium
  {
    id: 's8',
    lavaderoId: '3',
    nombre: 'Lavado Premium',
    descripcion: 'Lavado de alta calidad',
    precio: 70000,
    duracion: 60,
    icono: 'sparkles-outline'
  },
  {
    id: 's9',
    lavaderoId: '3',
    nombre: 'Detallado Completo',
    descripcion: 'Detallado interior y exterior profesional',
    precio: 180000,
    duracion: 120,
    icono: 'diamond-outline'
  },
  {
    id: 's10',
    lavaderoId: '3',
    nombre: 'Limpieza de Motor',
    descripcion: 'Limpieza profesional del motor',
    precio: 90000,
    duracion: 45,
    icono: 'cog-outline'
  },
  // Shine Auto Spa
  {
    id: 's11',
    lavaderoId: '4',
    nombre: 'Lavado Básico',
    descripcion: 'Lavado exterior estándar',
    precio: 40000,
    duracion: 30,
    icono: 'water-outline'
  },
  {
    id: 's12',
    lavaderoId: '4',
    nombre: 'Lavado Completo',
    descripcion: 'Lavado interior y exterior completo',
    precio: 75000,
    duracion: 65,
    icono: 'sparkles-outline'
  },
  // Aqua Clean
  {
    id: 's13',
    lavaderoId: '5',
    nombre: 'Lavado Básico',
    descripcion: 'Lavado rápido económico',
    precio: 25000,
    duracion: 20,
    icono: 'water-outline'
  },
  {
    id: 's14',
    lavaderoId: '5',
    nombre: 'Limpieza Express',
    descripcion: 'Limpieza rápida completa',
    precio: 45000,
    duracion: 35,
    icono: 'flash-outline'
  },
  // Mega Wash
  {
    id: 's15',
    lavaderoId: '6',
    nombre: 'Lavado Básico',
    descripcion: 'Lavado exterior básico',
    precio: 38000,
    duracion: 30,
    icono: 'water-outline'
  },
  {
    id: 's16',
    lavaderoId: '6',
    nombre: 'Lavado Premium',
    descripcion: 'Servicio premium completo',
    precio: 72000,
    duracion: 60,
    icono: 'sparkles-outline'
  },
  {
    id: 's17',
    lavaderoId: '6',
    nombre: 'Detallado',
    descripcion: 'Detallado profesional',
    precio: 150000,
    duracion: 110,
    icono: 'diamond-outline'
  }
];

// Reservas Mock (para el usuario 1 - Carlos)
export const RESERVAS_MOCK: Reserva[] = [
  {
    id: 'r1',
    usuarioId: '1',
    lavaderoId: '1',
    servicioId: 's2',
    fecha: new Date('2024-10-28'),
    hora: '10:00',
    estado: 'completada',
    precioTotal: 65000,
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Corolla',
      placa: 'ABC-1234'
    }
  },
  {
    id: 'r2',
    usuarioId: '1',
    lavaderoId: '3',
    servicioId: 's8',
    fecha: new Date('2024-10-30'),
    hora: '14:00',
    estado: 'confirmada',
    precioTotal: 70000,
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Corolla',
      placa: 'ABC-1234'
    }
  },
  {
    id: 'r3',
    usuarioId: '1',
    lavaderoId: '2',
    servicioId: 's6',
    fecha: new Date('2024-11-02'),
    hora: '09:00',
    estado: 'pendiente',
    precioTotal: 60000,
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Corolla',
      placa: 'ABC-1234'
    }
  },
  {
    id: 'r4',
    usuarioId: '1',
    lavaderoId: '4',
    servicioId: 's12',
    fecha: new Date('2024-10-25'),
    hora: '11:00',
    estado: 'completada',
    precioTotal: 75000,
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Corolla',
      placa: 'ABC-1234'
    }
  },
  {
    id: 'r5',
    usuarioId: '1',
    lavaderoId: '1',
    servicioId: 's1',
    fecha: new Date('2024-10-20'),
    hora: '15:00',
    estado: 'completada',
    precioTotal: 35000,
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Corolla',
      placa: 'ABC-1234'
    }
  },
  {
    id: 'r6',
    usuarioId: '1',
    lavaderoId: '6',
    servicioId: 's16',
    fecha: new Date('2024-11-05'),
    hora: '16:00',
    estado: 'pendiente',
    precioTotal: 72000,
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Corolla',
      placa: 'ABC-1234'
    }
  }
];

// Horarios disponibles para reservas
export const HORARIOS_DISPONIBLES = [
  { hora: '07:00', disponible: true },
  { hora: '08:00', disponible: true },
  { hora: '09:00', disponible: false },
  { hora: '10:00', disponible: true },
  { hora: '11:00', disponible: true },
  { hora: '12:00', disponible: false },
  { hora: '13:00', disponible: true },
  { hora: '14:00', disponible: false },
  { hora: '15:00', disponible: true },
  { hora: '16:00', disponible: true },
  { hora: '17:00', disponible: true },
  { hora: '18:00', disponible: false },
  { hora: '19:00', disponible: true },
  { hora: '20:00', disponible: true }
];
