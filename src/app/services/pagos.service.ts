import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MetodoPago, Transaccion } from '../models/extended.models';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private metodosPago: MetodoPago[] = [
    {
      id: 1,
      usuarioId: 1,
      tipo: 'tarjeta',
      nombre: 'Visa terminada en 4242',
      numero: '4242',
      vencimiento: '12/25',
      esDefault: true
    },
    {
      id: 2,
      usuarioId: 1,
      tipo: 'paypal',
      nombre: 'PayPal',
      paypalEmail: 'usuario@email.com',
      esDefault: false
    }
  ];

  private transacciones: Transaccion[] = [];
  private transaccionesSubject = new BehaviorSubject<Transaccion[]>([]);

  constructor() {}

  // ============= MÉTODOS DE PAGO =============
  getMetodosPago(usuarioId: number): Observable<MetodoPago[]> {
    return of(this.metodosPago.filter(m => m.usuarioId === usuarioId))
      .pipe(delay(300));
  }

  agregarMetodoPago(metodo: Omit<MetodoPago, 'id'>): Observable<MetodoPago> {
    const nuevoMetodo: MetodoPago = {
      ...metodo,
      id: this.getNextMetodoId()
    };
    
    // Si es default, quitar default de los demás
    if (nuevoMetodo.esDefault) {
      this.metodosPago.forEach(m => {
        if (m.usuarioId === nuevoMetodo.usuarioId) {
          m.esDefault = false;
        }
      });
    }
    
    this.metodosPago.push(nuevoMetodo);
    return of(nuevoMetodo).pipe(delay(500));
  }

  eliminarMetodoPago(id: number): Observable<boolean> {
    const index = this.metodosPago.findIndex(m => m.id === id);
    if (index > -1) {
      this.metodosPago.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  setMetodoDefault(id: number, usuarioId: number): Observable<boolean> {
    // Quitar default de todos
    this.metodosPago.forEach(m => {
      if (m.usuarioId === usuarioId) {
        m.esDefault = false;
      }
    });
    
    // Establecer nuevo default
    const metodo = this.metodosPago.find(m => m.id === id);
    if (metodo) {
      metodo.esDefault = true;
      return of(true).pipe(delay(200));
    }
    return of(false);
  }

  // ============= PROCESAMIENTO DE PAGOS =============
  procesarPago(data: {
    reservaId: number;
    usuarioId: number;
    monto: number;
    metodoPagoId: number;
  }): Observable<Transaccion> {
    const transaccion: Transaccion = {
      id: this.getNextTransaccionId(),
      reservaId: data.reservaId,
      usuarioId: data.usuarioId,
      monto: data.monto,
      metodoPagoId: data.metodoPagoId,
      estado: 'pendiente',
      fecha: new Date().toISOString()
    };

    // Simular procesamiento de pago
    return of(transaccion).pipe(
      delay(2000),
      map(t => {
        // Simular éxito del pago (90% de éxito)
        const exito = Math.random() > 0.1;
        t.estado = exito ? 'completado' : 'fallido';
        
        if (exito) {
          const metodo = this.metodosPago.find(m => m.id === data.metodoPagoId);
          if (metodo?.tipo === 'tarjeta') {
            t.stripePaymentId = `pi_${this.generateRandomId()}`;
          } else if (metodo?.tipo === 'paypal') {
            t.paypalPaymentId = `PAY-${this.generateRandomId()}`;
          }
        }
        
        this.transacciones.push(t);
        this.transaccionesSubject.next(this.transacciones);
        return t;
      })
    );
  }

  // Procesar pago con Stripe (simulado)
  procesarPagoStripe(data: {
    amount: number;
    cardToken: string;
    description: string;
  }): Observable<{success: boolean; paymentId?: string; error?: string}> {
    return of(null).pipe(
      delay(2000),
      map(() => {
        const success = Math.random() > 0.1;
        if (success) {
          return {
            success: true,
            paymentId: `pi_${this.generateRandomId()}`
          };
        } else {
          return {
            success: false,
            error: 'Tarjeta rechazada. Por favor, intente con otro método de pago.'
          };
        }
      })
    );
  }

  // Procesar pago con PayPal (simulado)
  procesarPagoPayPal(data: {
    amount: number;
    email: string;
    description: string;
  }): Observable<{success: boolean; paymentId?: string; error?: string}> {
    return of(null).pipe(
      delay(2000),
      map(() => {
        const success = Math.random() > 0.05;
        if (success) {
          return {
            success: true,
            paymentId: `PAY-${this.generateRandomId()}`
          };
        } else {
          return {
            success: false,
            error: 'Error en PayPal. Por favor, intente nuevamente.'
          };
        }
      })
    );
  }

  // ============= TRANSACCIONES =============
  getTransaccionesByUsuario(usuarioId: number): Observable<Transaccion[]> {
    return of(this.transacciones.filter(t => t.usuarioId === usuarioId))
      .pipe(delay(300));
  }

  getTransaccionById(id: number): Observable<Transaccion | undefined> {
    return of(this.transacciones.find(t => t.id === id))
      .pipe(delay(200));
  }

  getTransaccionesByReserva(reservaId: number): Observable<Transaccion[]> {
    return of(this.transacciones.filter(t => t.reservaId === reservaId))
      .pipe(delay(200));
  }

  // ============= REEMBOLSOS =============
  procesarReembolso(transaccionId: number): Observable<boolean> {
    const transaccion = this.transacciones.find(t => t.id === transaccionId);
    if (transaccion && transaccion.estado === 'completado') {
      return of(null).pipe(
        delay(1500),
        map(() => {
          transaccion.estado = 'reembolsado';
          this.transaccionesSubject.next(this.transacciones);
          return true;
        })
      );
    }
    return of(false);
  }

  // ============= ESTADÍSTICAS =============
  getTotalGastado(usuarioId: number): Observable<number> {
    const total = this.transacciones
      .filter(t => t.usuarioId === usuarioId && t.estado === 'completado')
      .reduce((sum, t) => sum + t.monto, 0);
    return of(total).pipe(delay(200));
  }

  getGastosPorMes(usuarioId: number, meses: number = 6): Observable<{mes: string, total: number}[]> {
    const gastos = this.transacciones
      .filter(t => t.usuarioId === usuarioId && t.estado === 'completado')
      .reduce((acc, t) => {
        const fecha = new Date(t.fecha);
        const mes = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        if (!acc[mes]) acc[mes] = 0;
        acc[mes] += t.monto;
        return acc;
      }, {} as Record<string, number>);

    const resultado = Object.entries(gastos)
      .map(([mes, total]) => ({ mes, total }))
      .slice(-meses);

    return of(resultado).pipe(delay(300));
  }

  // ============= HELPERS =============
  private getNextMetodoId(): number {
    return Math.max(...this.metodosPago.map(m => m.id), 0) + 1;
  }

  private getNextTransaccionId(): number {
    return Math.max(...this.transacciones.map(t => t.id), 0) + 1;
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}
