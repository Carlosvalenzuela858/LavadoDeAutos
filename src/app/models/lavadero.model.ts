// Commit por María - Definición de modelos de Lavadero y Servicios
export interface Lavadero {
  id: number;
  nombre: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  coordenadas: Coordenadas;
  horarios: string;
  rating: number;
  imagen: string;
  servicios: Servicio[];
}

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number; // en minutos
  icono: string;
}

export interface HorarioDisponible {
  hora: string;
  disponible: boolean;
}
