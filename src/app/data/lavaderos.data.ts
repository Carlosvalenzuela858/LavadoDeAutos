// Commit por María - Mock data de lavaderos en Asunción
import { Lavadero, Servicio } from '../models/lavadero.model';

export const SERVICIOS_DISPONIBLES: Servicio[] = [
  {
    id: 1,
    nombre: 'Lavado Básico',
    descripcion: 'Lavado exterior completo del vehículo',
    precio: 50000,
    duracion: 30,
    icono: 'water-outline'
  },
  {
    id: 2,
    nombre: 'Lavado Premium',
    descripcion: 'Lavado exterior e interior completo',
    precio: 80000,
    duracion: 45,
    icono: 'sparkles-outline'
  },
  {
    id: 3,
    nombre: 'Lavado Completo',
    descripcion: 'Lavado, aspirado y limpieza profunda',
    precio: 120000,
    duracion: 60,
    icono: 'star-outline'
  },
  {
    id: 4,
    nombre: 'Encerado',
    descripcion: 'Aplicación de cera protectora',
    precio: 70000,
    duracion: 45,
    icono: 'shield-checkmark-outline'
  },
  {
    id: 5,
    nombre: 'Pulido',
    descripcion: 'Pulido y brillo profesional',
    precio: 150000,
    duracion: 90,
    icono: 'diamond-outline'
  },
  {
    id: 6,
    nombre: 'Lavado de Motor',
    descripcion: 'Limpieza profunda del motor',
    precio: 60000,
    duracion: 40,
    icono: 'cog-outline'
  }
];

export const LAVADEROS_MOCK: Lavadero[] = [
  {
    id: 1,
    nombre: "Jack's Car Wash",
    descripcion: 'El mejor servicio de lavado de autos en Asunción',
    direccion: 'Av. España 1234, Asunción',
    telefono: '021-123456',
    coordenadas: { lat: -25.2637, lng: -57.5759 },
    horarios: 'Lun-Sab: 7:00-19:00, Dom: 8:00-14:00',
    rating: 4.8,
    imagen: 'assets/lavaderos/jacks.jpg',
    servicios: [
      SERVICIOS_DISPONIBLES[0],
      SERVICIOS_DISPONIBLES[1],
      SERVICIOS_DISPONIBLES[2],
      SERVICIOS_DISPONIBLES[3]
    ]
  },
  {
    id: 2,
    nombre: 'Auto Shine Express',
    descripcion: 'Lavado rápido y profesional',
    direccion: 'Av. Mariscal López 5678, Asunción',
    telefono: '021-234567',
    coordenadas: { lat: -25.2850, lng: -57.5650 },
    horarios: 'Lun-Vie: 7:00-20:00, Sáb: 8:00-18:00',
    rating: 4.5,
    imagen: 'assets/lavaderos/autoshine.jpg',
    servicios: [
      SERVICIOS_DISPONIBLES[0],
      SERVICIOS_DISPONIBLES[1],
      SERVICIOS_DISPONIBLES[5]
    ]
  },
  {
    id: 3,
    nombre: 'Car Clean Pro',
    descripcion: 'Expertos en limpieza automotriz',
    direccion: 'Av. San Martín 910, Asunción',
    telefono: '021-345678',
    coordenadas: { lat: -25.2800, lng: -57.6300 },
    horarios: 'Lun-Sáb: 8:00-18:00',
    rating: 4.7,
    imagen: 'assets/lavaderos/carclean.jpg',
    servicios: [
      SERVICIOS_DISPONIBLES[1],
      SERVICIOS_DISPONIBLES[2],
      SERVICIOS_DISPONIBLES[4]
    ]
  },
  {
    id: 4,
    nombre: 'Super Lavado',
    descripcion: 'Servicio rápido y económico',
    direccion: 'Av. Eusebio Ayala 2345, Asunción',
    telefono: '021-456789',
    coordenadas: { lat: -25.2950, lng: -57.5800 },
    horarios: 'Lun-Dom: 7:00-19:00',
    rating: 4.3,
    imagen: 'assets/lavaderos/superlavado.jpg',
    servicios: [
      SERVICIOS_DISPONIBLES[0],
      SERVICIOS_DISPONIBLES[1]
    ]
  },
  {
    id: 5,
    nombre: 'Premium Auto Spa',
    descripcion: 'Cuidado de lujo para tu vehículo',
    direccion: 'Av. República Argentina 3456, Asunción',
    telefono: '021-567890',
    coordenadas: { lat: -25.2700, lng: -57.5900 },
    horarios: 'Lun-Vie: 8:00-19:00, Sáb: 9:00-17:00',
    rating: 4.9,
    imagen: 'assets/lavaderos/premium.jpg',
    servicios: [
      SERVICIOS_DISPONIBLES[2],
      SERVICIOS_DISPONIBLES[3],
      SERVICIOS_DISPONIBLES[4],
      SERVICIOS_DISPONIBLES[5]
    ]
  },
  {
    id: 6,
    nombre: 'Eco Wash',
    descripcion: 'Lavado ecológico y sostenible',
    direccion: 'Av. Carlos Antonio López 4567, Asunción',
    telefono: '021-678901',
    coordenadas: { lat: -25.3000, lng: -57.6100 },
    horarios: 'Lun-Sáb: 7:30-18:30',
    rating: 4.6,
    imagen: 'assets/lavaderos/ecowash.jpg',
    servicios: [
      SERVICIOS_DISPONIBLES[0],
      SERVICIOS_DISPONIBLES[1],
      SERVICIOS_DISPONIBLES[2]
    ]
  },
  {
    id: 7,
    nombre: 'Flash Car Wash',
    descripcion: 'El lavado más rápido de Asunción',
    direccion: 'Av. Mcal. Estigarribia 5678, Asunción',
    telefono: '021-789012',
    coordenadas: { lat: -25.2600, lng: -57.6000 },
    horarios: 'Lun-Dom: 6:00-20:00',
    rating: 4.4,
    imagen: 'assets/lavaderos/flash.jpg',
    servicios: [
      SERVICIOS_DISPONIBLES[0],
      SERVICIOS_DISPONIBLES[5]
    ]
  },
  {
    id: 8,
    nombre: 'Detail Masters',
    descripcion: 'Detallado profesional y pulido',
    direccion: 'Av. Artigas 6789, Asunción',
    telefono: '021-890123',
    coordenadas: { lat: -25.2750, lng: -57.5850 },
    horarios: 'Lun-Vie: 8:00-18:00',
    rating: 4.8,
    imagen: 'assets/lavaderos/detail.jpg',
    servicios: [
      SERVICIOS_DISPONIBLES[2],
      SERVICIOS_DISPONIBLES[3],
      SERVICIOS_DISPONIBLES[4]
    ]
  }
];

export const HORARIOS_DISPONIBLES = [
  { hora: '08:00 AM', disponible: true },
  { hora: '09:00 AM', disponible: true },
  { hora: '10:00 AM', disponible: false },
  { hora: '11:00 AM', disponible: true },
  { hora: '12:00 PM', disponible: true },
  { hora: '01:00 PM', disponible: false },
  { hora: '02:00 PM', disponible: true },
  { hora: '03:00 PM', disponible: true },
  { hora: '04:00 PM', disponible: true },
  { hora: '05:00 PM', disponible: false },
  { hora: '06:00 PM', disponible: true }
];
