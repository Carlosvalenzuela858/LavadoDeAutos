export enum EstadoReserva {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  COMPLETADA = 'completada',
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
  lavaderoNombre?: string;
  servicioNombre?: string;
  vehiculoInfo?: string;
}
