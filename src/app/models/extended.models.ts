// Modelos extendidos para nuevas funcionalidades

// ============= SISTEMA DE PAGOS =============
export interface MetodoPago {
  id: number;
  usuarioId: number;
  tipo: 'tarjeta' | 'paypal' | 'efectivo';
  nombre: string;
  numero?: string; // últimos 4 dígitos
  vencimiento?: string;
  esDefault: boolean;
  paypalEmail?: string;
}

export interface Transaccion {
  id: number;
  reservaId: number;
  usuarioId: number;
  monto: number;
  metodoPagoId: number;
  estado: 'pendiente' | 'completado' | 'fallido' | 'reembolsado';
  fecha: string;
  stripePaymentId?: string;
  paypalPaymentId?: string;
}

// ============= CALIFICACIONES Y RESEÑAS =============
export interface Resena {
  id: number;
  usuarioId: number;
  lavaderoId: number;
  reservaId: number;
  calificacion: number; // 1-5
  comentario: string;
  fecha: string;
  respuesta?: RespuestaResena;
  fotos?: string[];
  meGusta: number;
}

export interface RespuestaResena {
  texto: string;
  fecha: string;
  lavaderoNombre: string;
}

// ============= CHAT =============
export interface Chat {
  id: number;
  usuarioId: number;
  lavaderoId: number;
  ultimoMensaje?: Mensaje;
  noLeidos: number;
  activo: boolean;
}

export interface Mensaje {
  id: number;
  chatId: number;
  emisorId: number;
  tipo: 'usuario' | 'lavadero';
  contenido: string;
  fecha: string;
  leido: boolean;
  adjunto?: {
    tipo: 'imagen' | 'documento';
    url: string;
    nombre: string;
  };
}

// ============= NOTIFICACIONES =============
export interface Notificacion {
  id: number;
  usuarioId: number;
  tipo: 'reserva' | 'pago' | 'promocion' | 'mensaje' | 'recordatorio' | 'resena';
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  accion?: {
    tipo: 'navegar' | 'url';
    destino: string;
  };
  icono: string;
}

export interface ConfiguracionNotificaciones {
  usuarioId: number;
  pushEnabled: boolean;
  emailEnabled: boolean;
  reservas: boolean;
  promociones: boolean;
  mensajes: boolean;
  recordatorios: boolean;
}

// ============= GALERÍA DE FOTOS =============
export interface GaleriaFoto {
  id: number;
  reservaId: number;
  usuarioId: number;
  tipo: 'antes' | 'despues';
  url: string;
  fecha: string;
  descripcion?: string;
}

// ============= CUPONES Y DESCUENTOS =============
export interface Cupon {
  id: number;
  codigo: string;
  descripcion: string;
  tipo: 'porcentaje' | 'fijo';
  valor: number;
  minimoCompra?: number;
  maximoDescuento?: number;
  fechaInicio: string;
  fechaFin: string;
  usos: number;
  usosMaximos?: number;
  activo: boolean;
  lavaderosAplicables?: number[]; // ids de lavaderos, null = todos
  serviciosAplicables?: number[]; // ids de servicios, null = todos
}

export interface CuponUsuario {
  id: number;
  usuarioId: number;
  cuponId: number;
  usado: boolean;
  fechaUso?: string;
  reservaId?: number;
}

export interface Promocion {
  id: number;
  lavaderoId?: number; // null = promoción general
  titulo: string;
  descripcion: string;
  imagen: string;
  descuento: number;
  tipo: 'porcentaje' | 'fijo' | '2x1';
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
}

// ============= VEHÍCULOS =============
export interface Vehiculo {
  id: number;
  usuarioId: number;
  marca: string;
  modelo: string;
  año: number;
  color: string;
  placa: string;
  tipo: 'auto' | 'suv' | 'camioneta' | 'moto';
  esPredeterminado: boolean;
  foto?: string;
  notas?: string;
}

// ============= ESTADÍSTICAS =============
export interface EstadisticasUsuario {
  usuarioId: number;
  totalReservas: number;
  reservasCompletadas: number;
  reservasCanceladas: number;
  gastoTotal: number;
  lavaderoFavorito?: {
    id: number;
    nombre: string;
    visitas: number;
  };
  servicioMasUsado?: {
    id: number;
    nombre: string;
    veces: number;
  };
  promedioGasto: number;
  ahorrosConCupones: number;
  ultimaReserva?: string;
}

export interface EstadisticasLavadero {
  lavaderoId: number;
  totalReservas: number;
  ingresoTotal: number;
  calificacionPromedio: number;
  totalResenas: number;
  reservasPorMes: {
    mes: string;
    cantidad: number;
    ingreso: number;
  }[];
  serviciosMasPopulares: {
    servicioId: number;
    nombre: string;
    cantidad: number;
  }[];
}

// ============= CALENDARIO Y RECORDATORIOS =============
export interface Recordatorio {
  id: number;
  usuarioId: number;
  tipo: 'reserva' | 'mantenimiento' | 'personalizado';
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  notificarAntes: number; // minutos antes
  repetir?: 'nunca' | 'diario' | 'semanal' | 'mensual';
  activo: boolean;
  reservaId?: number;
  vehiculoId?: number;
}

export interface EventoCalendario {
  id: number;
  usuarioId: number;
  tipo: 'reserva' | 'recordatorio' | 'promocion';
  titulo: string;
  fecha: string;
  hora?: string;
  duracion?: number; // minutos
  color: string;
  relacionadoId?: number; // id de reserva, recordatorio, etc.
}

// ============= PREFERENCIAS Y CONFIGURACIÓN =============
export interface PreferenciasUsuario {
  usuarioId: number;
  temaDark: boolean;
  idioma: 'es' | 'en' | 'pt';
  notificaciones: ConfiguracionNotificaciones;
  lavaderosFavoritos: number[];
  ubicacionPredeterminada?: {
    lat: number;
    lng: number;
    nombre: string;
  };
  metodoPagoDefault?: number;
  vehiculoDefault?: number;
}

// ============= PROGRAMA DE LEALTAD =============
export interface ProgramaLealtad {
  usuarioId: number;
  puntos: number;
  nivel: 'bronce' | 'plata' | 'oro' | 'platino';
  proximoNivel: number; // puntos necesarios
  beneficios: string[];
  historialPuntos: HistorialPuntos[];
}

export interface HistorialPuntos {
  id: number;
  usuarioId: number;
  puntos: number;
  tipo: 'ganado' | 'canjeado';
  concepto: string;
  fecha: string;
  reservaId?: number;
}

// ============= SOPORTE Y AYUDA =============
export interface TicketSoporte {
  id: number;
  usuarioId: number;
  asunto: string;
  descripcion: string;
  estado: 'abierto' | 'en_proceso' | 'resuelto' | 'cerrado';
  prioridad: 'baja' | 'media' | 'alta';
  categoria: 'tecnico' | 'pago' | 'reserva' | 'otro';
  fecha: string;
  respuestas: RespuestaSoporte[];
  reservaRelacionada?: number;
}

export interface RespuestaSoporte {
  id: number;
  ticketId: number;
  autorId: number;
  autorTipo: 'usuario' | 'soporte';
  mensaje: string;
  fecha: string;
  adjuntos?: string[];
}
