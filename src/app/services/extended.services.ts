import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  EstadisticasUsuario, 
  GaleriaFoto, 
  Recordatorio, 
  EventoCalendario,
  PreferenciasUsuario,
  ProgramaLealtad
} from '../models/extended.models';

// ============= SERVICIO DE ESTADÍSTICAS =============
@Injectable({ providedIn: 'root' })
export class EstadisticasService {
  getEstadisticasUsuario(usuarioId: number): Observable<EstadisticasUsuario> {
    const stats: EstadisticasUsuario = {
      usuarioId,
      totalReservas: 28,
      reservasCompletadas: 25,
      reservasCanceladas: 3,
      gastoTotal: 850000,
      lavaderoFavorito: {
        id: 1,
        nombre: 'AutoSpa Premium',
        visitas: 12
      },
      servicioMasUsado: {
        id: 1,
        nombre: 'Lavado Completo',
        veces: 15
      },
      promedioGasto: 34000,
      ahorrosConCupones: 125000,
      ultimaReserva: '2025-10-28T10:00:00'
    };
    return of(stats).pipe(delay(400));
  }

  getGraficaGastos(usuarioId: number, meses: number = 6): Observable<{
    labels: string[];
    data: number[];
  }> {
    const labels = ['Oct', 'Sep', 'Ago', 'Jul', 'Jun', 'May'];
    const data = [125000, 98000, 145000, 87000, 112000, 95000];
    return of({ labels, data }).pipe(delay(300));
  }

  getComparativaAnual(usuarioId: number): Observable<{
    añoActual: number;
    añoAnterior: number;
    diferencia: number;
  }> {
    return of({
      añoActual: 850000,
      añoAnterior: 620000,
      diferencia: 37.1
    }).pipe(delay(300));
  }
}

// ============= SERVICIO DE GALERÍA =============
@Injectable({ providedIn: 'root' })
export class GaleriaService {
  private fotos: GaleriaFoto[] = [
    {
      id: 1,
      reservaId: 1,
      usuarioId: 1,
      tipo: 'antes',
      url: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400',
      fecha: '2025-10-28T09:45:00',
      descripcion: 'Estado inicial del vehículo'
    },
    {
      id: 2,
      reservaId: 1,
      usuarioId: 1,
      tipo: 'despues',
      url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400',
      fecha: '2025-10-28T11:30:00',
      descripcion: 'Resultado final - ¡Impecable!'
    }
  ];

  getFotosByReserva(reservaId: number): Observable<GaleriaFoto[]> {
    return of(this.fotos.filter(f => f.reservaId === reservaId))
      .pipe(delay(300));
  }

  getFotosByUsuario(usuarioId: number): Observable<GaleriaFoto[]> {
    return of(this.fotos.filter(f => f.usuarioId === usuarioId))
      .pipe(delay(300));
  }

  subirFoto(foto: Omit<GaleriaFoto, 'id' | 'fecha'>): Observable<GaleriaFoto> {
    const nuevaFoto: GaleriaFoto = {
      ...foto,
      id: Math.max(...this.fotos.map(f => f.id), 0) + 1,
      fecha: new Date().toISOString()
    };
    this.fotos.push(nuevaFoto);
    return of(nuevaFoto).pipe(delay(500));
  }

  eliminarFoto(id: number): Observable<boolean> {
    const index = this.fotos.findIndex(f => f.id === id);
    if (index > -1) {
      this.fotos.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }
}

// ============= SERVICIO DE RECORDATORIOS =============
@Injectable({ providedIn: 'root' })
export class RecordatoriosService {
  private recordatorios: Recordatorio[] = [
    {
      id: 1,
      usuarioId: 1,
      tipo: 'reserva',
      titulo: 'Lavado de auto',
      descripcion: 'Lavado completo en AutoSpa Premium',
      fecha: '2025-11-05',
      hora: '10:00',
      notificarAntes: 60,
      repetir: 'nunca',
      activo: true,
      reservaId: 5
    },
    {
      id: 2,
      usuarioId: 1,
      tipo: 'mantenimiento',
      titulo: 'Cambio de aceite',
      descripcion: 'Cada 5000 km - Próximo cambio',
      fecha: '2025-11-15',
      hora: '14:00',
      notificarAntes: 1440, // 24 horas
      repetir: 'nunca',
      activo: true,
      vehiculoId: 1
    }
  ];

  private eventos: EventoCalendario[] = [];

  getRecordatoriosByUsuario(usuarioId: number): Observable<Recordatorio[]> {
    return of(this.recordatorios.filter(r => r.usuarioId === usuarioId))
      .pipe(delay(300));
  }

  crearRecordatorio(recordatorio: Omit<Recordatorio, 'id'>): Observable<Recordatorio> {
    const nuevo: Recordatorio = {
      ...recordatorio,
      id: Math.max(...this.recordatorios.map(r => r.id), 0) + 1
    };
    this.recordatorios.push(nuevo);
    return of(nuevo).pipe(delay(500));
  }

  eliminarRecordatorio(id: number): Observable<boolean> {
    const index = this.recordatorios.findIndex(r => r.id === id);
    if (index > -1) {
      this.recordatorios.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  toggleRecordatorio(id: number): Observable<boolean> {
    const recordatorio = this.recordatorios.find(r => r.id === id);
    if (recordatorio) {
      recordatorio.activo = !recordatorio.activo;
      return of(true).pipe(delay(200));
    }
    return of(false);
  }

  getEventosCalendario(usuarioId: number, mes: number, año: number): Observable<EventoCalendario[]> {
    // Convertir recordatorios a eventos
    const eventosDeRecordatorios = this.recordatorios
      .filter(r => r.usuarioId === usuarioId && r.activo)
      .map(r => ({
        id: r.id,
        usuarioId: r.usuarioId,
        tipo: 'recordatorio' as const,
        titulo: r.titulo,
        fecha: r.fecha,
        hora: r.hora,
        duracion: 60,
        color: this.getColorPorTipo(r.tipo),
        relacionadoId: r.id
      }));

    return of(eventosDeRecordatorios).pipe(delay(300));
  }

  private getColorPorTipo(tipo: string): string {
    const colores: Record<string, string> = {
      reserva: '#4A90E2',
      mantenimiento: '#F5A623',
      personalizado: '#7ED321'
    };
    return colores[tipo] || '#9B9B9B';
  }
}

// ============= SERVICIO DE PREFERENCIAS =============
@Injectable({ providedIn: 'root' })
export class PreferenciasService {
  private preferencias: Map<number, PreferenciasUsuario> = new Map([
    [1, {
      usuarioId: 1,
      temaDark: false,
      idioma: 'es',
      notificaciones: {
        usuarioId: 1,
        pushEnabled: true,
        emailEnabled: true,
        reservas: true,
        promociones: true,
        mensajes: true,
        recordatorios: true
      },
      lavaderosFavoritos: [1, 2],
      ubicacionPredeterminada: {
        lat: -25.2637,
        lng: -57.5759,
        nombre: 'Mi Casa'
      },
      metodoPagoDefault: 1,
      vehiculoDefault: 1
    }]
  ]);

  getPreferencias(usuarioId: number): Observable<PreferenciasUsuario> {
    const prefs = this.preferencias.get(usuarioId) || this.getPreferenciasDefault(usuarioId);
    return of(prefs).pipe(delay(200));
  }

  actualizarPreferencias(
    usuarioId: number,
    prefs: Partial<PreferenciasUsuario>
  ): Observable<PreferenciasUsuario> {
    const actual = this.preferencias.get(usuarioId) || this.getPreferenciasDefault(usuarioId);
    const nuevo = { ...actual, ...prefs };
    this.preferencias.set(usuarioId, nuevo);
    return of(nuevo).pipe(delay(300));
  }

  toggleTemaOscuro(usuarioId: number): Observable<boolean> {
    const prefs = this.preferencias.get(usuarioId);
    if (prefs) {
      prefs.temaDark = !prefs.temaDark;
      this.preferencias.set(usuarioId, prefs);
      return of(prefs.temaDark).pipe(delay(200));
    }
    return of(false);
  }

  toggleFavorito(usuarioId: number, lavaderoId: number): Observable<boolean> {
    const prefs = this.preferencias.get(usuarioId);
    if (prefs) {
      const index = prefs.lavaderosFavoritos.indexOf(lavaderoId);
      if (index > -1) {
        prefs.lavaderosFavoritos.splice(index, 1);
      } else {
        prefs.lavaderosFavoritos.push(lavaderoId);
      }
      this.preferencias.set(usuarioId, prefs);
      return of(index === -1).pipe(delay(200));
    }
    return of(false);
  }

  private getPreferenciasDefault(usuarioId: number): PreferenciasUsuario {
    return {
      usuarioId,
      temaDark: false,
      idioma: 'es',
      notificaciones: {
        usuarioId,
        pushEnabled: true,
        emailEnabled: true,
        reservas: true,
        promociones: true,
        mensajes: true,
        recordatorios: true
      },
      lavaderosFavoritos: []
    };
  }
}

// ============= SERVICIO DE PROGRAMA DE LEALTAD =============
@Injectable({ providedIn: 'root' })
export class LealtadService {
  private programas: Map<number, ProgramaLealtad> = new Map([
    [1, {
      usuarioId: 1,
      puntos: 850,
      nivel: 'oro',
      proximoNivel: 1000,
      beneficios: [
        '15% de descuento en todos los servicios',
        'Prioridad en reservas',
        'Lavado básico gratis cada 5 lavados',
        'Acceso a promociones exclusivas'
      ],
      historialPuntos: [
        {
          id: 1,
          usuarioId: 1,
          puntos: 50,
          tipo: 'ganado',
          concepto: 'Lavado completo',
          fecha: '2025-10-28T10:00:00',
          reservaId: 1
        },
        {
          id: 2,
          usuarioId: 1,
          puntos: -100,
          tipo: 'canjeado',
          concepto: 'Descuento en lavado premium',
          fecha: '2025-10-25T14:00:00'
        }
      ]
    }]
  ]);

  getProgramaLealtad(usuarioId: number): Observable<ProgramaLealtad> {
    const programa = this.programas.get(usuarioId) || this.getProgramaDefault(usuarioId);
    return of(programa).pipe(delay(300));
  }

  agregarPuntos(usuarioId: number, puntos: number, concepto: string, reservaId?: number): Observable<ProgramaLealtad> {
    const programa = this.programas.get(usuarioId) || this.getProgramaDefault(usuarioId);
    programa.puntos += puntos;
    
    const historial = {
      id: programa.historialPuntos.length + 1,
      usuarioId,
      puntos,
      tipo: 'ganado' as const,
      concepto,
      fecha: new Date().toISOString(),
      reservaId
    };
    programa.historialPuntos.push(historial);

    // Actualizar nivel
    this.actualizarNivel(programa);
    this.programas.set(usuarioId, programa);

    return of(programa).pipe(delay(300));
  }

  canjearPuntos(usuarioId: number, puntos: number, concepto: string): Observable<boolean> {
    const programa = this.programas.get(usuarioId);
    if (!programa || programa.puntos < puntos) {
      return of(false);
    }

    programa.puntos -= puntos;
    const historial = {
      id: programa.historialPuntos.length + 1,
      usuarioId,
      puntos: -puntos,
      tipo: 'canjeado' as const,
      concepto,
      fecha: new Date().toISOString()
    };
    programa.historialPuntos.push(historial);

    this.actualizarNivel(programa);
    this.programas.set(usuarioId, programa);

    return of(true).pipe(delay(300));
  }

  private actualizarNivel(programa: ProgramaLealtad) {
    if (programa.puntos >= 1000) {
      programa.nivel = 'platino';
      programa.proximoNivel = 2000;
      programa.beneficios = [
        '20% de descuento en todos los servicios',
        'Máxima prioridad en reservas',
        'Lavado premium gratis cada 4 lavados',
        'Encerado gratis una vez al mes',
        'Atención personalizada VIP'
      ];
    } else if (programa.puntos >= 500) {
      programa.nivel = 'oro';
      programa.proximoNivel = 1000;
      programa.beneficios = [
        '15% de descuento en todos los servicios',
        'Prioridad en reservas',
        'Lavado básico gratis cada 5 lavados',
        'Acceso a promociones exclusivas'
      ];
    } else if (programa.puntos >= 200) {
      programa.nivel = 'plata';
      programa.proximoNivel = 500;
      programa.beneficios = [
        '10% de descuento en servicios',
        'Lavado básico gratis cada 8 lavados'
      ];
    } else {
      programa.nivel = 'bronce';
      programa.proximoNivel = 200;
      programa.beneficios = [
        '5% de descuento en servicios'
      ];
    }
  }

  private getProgramaDefault(usuarioId: number): ProgramaLealtad {
    return {
      usuarioId,
      puntos: 0,
      nivel: 'bronce',
      proximoNivel: 200,
      beneficios: ['5% de descuento en servicios'],
      historialPuntos: []
    };
  }
}
