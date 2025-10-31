// Commit por Juan - Definición del modelo Reserva
export interface Reserva {
  id: number;
  usuarioId: number;
  lavaderoId: number;
  servicioId: number;
  vehiculoId: number;
  fecha: string;
  hora: string;
  estado: EstadoReserva;
  precioTotal: number;
  lavaderoNombre?: string;
  servicioNombre?: string;
  vehiculoInfo?: string;
}

export enum EstadoReserva {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  EN_PROCESO = 'en_proceso',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada'
}
