import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonIcon, IonBadge, IonButton,
  IonSegment, IonSegmentButton, IonItemSliding, IonItemOptions,
  IonItemOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  notificationsOutline, checkmarkDone, trashOutline,
  checkmarkCircle, cardOutline, giftOutline, chatbubbleOutline,
  timeOutline
} from 'ionicons/icons';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Notificacion } from '../../models/extended.models';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonItem, IonLabel, IonIcon, IonBadge, IonButton,
    IonSegment, IonSegmentButton, IonItemSliding, IonItemOptions,
    IonItemOption
  ]
})
export class NotificacionesPage implements OnInit {
  notificaciones: Notificacion[] = [];
  filtro: 'todas' | 'noLeidas' = 'todas';
  usuarioId = 1;

  constructor(
    private notificacionesService: NotificacionesService,
    private router: Router
  ) {
    addIcons({
      notificationsOutline, checkmarkDone, trashOutline,
      checkmarkCircle, cardOutline, giftOutline,
      chatbubbleOutline, timeOutline
    });
  }

  ngOnInit() {
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    if (this.filtro === 'todas') {
      this.notificacionesService.getNotificacionesByUsuario(this.usuarioId)
        .subscribe(notifs => this.notificaciones = notifs);
    } else {
      this.notificacionesService.getNotificacionesNoLeidas(this.usuarioId)
        .subscribe(notifs => this.notificaciones = notifs);
    }
  }

  cambiarFiltro(event: any) {
    this.filtro = event.detail.value;
    this.cargarNotificaciones();
  }

  marcarLeida(notif: Notificacion) {
    this.notificacionesService.marcarComoLeida(notif.id).subscribe(() => {
      notif.leida = true;
      if (notif.accion) {
        this.router.navigate([notif.accion.destino]);
      }
    });
  }

  marcarTodasLeidas() {
    this.notificacionesService.marcarTodasComoLeidas(this.usuarioId)
      .subscribe(() => this.cargarNotificaciones());
  }

  eliminar(id: number) {
    this.notificacionesService.eliminarNotificacion(id)
      .subscribe(() => this.cargarNotificaciones());
  }

  getIcono(tipo: string): string {
    const iconos: Record<string, string> = {
      reserva: 'checkmark-circle',
      pago: 'card-outline',
      promocion: 'gift-outline',
      mensaje: 'chatbubble-outline',
      recordatorio: 'time-outline'
    };
    return iconos[tipo] || 'notifications-outline';
  }

  getColor(tipo: string): string {
    const colores: Record<string, string> = {
      reserva: 'success',
      pago: 'primary',
      promocion: 'warning',
      mensaje: 'tertiary',
      recordatorio: 'medium'
    };
    return colores[tipo] || 'medium';
  }

  getTiempoTranscurrido(fecha: string): string {
    const ahora = new Date();
    const fechaNotif = new Date(fecha);
    const diff = ahora.getTime() - fechaNotif.getTime();
    
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    
    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `Hace ${minutos}m`;
    if (horas < 24) return `Hace ${horas}h`;
    if (dias < 7) return `Hace ${dias}d`;
    return fechaNotif.toLocaleDateString();
  }
}
