// Modelo de Usuario
export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  fechaRegistro: Date;
  avatar?: string;
}

// Modelo de Lavadero
export interface Lavadero {
  id: string;
  nombre: string;
  direccion: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  rating: number;
  numReviews: number;
  distancia: number; // en km
  imagen: string;
  horarioApertura: string;
  horarioCierre: string;
  servicios: string[];
  precioDesde: number;
}

// Modelo de Servicio
export interface Servicio {
  id: string;
  lavaderoId: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number; // en minutos
  icono: string;
}

// Modelo de Horario disponible
export interface HorarioDisponible {
  hora: string;
  disponible: boolean;
}

// Modelo de Reserva
export interface Reserva {
  id: string;
  usuarioId: string;
  lavaderoId: string;
  servicioId: string;
  fecha: Date;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  precioTotal: number;
  vehiculo: {
    marca: string;
    modelo: string;
    placa: string;
  };
  lavadero?: Lavadero;
  servicio?: Servicio;
}

// Modelo de respuesta de login
export interface LoginResponse {
  success: boolean;
  usuario?: Usuario;
  token?: string;
  mensaje?: string;
}
