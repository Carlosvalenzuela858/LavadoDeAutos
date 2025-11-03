import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Servicio, Reserva, HorarioDisponible, EstadoReserva } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private servicios: Servicio[] = [];
  private reservas: Reserva[] = [];
  private reservasSubject: BehaviorSubject<Reserva[]>;
  public reservas$: Observable<Reserva[]>;

  constructor() {
    this.initServicios();
    const saved = localStorage.getItem('reservas');
    this.reservas = saved ? JSON.parse(saved) : [];
    this.reservasSubject = new BehaviorSubject<Reserva[]>(this.reservas);
    this.reservas$ = this.reservasSubject.asObservable();
  }

  /** Inicializa los servicios disponibles */
  private initServicios(): void {
    this.servicios = [
      {
        id: 's1',
        nombre: 'Lavado Básico',
        descripcion: 'Lavado exterior completo del vehículo con jabón especial',
        precio: 80000,
        duracion: 30,
        categoria: 'basico',
        imagen: '🚗'
      },
      {
        id: 's2',
        nombre: 'Lavado Premium',
        descripcion: 'Lavado exterior e interior, aspirado y limpieza de tapicería',
        precio: 150000,
        duracion: 60,
        categoria: 'premium',
        imagen: '✨'
      },
      {
        id: 's3',
        nombre: 'Limpieza de Motor',
        descripcion: 'Limpieza profunda del motor con productos especializados',
        precio: 120000,
        duracion: 45,
        categoria: 'premium',
        imagen: '⚙️'
      }
    ];
  }

  /** Devuelve la lista de servicios */
  getServicios(): Servicio[] {
    return this.servicios;
  }

  /** Crea una nueva reserva */
  crearReserva(reserva: Omit<Reserva, 'id' | 'estado'>): Reserva {
    const nuevaReserva: Reserva = {
      ...reserva,
      id: Date.now().toString(), // ahora string
      estado: EstadoReserva.CONFIRMADA
    };

    this.reservas.push(nuevaReserva);
    this.saveReservas();
    this.reservasSubject.next(this.reservas);
    return nuevaReserva;
  }

  /** Devuelve horarios disponibles para una fecha */
  getHorariosDisponibles(fecha: Date): HorarioDisponible[] {
    const horarios: HorarioDisponible[] = [];
    const horas = ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
    const fechaSel = fecha.toDateString();

    horas.forEach(hora => {
      const reservada = this.reservas.some(r =>
        new Date(r.fecha).toDateString() === fechaSel && r.hora === hora
      );
      horarios.push({ hora, disponible: !reservada });
    });

    return horarios;
  }

  /** Devuelve las reservas de un usuario */
  getReservasPorUsuario(usuarioId: string): Reserva[] {
    return this.reservas.filter(r => r.usuarioId === usuarioId);
  }

  /** Cancela una reserva existente */
  cancelarReserva(id: string): boolean {
    const reserva = this.reservas.find(r => r.id === id);
    if (!reserva) return false;
    reserva.estado = EstadoReserva.CANCELADA;
    this.saveReservas();
    this.reservasSubject.next(this.reservas);
    return true;
  }

  /** Guarda reservas en localStorage */
  private saveReservas(): void {
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }
}
