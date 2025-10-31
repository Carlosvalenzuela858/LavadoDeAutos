// Commit por Juan - Mock data de reservas
import { Reserva, EstadoReserva } from '../models/reserva.model';

export const RESERVAS_MOCK: Reserva[] = [
  {
    id: 1,
    usuarioId: 1,
    lavaderoId: 1,
    servicioId: 2,
    vehiculoId: 1,
    fecha: '2025-11-01',
    hora: '09:00 AM',
    estado: EstadoReserva.COMPLETADA,
    precioTotal: 80000,
    lavaderoNombre: "Jack's Car Wash",
    servicioNombre: 'Lavado Premium',
    vehiculoInfo: 'Toyota Corolla - ABC-123'
  },
  {
    id: 2,
    usuarioId: 1,
    lavaderoId: 5,
    servicioId: 4,
    vehiculoId: 1,
    fecha: '2025-11-05',
    hora: '02:00 PM',
    estado: EstadoReserva.COMPLETADA,
    precioTotal: 70000,
    lavaderoNombre: 'Premium Auto Spa',
    servicioNombre: 'Encerado',
    vehiculoInfo: 'Toyota Corolla - ABC-123'
  },
  {
    id: 3,
    usuarioId: 1,
    lavaderoId: 1,
    servicioId: 3,
    vehiculoId: 2,
    fecha: '2025-11-02',
    hora: '11:00 AM',
    estado: EstadoReserva.CONFIRMADA,
    precioTotal: 120000,
    lavaderoNombre: "Jack's Car Wash",
    servicioNombre: 'Lavado Completo',
    vehiculoInfo: 'Honda Civic - XYZ-789'
  },
  {
    id: 4,
    usuarioId: 1,
    lavaderoId: 3,
    servicioId: 5,
    vehiculoId: 1,
    fecha: '2025-11-03',
    hora: '03:00 PM',
    estado: EstadoReserva.PENDIENTE,
    precioTotal: 150000,
    lavaderoNombre: 'Car Clean Pro',
    servicioNombre: 'Pulido',
    vehiculoInfo: 'Toyota Corolla - ABC-123'
  },
  {
    id: 5,
    usuarioId: 2,
    lavaderoId: 2,
    servicioId: 1,
    vehiculoId: 3,
    fecha: '2025-10-28',
    hora: '08:00 AM',
    estado: EstadoReserva.COMPLETADA,
    precioTotal: 50000,
    lavaderoNombre: 'Auto Shine Express',
    servicioNombre: 'Lavado Básico',
    vehiculoInfo: 'Nissan Versa - DEF-456'
  },
  {
    id: 6,
    usuarioId: 3,
    lavaderoId: 4,
    servicioId: 2,
    vehiculoId: 4,
    fecha: '2025-10-30',
    hora: '04:00 PM',
    estado: EstadoReserva.COMPLETADA,
    precioTotal: 80000,
    lavaderoNombre: 'Super Lavado',
    servicioNombre: 'Lavado Premium',
    vehiculoInfo: 'Chevrolet Onix - GHI-789'
  }
];
