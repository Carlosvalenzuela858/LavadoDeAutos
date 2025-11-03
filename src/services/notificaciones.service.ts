import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Notificacion, ConfiguracionNotificaciones } from '../models/extended.models';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificaciones: Notificacion[] = [
    {
      id: 1,
      usuarioId: 1,
      tipo: 'reserva',
      titulo: 'Reserva confirmada',
      mensaje: 'Tu reserva para hoy a las 10:00 ha sido confirmada',
      fecha: '2025-11-02T08:00:00',
      leida: false,
      icono: 'checkmark-circle',
      accion: {
        tipo: 'navegar',
        destino: '/reservas'
      }
    },
    {
      id: 2,
      usuarioId: 1,
      tipo: 'promocion',
      titulo: '¡50% de descuento!',
      mensaje: 'Usa el código LAVADO50 en tu próxima reserva',
      fecha: '2025-11-01T10:00:00',
      leida: false,
      icono: 'gift'
    },
    {
      id: 3,
      usuarioId: 1,
      tipo: 'recordatorio',
      titulo: 'Recordatorio de reserva',
      mensaje: 'Tu reserva es en 1 hora. ¡Te esperamos!',
      fecha: '2025-11-02T09:00:00',
      leida: true,
      icono: 'time'
    }
  ];

  private configuraciones: Map<number, ConfiguracionNotificaciones> = new Map([
    [1, {
      usuarioId: 1,
      pushEnabled: true,
      emailEnabled: true,
      reservas: true,
      promociones: true,
      mensajes: true,
      recordatorios: true
    }]
  ]);

  private notificacionesSubject = new BehaviorSubject<Notificacion[]>(this.notificaciones);

  constructor() {
    // Solicitar permiso para notificaciones push
    this.solicitarPermisoNotificaciones();
  }

  // ============= OBTENER NOTIFICACIONES =============
  getNotificacionesByUsuario(usuarioId: number): Observable<Notificacion[]> {
    return this.notificacionesSubject.asObservable().pipe(
      map(notifs => notifs
        .filter(n => n.usuarioId === usuarioId)
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      )
    );
  }

  getNotificacionesNoLeidas(usuarioId: number): Observable<Notificacion[]> {
    return this.notificacionesSubject.asObservable().pipe(
      map(notifs => notifs.filter(n => n.usuarioId === usuarioId && !n.leida))
    );
  }

  getCantidadNoLeidas(usuarioId: number): Observable<number> {
    return this.notificacionesSubject.asObservable().pipe(
      map(notifs => notifs.filter(n => n.usuarioId === usuarioId && !n.leida).length)
    );
  }

  // ============= MARCAR COMO LEÍDA =============
  marcarComoLeida(notificacionId: number): Observable<boolean> {
    const notif = this.notificaciones.find(n => n.id === notificacionId);
    if (notif) {
      notif.leida = true;
      this.notificacionesSubject.next(this.notificaciones);
      return of(true).pipe(delay(200));
    }
    return of(false);
  }

  marcarTodasComoLeidas(usuarioId: number): Observable<boolean> {
    this.notificaciones
      .filter(n => n.usuarioId === usuarioId && !n.leida)
      .forEach(n => n.leida = true);
    this.notificacionesSubject.next(this.notificaciones);
    return of(true).pipe(delay(300));
  }

  // ============= ELIMINAR NOTIFICACIONES =============
  eliminarNotificacion(notificacionId: number): Observable<boolean> {
    const index = this.notificaciones.findIndex(n => n.id === notificacionId);
    if (index > -1) {
      this.notificaciones.splice(index, 1);
      this.notificacionesSubject.next(this.notificaciones);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  eliminarTodasLeidas(usuarioId: number): Observable<boolean> {
    this.notificaciones = this.notificaciones.filter(n => 
      !(n.usuarioId === usuarioId && n.leida)
    );
    this.notificacionesSubject.next(this.notificaciones);
    return of(true).pipe(delay(300));
  }

  // ============= CREAR NOTIFICACIÓN =============
  crearNotificacion(notif: Omit<Notificacion, 'id' | 'fecha' | 'leida'>): Observable<Notificacion> {
    const config = this.configuraciones.get(notif.usuarioId);
    
    // Verificar si el usuario tiene este tipo de notificación habilitada
    if (config && !this.verificarConfiguracion(config, notif.tipo)) {
      return of(null as any);
    }

    const nuevaNotif: Notificacion = {
      ...notif,
      id: this.getNextId(),
      fecha: new Date().toISOString(),
      leida: false
    };

    this.notificaciones.push(nuevaNotif);
    this.notificacionesSubject.next(this.notificaciones);

    // Enviar notificación push si está habilitada
    if (config?.pushEnabled) {
      this.enviarNotificacionPush(nuevaNotif);
    }

    return of(nuevaNotif).pipe(delay(300));
  }

  // ============= CONFIGURACIÓN =============
  getConfiguracion(usuarioId: number): Observable<ConfiguracionNotificaciones> {
    const config = this.configuraciones.get(usuarioId) || {
      usuarioId,
      pushEnabled: false,
      emailEnabled: false,
      reservas: true,
      promociones: true,
      mensajes: true,
      recordatorios: true
    };
    return of(config).pipe(delay(200));
  }

  actualizarConfiguracion(
    usuarioId: number,
    config: Partial<ConfiguracionNotificaciones>
  ): Observable<ConfiguracionNotificaciones> {
    const configActual = this.configuraciones.get(usuarioId) || {
      usuarioId,
      pushEnabled: false,
      emailEnabled: false,
      reservas: true,
      promociones: true,
      mensajes: true,
      recordatorios: true
    };

    const nuevaConfig = { ...configActual, ...config };
    this.configuraciones.set(usuarioId, nuevaConfig);

    return of(nuevaConfig).pipe(delay(300));
  }

  // ============= NOTIFICACIONES PUSH =============
  private async solicitarPermisoNotificaciones(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones push');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  private enviarNotificacionPush(notif: Notificacion) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(notif.titulo, {
        body: notif.mensaje,
        icon: '/assets/icon/icon.png',
        badge: '/assets/icon/badge.png',
        tag: notif.id.toString(),
        requireInteraction: notif.tipo === 'reserva' || notif.tipo === 'recordatorio',
        data: notif
      });

      notification.onclick = () => {
        if (notif.accion) {
          window.focus();
          // Aquí navegarías a la ruta correspondiente
          console.log('Navegar a:', notif.accion.destino);
        }
        notification.close();
      };
    }
  }

  // ============= NOTIFICACIONES PROGRAMADAS =============
  programarNotificacion(
    usuarioId: number,
    notif: Omit<Notificacion, 'id' | 'fecha' | 'leida' | 'usuarioId'>,
    fecha: Date
  ): Observable<boolean> {
    const delay = fecha.getTime() - Date.now();
    
    if (delay > 0) {
      setTimeout(() => {
        this.crearNotificacion({ ...notif, usuarioId }).subscribe();
      }, delay);
      return of(true).pipe(delay(200));
    }
    
    return of(false);
  }

  // ============= HELPERS =============
  private verificarConfiguracion(
    config: ConfiguracionNotificaciones,
    tipo: Notificacion['tipo']
  ): boolean {
    switch (tipo) {
      case 'reserva':
        return config.reservas;
      case 'promocion':
        return config.promociones;
      case 'mensaje':
        return config.mensajes;
      case 'recordatorio':
        return config.recordatorios;
      default:
        return true;
    }
  }

  private getNextId(): number {
    return Math.max(...this.notificaciones.map(n => n.id), 0) + 1;
  }

  // ============= NOTIFICACIONES ESPECÍFICAS =============
  notificarReservaConfirmada(usuarioId: number, reservaId: number, fecha: string, hora: string): Observable<Notificacion> {
    return this.crearNotificacion({
      usuarioId,
      tipo: 'reserva',
      titulo: 'Reserva confirmada',
      mensaje: `Tu reserva para el ${fecha} a las ${hora} ha sido confirmada`,
      icono: 'checkmark-circle',
      accion: {
        tipo: 'navegar',
        destino: `/reservas/${reservaId}`
      }
    });
  }

  notificarRecordatorioReserva(usuarioId: number, reservaId: number, minutos: number): Observable<Notificacion> {
    const mensaje = minutos === 60 
      ? 'Tu reserva es en 1 hora'
      : `Tu reserva es en ${minutos} minutos`;
    
    return this.crearNotificacion({
      usuarioId,
      tipo: 'recordatorio',
      titulo: 'Recordatorio de reserva',
      mensaje: `${mensaje}. ¡Te esperamos!`,
      icono: 'time',
      accion: {
        tipo: 'navegar',
        destino: `/reservas/${reservaId}`
      }
    });
  }

  notificarNuevoMensaje(usuarioId: number, lavaderoNombre: string): Observable<Notificacion> {
    return this.crearNotificacion({
      usuarioId,
      tipo: 'mensaje',
      titulo: 'Nuevo mensaje',
      mensaje: `${lavaderoNombre} te ha enviado un mensaje`,
      icono: 'chatbubble',
      accion: {
        tipo: 'navegar',
        destino: '/chat'
      }
    });
  }

  notificarPromocion(usuarioId: number, titulo: string, mensaje: string): Observable<Notificacion> {
    return this.crearNotificacion({
      usuarioId,
      tipo: 'promocion',
      titulo,
      mensaje,
      icono: 'gift',
      accion: {
        tipo: 'navegar',
        destino: '/promociones'
      }
    });
  }
}
