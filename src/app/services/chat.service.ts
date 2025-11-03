import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, interval } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { Chat, Mensaje } from '../models/extended.models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chats: Chat[] = [
    {
      id: 1,
      usuarioId: 1,
      lavaderoId: 1,
      noLeidos: 2,
      activo: true,
      ultimoMensaje: {
        id: 3,
        chatId: 1,
        emisorId: 1,
        tipo: 'lavadero',
        contenido: 'Perfecto, te esperamos a las 10:00',
        fecha: '2025-11-02T09:45:00',
        leido: false
      }
    }
  ];

  private mensajes: Mensaje[] = [
    {
      id: 1,
      chatId: 1,
      emisorId: 1,
      tipo: 'usuario',
      contenido: 'Hola, quisiera confirmar mi reserva para hoy',
      fecha: '2025-11-02T09:30:00',
      leido: true
    },
    {
      id: 2,
      chatId: 1,
      emisorId: 1,
      tipo: 'lavadero',
      contenido: '¡Hola! Claro, tu reserva está confirmada para las 10:00',
      fecha: '2025-11-02T09:32:00',
      leido: true
    },
    {
      id: 3,
      chatId: 1,
      emisorId: 1,
      tipo: 'lavadero',
      contenido: 'Perfecto, te esperamos a las 10:00',
      fecha: '2025-11-02T09:45:00',
      leido: false
    }
  ];

  private chatsSubject = new BehaviorSubject<Chat[]>(this.chats);
  private mensajesSubject = new BehaviorSubject<Mensaje[]>(this.mensajes);

  // Simular mensajes en tiempo real
  private simulacionActiva = false;

  constructor() {}

  // ============= GESTIÓN DE CHATS =============
  getChatsByUsuario(usuarioId: number): Observable<Chat[]> {
    return this.chatsSubject.asObservable().pipe(
      map(chats => chats.filter(c => c.usuarioId === usuarioId)),
      delay(300)
    );
  }

  getChatById(chatId: number): Observable<Chat | undefined> {
    return of(this.chats.find(c => c.id === chatId))
      .pipe(delay(200));
  }

  getOrCreateChat(usuarioId: number, lavaderoId: number): Observable<Chat> {
    const chatExistente = this.chats.find(
      c => c.usuarioId === usuarioId && c.lavaderoId === lavaderoId
    );

    if (chatExistente) {
      return of(chatExistente).pipe(delay(300));
    }

    // Crear nuevo chat
    const nuevoChat: Chat = {
      id: this.getNextChatId(),
      usuarioId,
      lavaderoId,
      noLeidos: 0,
      activo: true
    };

    this.chats.push(nuevoChat);
    this.chatsSubject.next(this.chats);
    return of(nuevoChat).pipe(delay(500));
  }

  archivarChat(chatId: number): Observable<boolean> {
    const chat = this.chats.find(c => c.id === chatId);
    if (chat) {
      chat.activo = false;
      this.chatsSubject.next(this.chats);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  // ============= MENSAJES =============
  getMensajesByChat(chatId: number): Observable<Mensaje[]> {
    return this.mensajesSubject.asObservable().pipe(
      map(mensajes => mensajes.filter(m => m.chatId === chatId)),
      delay(300)
    );
  }

  // Observable para mensajes en tiempo real
  getMensajesRealTime(chatId: number): Observable<Mensaje[]> {
    // Retornar observable que se actualiza con nuevos mensajes
    return this.mensajesSubject.asObservable().pipe(
      map(mensajes => mensajes.filter(m => m.chatId === chatId))
    );
  }

  enviarMensaje(mensaje: Omit<Mensaje, 'id' | 'fecha' | 'leido'>): Observable<Mensaje> {
    const nuevoMensaje: Mensaje = {
      ...mensaje,
      id: this.getNextMensajeId(),
      fecha: new Date().toISOString(),
      leido: false
    };

    this.mensajes.push(nuevoMensaje);
    
    // Actualizar último mensaje del chat
    const chat = this.chats.find(c => c.id === mensaje.chatId);
    if (chat) {
      chat.ultimoMensaje = nuevoMensaje;
      this.chatsSubject.next(this.chats);
    }

    this.mensajesSubject.next(this.mensajes);

    // Simular respuesta automática del lavadero (50% de probabilidad)
    if (mensaje.tipo === 'usuario' && Math.random() > 0.5) {
      this.simularRespuestaLavadero(mensaje.chatId);
    }

    return of(nuevoMensaje).pipe(delay(300));
  }

  enviarMensajeConAdjunto(
    mensaje: Omit<Mensaje, 'id' | 'fecha' | 'leido'>,
    archivo: File
  ): Observable<Mensaje> {
    // En implementación real, subirías el archivo al servidor
    const urlAdjunto = `https://storage.example.com/${archivo.name}`;
    
    const mensajeConAdjunto: Omit<Mensaje, 'id' | 'fecha' | 'leido'> = {
      ...mensaje,
      adjunto: {
        tipo: archivo.type.startsWith('image/') ? 'imagen' : 'documento',
        url: urlAdjunto,
        nombre: archivo.name
      }
    };

    return this.enviarMensaje(mensajeConAdjunto);
  }

  marcarComoLeido(mensajeId: number): Observable<boolean> {
    const mensaje = this.mensajes.find(m => m.id === mensajeId);
    if (mensaje) {
      mensaje.leido = true;
      this.mensajesSubject.next(this.mensajes);
      
      // Actualizar contador de no leídos del chat
      this.actualizarContadorNoLeidos(mensaje.chatId);
      
      return of(true).pipe(delay(200));
    }
    return of(false);
  }

  marcarTodosComoLeido(chatId: number, usuarioId: number): Observable<boolean> {
    const mensajesChat = this.mensajes.filter(m => 
      m.chatId === chatId && 
      !m.leido &&
      m.tipo !== 'usuario' // Solo marcar mensajes del lavadero
    );

    mensajesChat.forEach(m => m.leido = true);
    this.mensajesSubject.next(this.mensajes);

    // Resetear contador de no leídos
    const chat = this.chats.find(c => c.id === chatId);
    if (chat) {
      chat.noLeidos = 0;
      this.chatsSubject.next(this.chats);
    }

    return of(true).pipe(delay(200));
  }

  eliminarMensaje(mensajeId: number): Observable<boolean> {
    const index = this.mensajes.findIndex(m => m.id === mensajeId);
    if (index > -1) {
      const mensaje = this.mensajes[index];
      this.mensajes.splice(index, 1);
      this.mensajesSubject.next(this.mensajes);

      // Actualizar último mensaje del chat si es necesario
      const chat = this.chats.find(c => c.id === mensaje.chatId);
      if (chat && chat.ultimoMensaje?.id === mensajeId) {
        const mensajesDelChat = this.mensajes.filter(m => m.chatId === mensaje.chatId);
        chat.ultimoMensaje = mensajesDelChat[mensajesDelChat.length - 1];
        this.chatsSubject.next(this.chats);
      }

      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  // ============= FUNCIONES DE SOPORTE =============
  buscarMensajes(chatId: number, termino: string): Observable<Mensaje[]> {
    const mensajesChat = this.mensajes.filter(m => 
      m.chatId === chatId &&
      m.contenido.toLowerCase().includes(termino.toLowerCase())
    );
    return of(mensajesChat).pipe(delay(300));
  }

  getTotalNoLeidos(usuarioId: number): Observable<number> {
    const chatsUsuario = this.chats.filter(c => c.usuarioId === usuarioId);
    const total = chatsUsuario.reduce((sum, c) => sum + c.noLeidos, 0);
    return of(total).pipe(delay(200));
  }

  // ============= SIMULACIÓN DE RESPUESTAS =============
  private simularRespuestaLavadero(chatId: number) {
    const respuestas = [
      '¡Claro! Con mucho gusto te ayudamos.',
      'Perfecto, quedó registrado.',
      'Entendido, cualquier cosa nos avisas.',
      'Excelente, nos vemos pronto!',
      'De acuerdo, estamos para ayudarte.',
      'Gracias por contactarnos.',
      'Confirmado, te esperamos.',
    ];

    setTimeout(() => {
      const respuesta: Mensaje = {
        id: this.getNextMensajeId(),
        chatId,
        emisorId: 0,
        tipo: 'lavadero',
        contenido: respuestas[Math.floor(Math.random() * respuestas.length)],
        fecha: new Date().toISOString(),
        leido: false
      };

      this.mensajes.push(respuesta);
      
      // Actualizar chat
      const chat = this.chats.find(c => c.id === chatId);
      if (chat) {
        chat.ultimoMensaje = respuesta;
        chat.noLeidos++;
        this.chatsSubject.next(this.chats);
      }

      this.mensajesSubject.next(this.mensajes);
    }, 2000 + Math.random() * 3000); // Entre 2-5 segundos
  }

  private actualizarContadorNoLeidos(chatId: number) {
    const chat = this.chats.find(c => c.id === chatId);
    if (chat) {
      const noLeidos = this.mensajes.filter(m => 
        m.chatId === chatId && 
        !m.leido && 
        m.tipo === 'lavadero'
      ).length;
      chat.noLeidos = noLeidos;
      this.chatsSubject.next(this.chats);
    }
  }

  // ============= HELPERS =============
  private getNextChatId(): number {
    return Math.max(...this.chats.map(c => c.id), 0) + 1;
  }

  private getNextMensajeId(): number {
    return Math.max(...this.mensajes.map(m => m.id), 0) + 1;
  }

  // ============= INDICADORES DE ESCRITURA =============
  enviarIndicadorEscribiendo(chatId: number, tipo: 'usuario' | 'lavadero'): Observable<void> {
    // En implementación real, esto enviaría un evento al servidor
    console.log(`${tipo} está escribiendo en chat ${chatId}`);
    return of(void 0).pipe(delay(100));
  }

  // ============= ESTADO DE CONEXIÓN =============
  getEstadoConexion(): Observable<'online' | 'offline'> {
    // Simular estado de conexión
    return of('online' as const).pipe(delay(200));
  }
}
