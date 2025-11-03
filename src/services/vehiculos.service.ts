import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Vehiculo } from '../models/extended.models';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private vehiculos: Vehiculo[] = [
    {
      id: 1,
      usuarioId: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2022,
      color: 'Blanco',
      placa: 'ABC123',
      tipo: 'auto',
      esPredeterminado: true,
      foto: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'
    },
    {
      id: 2,
      usuarioId: 1,
      marca: 'Honda',
      modelo: 'CRV',
      año: 2020,
      color: 'Negro',
      placa: 'XYZ789',
      tipo: 'suv',
      esPredeterminado: false,
      foto: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      notas: 'Tiene un rayón en la puerta trasera'
    }
  ];

  private vehiculosSubject = new BehaviorSubject<Vehiculo[]>(this.vehiculos);

  constructor() {}

  getVehiculosByUsuario(usuarioId: number): Observable<Vehiculo[]> {
    return of(this.vehiculos.filter(v => v.usuarioId === usuarioId))
      .pipe(delay(300));
  }

  getVehiculoById(id: number): Observable<Vehiculo | undefined> {
    return of(this.vehiculos.find(v => v.id === id))
      .pipe(delay(200));
  }

  getVehiculoPredeterminado(usuarioId: number): Observable<Vehiculo | undefined> {
    return of(this.vehiculos.find(v => v.usuarioId === usuarioId && v.esPredeterminado))
      .pipe(delay(200));
  }

  agregarVehiculo(vehiculo: Omit<Vehiculo, 'id'>): Observable<Vehiculo> {
    const nuevoVehiculo: Vehiculo = {
      ...vehiculo,
      id: this.getNextId()
    };

    // Si es predeterminado, quitar el flag de los demás
    if (nuevoVehiculo.esPredeterminado) {
      this.vehiculos.forEach(v => {
        if (v.usuarioId === nuevoVehiculo.usuarioId) {
          v.esPredeterminado = false;
        }
      });
    }

    this.vehiculos.push(nuevoVehiculo);
    this.vehiculosSubject.next(this.vehiculos);
    return of(nuevoVehiculo).pipe(delay(500));
  }

  actualizarVehiculo(id: number, datos: Partial<Vehiculo>): Observable<Vehiculo> {
    const vehiculo = this.vehiculos.find(v => v.id === id);
    if (!vehiculo) {
      throw new Error('Vehículo no encontrado');
    }

    // Si se marca como predeterminado, quitar el flag de los demás
    if (datos.esPredeterminado) {
      this.vehiculos.forEach(v => {
        if (v.usuarioId === vehiculo.usuarioId && v.id !== id) {
          v.esPredeterminado = false;
        }
      });
    }

    Object.assign(vehiculo, datos);
    this.vehiculosSubject.next(this.vehiculos);
    return of(vehiculo).pipe(delay(500));
  }

  eliminarVehiculo(id: number): Observable<boolean> {
    const index = this.vehiculos.findIndex(v => v.id === id);
    if (index > -1) {
      const vehiculo = this.vehiculos[index];
      this.vehiculos.splice(index, 1);

      // Si era predeterminado y hay otros vehículos, marcar el primero como predeterminado
      if (vehiculo.esPredeterminado) {
        const otrosVehiculos = this.vehiculos.filter(v => v.usuarioId === vehiculo.usuarioId);
        if (otrosVehiculos.length > 0) {
          otrosVehiculos[0].esPredeterminado = true;
        }
      }

      this.vehiculosSubject.next(this.vehiculos);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  setPredeterminado(id: number): Observable<boolean> {
    const vehiculo = this.vehiculos.find(v => v.id === id);
    if (vehiculo) {
      this.vehiculos.forEach(v => {
        if (v.usuarioId === vehiculo.usuarioId) {
          v.esPredeterminado = v.id === id;
        }
      });
      this.vehiculosSubject.next(this.vehiculos);
      return of(true).pipe(delay(200));
    }
    return of(false);
  }

  private getNextId(): number {
    return Math.max(...this.vehiculos.map(v => v.id), 0) + 1;
  }
}
