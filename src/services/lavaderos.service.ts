// Commit por María - Servicio de gestión de lavaderos
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Lavadero, HorarioDisponible } from '../models/lavadero.model';
import { LAVADEROS_MOCK, HORARIOS_DISPONIBLES } from '../data/lavaderos.data';

@Injectable({
  providedIn: 'root'
})
export class LavaderosService {
  private lavaderos = LAVADEROS_MOCK;

  constructor() { }

  getLavaderos(): Observable<Lavadero[]> {
    return of(this.lavaderos).pipe(delay(300));
  }

  getLavaderoById(id: number): Observable<Lavadero | undefined> {
    return of(this.lavaderos.find(l => l.id === id)).pipe(delay(200));
  }

  buscarLavaderos(termino: string): Observable<Lavadero[]> {
    const terminoLower = termino.toLowerCase();
    const resultados = this.lavaderos.filter(l => 
      l.nombre.toLowerCase().includes(terminoLower) ||
      l.descripcion.toLowerCase().includes(terminoLower) ||
      l.direccion.toLowerCase().includes(terminoLower)
    );
    return of(resultados).pipe(delay(300));
  }

  getLavaderosCercanos(lat: number, lng: number): Observable<Lavadero[]> {
    // Simulación de búsqueda por cercanía
    const lavaderosOrdenados = [...this.lavaderos].sort((a, b) => {
      const distA = this.calcularDistancia(lat, lng, a.coordenadas.lat, a.coordenadas.lng);
      const distB = this.calcularDistancia(lat, lng, b.coordenadas.lat, b.coordenadas.lng);
      return distA - distB;
    });
    return of(lavaderosOrdenados).pipe(delay(400));
  }

  getHorariosDisponibles(): Observable<HorarioDisponible[]> {
    return of(HORARIOS_DISPONIBLES).pipe(delay(200));
  }

  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
