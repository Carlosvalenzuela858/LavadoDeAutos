import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Servicio, Reserva, Horario } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private servicios: Servicio[] = [];
  private reservas: Reserva[] = [];
  private reservasSubject: BehaviorSubject<Reserva[]>;
  public reservas$: Observable<Reserva[]>;

  constructor() {
    this.initMockData();
    const savedReservas = localStorage.getItem('reservas');
    this.reservas = savedReservas ? JSON.parse(savedReservas) : [];
    this.reservasSubject = new BehaviorSubject<Reserva[]>(this.reservas);
    this.reservas$ = this.reservasSubject.asObservable();
  }

  private initMockData() {
    this.servicios = [
      {
        id: 's1',
        nombre: 'Lavado Básico',
        descripcion: 'Lavado exterior completo del vehículo con jabón especial',
        precio: 80000,
        duracion: 30,
        imagen: '🚗',
        categoria: 'basico'
      },
      {
        id: 's2',
        nombre: 'Lavado Premium',
        descripcion: 'Lavado exterior e interior, aspirado y limpieza de tapicería',
        precio: 150000,
        duracion: 60,
        imagen: '✨',
        categoria: 'premium'
      },
      {
        id: 's3',
        nombre: 'Lavado Completo',
        descripcion: 'Lavado completo, encerado, pulido y desinfección interior',
        precio: 250000,
        duracion: 90,
        imagen: '💎',
        categoria: 'completo'
      },
      {
        id: 's4',
        nombre: 'Limpieza de Motor',
        descripcion: 'Limpieza profunda del motor con productos especializados',
        precio: 120000,
        duracion: 45,
        imagen: '⚙️',
        categoria: 'premium'
      },
      {
        id: 's5',
        nombre: 'Pulido y Encerado',
        descripcion: 'Pulido profesional y encerado de la carrocería',
        precio: 180000,
        duracion: 75,
        imagen: '✨',
        categoria: 'premium'
      },
      {
        id: 's6',
        nombre: 'Detallado Completo',
        descripcion: 'Servicio completo de detallado profesional interior y exterior',
        precio: 400000,
        duracion: 180,
        imagen: '🏆',
        categoria: 'completo'
      }
    ];
  }

  getServicios(): Servicio[] {
    return this.servicios;
  }

  getServicioById(id: string): Servicio | undefined {
    return this.servicios.find(s => s.id === id);
  }

  getServiciosPorCategoria(categoria: string): Servicio[] {
    if (categoria === 'todos') {
      return this.servicios;
    }
    return this.servicios.filter(s => s.categoria === categoria);
  }

  getHorariosDisponibles(fecha: Date): Horario[] {
    const horarios: Horario[] = [];
    const horas = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    
    horas.forEach(hora => {
      const reservada = this.reservas.some(r => 
        r.fecha.toDateString() === fecha.toDateString() && r.hora === hora
      );
      horarios.push({
        hora,
        disponible: !reservada
      });
    });

    return horarios;
  }

  crearReserva(reserva: Omit<Reserva, 'id' | 'estado'>): Reserva {
    const newReserva: Reserva = {
      ...reserva,
      id: Date.now().toString(),
      estado: 'confirmada'
    };

    this.reservas.push(newReserva);
    this.saveReservas();
    this.reservasSubject.next(this.reservas);
    return newReserva;
  }

  getReservasPorUsuario(usuarioId: string): Reserva[] {
    return this.reservas
      .filter(r => r.usuarioId === usuarioId)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }

  cancelarReserva(reservaId: string): boolean {
    const reserva = this.reservas.find(r => r.id === reservaId);
    if (reserva) {
      reserva.estado = 'cancelada';
      this.saveReservas();
      this.reservasSubject.next(this.reservas);
      return true;
    }
    return false;
  }

  private saveReservas() {
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }
}
