// Commit por Juan - Servicio de gestión de reservas
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reserva, EstadoReserva } from '../models/reserva.model';
import { RESERVAS_MOCK } from '../data/reservas.data';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private reservas = [...RESERVAS_MOCK];
  private reservasSubject = new BehaviorSubject<Reserva[]>(this.reservas);

  constructor() { }

  getReservasByUsuario(usuarioId: number): Observable<Reserva[]> {
    const reservasUsuario = this.reservas.filter(r => r.usuarioId === usuarioId);
    return of(reservasUsuario).pipe(delay(300));
  }

  getReservaById(id: number): Observable<Reserva | undefined> {
    return of(this.reservas.find(r => r.id === id)).pipe(delay(200));
  }

  crearReserva(reserva: Omit<Reserva, 'id'>): Observable<Reserva> {
    const nuevaReserva: Reserva = {
      ...reserva,
      id: this.getNextId(),
      estado: EstadoReserva.PENDIENTE
    };
    this.reservas.push(nuevaReserva);
    this.reservasSubject.next(this.reservas);
    return of(nuevaReserva).pipe(delay(500));
  }

  cancelarReserva(id: number): Observable<boolean> {
    const reserva = this.reservas.find(r => r.id === id);
    if (reserva) {
      reserva.estado = EstadoReserva.CANCELADA;
      this.reservasSubject.next(this.reservas);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  getReservasPendientes(usuarioId: number): Observable<Reserva[]> {
    const pendientes = this.reservas.filter(r => 
      r.usuarioId === usuarioId && 
      (r.estado === EstadoReserva.PENDIENTE || r.estado === EstadoReserva.CONFIRMADA)
    );
    return of(pendientes).pipe(delay(200));
  }

  getReservasCompletadas(usuarioId: number): Observable<Reserva[]> {
    const completadas = this.reservas.filter(r => 
      r.usuarioId === usuarioId && 
      r.estado === EstadoReserva.COMPLETADA
    );
    return of(completadas).pipe(delay(200));
  }

  private getNextId(): number {
    return Math.max(...this.reservas.map(r => r.id), 0) + 1;
  }
}
