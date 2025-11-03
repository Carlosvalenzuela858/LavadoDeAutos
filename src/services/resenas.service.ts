import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Resena, RespuestaResena } from '../models/extended.models';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {
  private resenas: Resena[] = [
    {
      id: 1,
      usuarioId: 1,
      lavaderoId: 1,
      reservaId: 1,
      calificacion: 5,
      comentario: 'Excelente servicio! Muy profesionales y el auto quedó impecable. Totalmente recomendado.',
      fecha: '2025-10-28T10:30:00',
      fotos: [
        'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400',
        'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400'
      ],
      meGusta: 15,
      respuesta: {
        texto: '¡Muchas gracias por tu comentario! Nos alegra que hayas disfrutado del servicio.',
        fecha: '2025-10-28T15:20:00',
        lavaderoNombre: 'AutoSpa Premium'
      }
    },
    {
      id: 2,
      usuarioId: 2,
      lavaderoId: 1,
      reservaId: 2,
      calificacion: 4,
      comentario: 'Muy buen servicio, aunque tuve que esperar un poco más de lo esperado.',
      fecha: '2025-10-25T14:15:00',
      meGusta: 8
    },
    {
      id: 3,
      usuarioId: 3,
      lavaderoId: 2,
      reservaId: 3,
      calificacion: 5,
      comentario: 'Primera vez que voy y quedé encantado. El detallado interior es increíble.',
      fecha: '2025-10-20T11:45:00',
      fotos: ['https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400'],
      meGusta: 22
    }
  ];

  private resenasSubject = new BehaviorSubject<Resena[]>(this.resenas);

  constructor() {}

  // ============= OBTENER RESEÑAS =============
  getResenasByLavadero(lavaderoId: number, limit?: number): Observable<Resena[]> {
    let resenas = this.resenas
      .filter(r => r.lavaderoId === lavaderoId)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    
    if (limit) {
      resenas = resenas.slice(0, limit);
    }
    
    return of(resenas).pipe(delay(300));
  }

  getResenasByUsuario(usuarioId: number): Observable<Resena[]> {
    return of(this.resenas.filter(r => r.usuarioId === usuarioId))
      .pipe(delay(300));
  }

  getResenaById(id: number): Observable<Resena | undefined> {
    return of(this.resenas.find(r => r.id === id))
      .pipe(delay(200));
  }

  getResenaByReserva(reservaId: number): Observable<Resena | undefined> {
    return of(this.resenas.find(r => r.reservaId === reservaId))
      .pipe(delay(200));
  }

  // ============= CREAR Y EDITAR RESEÑAS =============
  crearResena(resena: Omit<Resena, 'id' | 'fecha' | 'meGusta'>): Observable<Resena> {
    // Verificar si ya existe reseña para esta reserva
    const existente = this.resenas.find(r => r.reservaId === resena.reservaId);
    if (existente) {
      return of(existente).pipe(
        delay(300),
        map(() => {
          throw new Error('Ya existe una reseña para esta reserva');
        })
      );
    }

    const nuevaResena: Resena = {
      ...resena,
      id: this.getNextId(),
      fecha: new Date().toISOString(),
      meGusta: 0
    };

    this.resenas.push(nuevaResena);
    this.resenasSubject.next(this.resenas);
    return of(nuevaResena).pipe(delay(500));
  }

  editarResena(id: number, datos: Partial<Resena>): Observable<Resena> {
    const resena = this.resenas.find(r => r.id === id);
    if (!resena) {
      return of(null as any).pipe(
        delay(300),
        map(() => {
          throw new Error('Reseña no encontrada');
        })
      );
    }

    Object.assign(resena, datos);
    this.resenasSubject.next(this.resenas);
    return of(resena).pipe(delay(500));
  }

  eliminarResena(id: number): Observable<boolean> {
    const index = this.resenas.findIndex(r => r.id === id);
    if (index > -1) {
      this.resenas.splice(index, 1);
      this.resenasSubject.next(this.resenas);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  // ============= RESPUESTAS A RESEÑAS =============
  responderResena(resenaId: number, respuesta: RespuestaResena): Observable<boolean> {
    const resena = this.resenas.find(r => r.id === resenaId);
    if (resena) {
      resena.respuesta = respuesta;
      this.resenasSubject.next(this.resenas);
      return of(true).pipe(delay(500));
    }
    return of(false);
  }

  // ============= ME GUSTA =============
  toggleMeGusta(resenaId: number, usuarioId: number): Observable<number> {
    const resena = this.resenas.find(r => r.id === resenaId);
    if (resena) {
      // En una implementación real, verificarías si el usuario ya dio like
      // Por simplicidad, solo incrementamos o decrementamos aleatoriamente
      const yaLeDioMeGusta = Math.random() > 0.5;
      resena.meGusta += yaLeDioMeGusta ? -1 : 1;
      this.resenasSubject.next(this.resenas);
      return of(resena.meGusta).pipe(delay(200));
    }
    return of(0);
  }

  // ============= ESTADÍSTICAS =============
  getPromedioCalificacion(lavaderoId: number): Observable<number> {
    const resenasLavadero = this.resenas.filter(r => r.lavaderoId === lavaderoId);
    if (resenasLavadero.length === 0) return of(0);
    
    const suma = resenasLavadero.reduce((acc, r) => acc + r.calificacion, 0);
    const promedio = suma / resenasLavadero.length;
    return of(Number(promedio.toFixed(1))).pipe(delay(200));
  }

  getDistribucionCalificaciones(lavaderoId: number): Observable<{
    [key: number]: number
  }> {
    const resenasLavadero = this.resenas.filter(r => r.lavaderoId === lavaderoId);
    const distribucion = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    resenasLavadero.forEach(r => {
      distribucion[r.calificacion as keyof typeof distribucion]++;
    });

    return of(distribucion).pipe(delay(200));
  }

  getCantidadResenas(lavaderoId: number): Observable<number> {
    return of(this.resenas.filter(r => r.lavaderoId === lavaderoId).length)
      .pipe(delay(200));
  }

  // ============= FILTROS Y ORDENAMIENTO =============
  getResenasFiltradas(
    lavaderoId: number,
    filtros: {
      calificacionMinima?: number;
      conFotos?: boolean;
      ordenar?: 'reciente' | 'antiguos' | 'mejor' | 'peor' | 'masGustadas';
    }
  ): Observable<Resena[]> {
    let resenas = this.resenas.filter(r => r.lavaderoId === lavaderoId);

    // Aplicar filtros
    if (filtros.calificacionMinima) {
      resenas = resenas.filter(r => r.calificacion >= filtros.calificacionMinima!);
    }
    if (filtros.conFotos) {
      resenas = resenas.filter(r => r.fotos && r.fotos.length > 0);
    }

    // Aplicar ordenamiento
    switch (filtros.ordenar) {
      case 'reciente':
        resenas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        break;
      case 'antiguos':
        resenas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        break;
      case 'mejor':
        resenas.sort((a, b) => b.calificacion - a.calificacion);
        break;
      case 'peor':
        resenas.sort((a, b) => a.calificacion - b.calificacion);
        break;
      case 'masGustadas':
        resenas.sort((a, b) => b.meGusta - a.meGusta);
        break;
      default:
        resenas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }

    return of(resenas).pipe(delay(300));
  }

  // ============= REPORTAR RESEÑA =============
  reportarResena(resenaId: number, motivo: string): Observable<boolean> {
    // En una implementación real, esto enviaría el reporte al backend
    console.log(`Reseña ${resenaId} reportada por: ${motivo}`);
    return of(true).pipe(delay(500));
  }

  // ============= HELPERS =============
  private getNextId(): number {
    return Math.max(...this.resenas.map(r => r.id), 0) + 1;
  }

  // ============= VERIFICAR SI PUEDE DEJAR RESEÑA =============
  puedeDejarResena(usuarioId: number, reservaId: number): Observable<{
    puede: boolean;
    razon?: string;
  }> {
    // Verificar si ya dejó reseña
    const yaReseno = this.resenas.some(r => 
      r.usuarioId === usuarioId && r.reservaId === reservaId
    );

    if (yaReseno) {
      return of({
        puede: false,
        razon: 'Ya has dejado una reseña para esta reserva'
      }).pipe(delay(200));
    }

    // En implementación real, verificar si la reserva está completada
    return of({
      puede: true
    }).pipe(delay(200));
  }
}
