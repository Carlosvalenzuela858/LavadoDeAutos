import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Cupon, CuponUsuario, Promocion } from '../models/extended.models';

@Injectable({
  providedIn: 'root'
})
export class CuponesService {
  private cupones: Cupon[] = [
    {
      id: 1,
      codigo: 'LAVADO50',
      descripcion: '50% de descuento en lavado completo',
      tipo: 'porcentaje',
      valor: 50,
      minimoCompra: 100000,
      maximoDescuento: 50000,
      fechaInicio: '2025-11-01T00:00:00',
      fechaFin: '2025-11-30T23:59:59',
      usos: 45,
      usosMaximos: 100,
      activo: true
    },
    {
      id: 2,
      codigo: 'PRIMERAVEZ',
      descripcion: '20.000 Gs de descuento en tu primera reserva',
      tipo: 'fijo',
      valor: 20000,
      fechaInicio: '2025-10-01T00:00:00',
      fechaFin: '2025-12-31T23:59:59',
      usos: 234,
      activo: true
    },
    {
      id: 3,
      codigo: 'PREMIUM2X1',
      descripcion: '2x1 en lavado premium los lunes',
      tipo: 'porcentaje',
      valor: 50,
      fechaInicio: '2025-11-01T00:00:00',
      fechaFin: '2025-11-30T23:59:59',
      usos: 12,
      usosMaximos: 50,
      activo: true,
      serviciosAplicables: [1, 2] // Solo servicios premium
    }
  ];

  private promociones: Promocion[] = [
    {
      id: 1,
      titulo: 'Lavado + Encerado ¡50% OFF!',
      descripcion: 'Aprovecha esta increíble oferta por tiempo limitado',
      imagen: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600',
      descuento: 50,
      tipo: 'porcentaje',
      fechaInicio: '2025-11-01T00:00:00',
      fechaFin: '2025-11-15T23:59:59',
      activa: true
    },
    {
      id: 2,
      lavaderoId: 1,
      titulo: 'Happy Hour - 30% OFF',
      descripcion: 'De lunes a viernes de 2pm a 5pm',
      imagen: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600',
      descuento: 30,
      tipo: 'porcentaje',
      fechaInicio: '2025-11-01T00:00:00',
      fechaFin: '2025-11-30T23:59:59',
      activa: true
    },
    {
      id: 3,
      titulo: 'Black Friday - Lavado Gratis',
      descripcion: 'En la compra de cualquier servicio premium',
      imagen: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600',
      descuento: 100,
      tipo: '2x1',
      fechaInicio: '2025-11-29T00:00:00',
      fechaFin: '2025-11-29T23:59:59',
      activa: true
    }
  ];

  private cuponesUsuario: CuponUsuario[] = [
    {
      id: 1,
      usuarioId: 1,
      cuponId: 1,
      usado: false
    }
  ];

  private cuponesSubject = new BehaviorSubject<Cupon[]>(this.cupones);
  private promocionesSubject = new BehaviorSubject<Promocion[]>(this.promociones);

  constructor() {}

  // ============= CUPONES =============
  getCuponesActivos(): Observable<Cupon[]> {
    const ahora = new Date();
    return of(this.cupones.filter(c => 
      c.activo && 
      new Date(c.fechaInicio) <= ahora &&
      new Date(c.fechaFin) >= ahora &&
      (!c.usosMaximos || c.usos < c.usosMaximos)
    )).pipe(delay(300));
  }

  getCuponByCodigo(codigo: string): Observable<Cupon | undefined> {
    return of(this.cupones.find(c => c.codigo.toUpperCase() === codigo.toUpperCase()))
      .pipe(delay(200));
  }

  validarCupon(codigo: string, monto: number, lavaderoId?: number, servicioId?: number): Observable<{
    valido: boolean;
    cupon?: Cupon;
    descuento?: number;
    error?: string;
  }> {
    return this.getCuponByCodigo(codigo).pipe(
      map(cupon => {
        if (!cupon) {
          return { valido: false, error: 'Cupón no encontrado' };
        }

        if (!cupon.activo) {
          return { valido: false, error: 'Cupón inactivo' };
        }

        const ahora = new Date();
        if (new Date(cupon.fechaInicio) > ahora) {
          return { valido: false, error: 'Cupón aún no válido' };
        }

        if (new Date(cupon.fechaFin) < ahora) {
          return { valido: false, error: 'Cupón expirado' };
        }

        if (cupon.usosMaximos && cupon.usos >= cupon.usosMaximos) {
          return { valido: false, error: 'Cupón agotado' };
        }

        if (cupon.minimoCompra && monto < cupon.minimoCompra) {
          return { 
            valido: false, 
            error: `Compra mínima de ${cupon.minimoCompra} Gs requerida` 
          };
        }

        if (cupon.lavaderosAplicables && lavaderoId && !cupon.lavaderosAplicables.includes(lavaderoId)) {
          return { valido: false, error: 'Cupón no válido para este lavadero' };
        }

        if (cupon.serviciosAplicables && servicioId && !cupon.serviciosAplicables.includes(servicioId)) {
          return { valido: false, error: 'Cupón no válido para este servicio' };
        }

        let descuento = 0;
        if (cupon.tipo === 'porcentaje') {
          descuento = (monto * cupon.valor) / 100;
          if (cupon.maximoDescuento) {
            descuento = Math.min(descuento, cupon.maximoDescuento);
          }
        } else {
          descuento = cupon.valor;
        }

        return {
          valido: true,
          cupon,
          descuento: Math.round(descuento)
        };
      })
    );
  }

  aplicarCupon(usuarioId: number, cuponId: number, reservaId: number): Observable<boolean> {
    const cupon = this.cupones.find(c => c.id === cuponId);
    if (!cupon) return of(false);

    // Registrar uso del cupón
    const cuponUsuario: CuponUsuario = {
      id: this.getNextCuponUsuarioId(),
      usuarioId,
      cuponId,
      usado: true,
      fechaUso: new Date().toISOString(),
      reservaId
    };

    this.cuponesUsuario.push(cuponUsuario);
    cupon.usos++;
    this.cuponesSubject.next(this.cupones);

    return of(true).pipe(delay(300));
  }

  getCuponesByUsuario(usuarioId: number): Observable<CuponUsuario[]> {
    return of(this.cuponesUsuario.filter(cu => cu.usuarioId === usuarioId))
      .pipe(delay(200));
  }

  // ============= PROMOCIONES =============
  getPromocionesActivas(): Observable<Promocion[]> {
    const ahora = new Date();
    return of(this.promociones.filter(p => 
      p.activa &&
      new Date(p.fechaInicio) <= ahora &&
      new Date(p.fechaFin) >= ahora
    )).pipe(delay(300));
  }

  getPromocionesByLavadero(lavaderoId: number): Observable<Promocion[]> {
    const ahora = new Date();
    return of(this.promociones.filter(p => 
      p.activa &&
      (!p.lavaderoId || p.lavaderoId === lavaderoId) &&
      new Date(p.fechaInicio) <= ahora &&
      new Date(p.fechaFin) >= ahora
    )).pipe(delay(300));
  }

  getPromocionById(id: number): Observable<Promocion | undefined> {
    return of(this.promociones.find(p => p.id === id))
      .pipe(delay(200));
  }

  // ============= ESTADÍSTICAS =============
  getAhorroTotal(usuarioId: number): Observable<number> {
    // En implementación real, calcularías el ahorro total de las transacciones
    return of(125000).pipe(delay(200)); // Simulado
  }

  getCuponesUsados(usuarioId: number): Observable<number> {
    return of(this.cuponesUsuario.filter(cu => cu.usuarioId === usuarioId && cu.usado).length)
      .pipe(delay(200));
  }

  // ============= HELPERS =============
  private getNextCuponUsuarioId(): number {
    return Math.max(...this.cuponesUsuario.map(cu => cu.id), 0) + 1;
  }

  // ============= NOTIFICAR PROMOCIONES =============
  notificarPromocionesNuevas(usuarioId: number): Observable<Promocion[]> {
    // Obtener promociones nuevas (últimas 24 horas)
    const hace24h = new Date();
    hace24h.setHours(hace24h.getHours() - 24);

    const promocionesNuevas = this.promociones.filter(p => 
      p.activa &&
      new Date(p.fechaInicio) >= hace24h
    );

    return of(promocionesNuevas).pipe(delay(300));
  }
}
