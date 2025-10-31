export interface Servicio {
  id: number;             // ✅ número, no string
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  imagen: string;
  categoria: string;      // ✅ agregar esta propiedad
}

export interface Reserva {
  id: number;             // ✅ número, no string
  usuarioId: number;
  servicioId: number;
  fecha: string;
  hora: string;
  estado: string;
}

export interface HorarioDisponible {
  hora: string;
  disponible: boolean;
}
