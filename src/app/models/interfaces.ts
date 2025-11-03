export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  imagen: string;
  categoria: string;
}

export enum EstadoReserva {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  CANCELADA = 'cancelada'
}

export interface Reserva {
  id: string;
  usuarioId: string;
  lavaderoId: string;
  servicioId: string;
  vehiculoId: string;
  fecha: string;
  hora: string;
  estado: EstadoReserva;
  precioTotal: number;
}
export interface HorarioDisponible {
  hora: string;
  disponible: boolean;
}
