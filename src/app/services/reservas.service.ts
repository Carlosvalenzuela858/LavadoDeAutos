import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reserva, EstadoReserva } from '../models/reserva.model';
import { RESERVAS_MOCK } from '../data/reservas.data';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private reservas: Reserva[] = [...RESERVAS_MOCK];

  constructor() {}

  // 🔹 Devuelve todas las reservas
  getReservas() {
    return of(this.reservas).pipe(delay(300));
  }

  // 🔹 Devuelve reservas de un usuario (usuarioId string)
  getReservasPorUsuario(usuarioId: string) {
    const reservasUsuario = this.reservas.filter(r => r.usuarioId === usuarioId);
    return of(reservasUsuario).pipe(delay(200));
  }

  // 🔹 Devuelve una reserva por id (string)
  getReservaPorId(id: string) {
    return of(this.reservas.find(r => r.id === id)).pipe(delay(200));
  }

  // 🔹 Crea una nueva reserva
  crearReserva(reserva: Omit<Reserva, 'id' | 'estado'>) {
    const nuevaReserva: Reserva = {
      ...reserva,
      id: this.getNextId().toString(), // ✅ id como string
      estado: EstadoReserva.CONFIRMADA
    };
    this.reservas.push(nuevaReserva);
    return of(nuevaReserva).pipe(delay(200));
  }

  // 🔹 Cancela una reserva
  cancelarReserva(id: string) {
    const reserva = this.reservas.find(r => r.id === id);
    if (reserva) {
      reserva.estado = EstadoReserva.CANCELADA;
    }
    return of(reserva).pipe(delay(200));
  }

  // 🔹 Verifica si ya existe una reserva para un usuario en el mismo horario
  existeReserva(usuarioId: string, fecha: string, hora: string) {
    return this.reservas.some(
      r =>
        r.usuarioId === usuarioId &&
        r.fecha === fecha &&
        r.hora === hora &&
        r.estado !== EstadoReserva.CANCELADA
    );
  }

  // 🔹 Genera un nuevo ID secuencial (string)
  private getNextId(): string {
    if (this.reservas.length === 0) return '1';
    const ids = this.reservas.map(r => parseInt(r.id, 10));
    const nextId = Math.max(...ids) + 1;
    return nextId.toString();
  }
}
