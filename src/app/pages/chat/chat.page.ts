import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
  IonButtons, IonFooter, IonTextarea, IonButton, IonIcon,
  IonItem, IonLabel, IonAvatar, IonList, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sendOutline, imageOutline, attachOutline } from 'ionicons/icons';
import { ChatService } from '../../services/chat.service';
import { Mensaje, Chat } from '../../models/extended.models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
    IonButtons, IonFooter, IonTextarea, IonButton, IonIcon,
    IonItem, IonLabel, IonAvatar, IonList, IonBadge
  ]
})
export class ChatPage implements OnInit {
  @ViewChild('content') content!: IonContent;
  
  chatId!: number;
  chat?: Chat;
  mensajes: Mensaje[] = [];
  nuevoMensaje = '';
  usuarioId = 1; // Obtener del servicio de auth
  lavaderoNombre = 'AutoSpa Premium';
  cargando = false;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {
    addIcons({ sendOutline, imageOutline, attachOutline });
  }

  ngOnInit() {
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarChat();
    this.cargarMensajes();
    this.suscribirMensajesRealTime();
  }

  cargarChat() {
    this.chatService.getChatById(this.chatId).subscribe(chat => {
      this.chat = chat;
    });
  }

  cargarMensajes() {
    this.cargando = true;
    this.chatService.getMensajesByChat(this.chatId).subscribe(mensajes => {
      this.mensajes = mensajes;
      this.cargando = false;
      setTimeout(() => this.scrollToBottom(), 100);
      this.marcarComoLeidos();
    });
  }

  suscribirMensajesRealTime() {
    this.chatService.getMensajesRealTime(this.chatId).subscribe(mensajes => {
      this.mensajes = mensajes;
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  enviarMensaje() {
    if (!this.nuevoMensaje.trim()) return;

    const mensaje: Omit<Mensaje, 'id' | 'fecha' | 'leido'> = {
      chatId: this.chatId,
      emisorId: this.usuarioId,
      tipo: 'usuario',
      contenido: this.nuevoMensaje.trim()
    };

    this.chatService.enviarMensaje(mensaje).subscribe(() => {
      this.nuevoMensaje = '';
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  marcarComoLeidos() {
    this.chatService.marcarTodosComoLeido(this.chatId, this.usuarioId).subscribe();
  }

  scrollToBottom() {
    this.content.scrollToBottom(300);
  }

  getHoraFormateada(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' });
  }

  esHoy(fecha: string): boolean {
    const hoy = new Date();
    const fechaMensaje = new Date(fecha);
    return hoy.toDateString() === fechaMensaje.toDateString();
  }
}
