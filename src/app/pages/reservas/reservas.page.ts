// Commit por Juan - Componente de Reservas
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSpinner,
  IonButton,
  IonFab,
  IonFabButton,
  AlertController
} from '@ionic/angular/standalone';
import { Reserva, EstadoReserva } from '../../models/reserva.model';
import { ReservasService } from '../../services/reservas.service';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  timeOutline,
  carOutline,
  checkmarkDoneOutline,
  closeCircle,
  add
} from 'ionicons/icons';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardContent,
    IonIcon,
    IonSpinner,
    IonButton,
    IonFab,
    IonFabButton
  ]
})
export class ReservasPage implements OnInit {
  segment: string = 'activas';
  reservasActivas: Reserva[] = [];
  reservasCompletadas: Reserva[] = [];
  loading: boolean = true;
  showNuevaReserva: boolean = false;

  constructor(
    private reservasService: ReservasService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    addIcons({
      calendarOutline,
      timeOutline,
      carOutline,
      checkmarkDoneOutline,
      closeCircle,
      add
    });
  }

  ngOnInit() {
    this.loadReservas();
    
    // Verificar si viene de la selección de un lavadero
    this.route.queryParams.subscribe(params => {
      if (params['lavaderoId']) {
        this.abrirNuevaReserva();
      }
    });
  }

  ionViewWillEnter() {
    this.loadReservas();
  }

  loadReservas() {
    const usuario = this.authService.currentUserValue;
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;

    // Cargar reservas activas
    this.reservasService.getReservasPendientes(usuario.id).subscribe({
      next: (activas) => {
        this.reservasActivas = activas;
      }
    });

    // Cargar reservas completadas
    this.reservasService.getReservasCompletadas(usuario.id).subscribe({
      next: (completadas) => {
        this.reservasCompletadas = completadas;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  segmentChanged() {
    // Lógica para cambio de segmento si es necesario
  }

  getEstadoTexto(estado: EstadoReserva): string {
    const estados: { [key: string]: string } = {
      [EstadoReserva.PENDIENTE]: 'Pendiente',
      [EstadoReserva.CONFIRMADA]: 'Confirmada',
      [EstadoReserva.EN_PROCESO]: 'En Proceso',
      [EstadoReserva.COMPLETADA]: 'Completada',
      [EstadoReserva.CANCELADA]: 'Cancelada'
    };
    return estados[estado] || estado;
  }

  getEstadoClass(estado: EstadoReserva): string {
    const classes: { [key: string]: string } = {
      [EstadoReserva.PENDIENTE]: 'pendiente',
      [EstadoReserva.CONFIRMADA]: 'confirmada',
      [EstadoReserva.EN_PROCESO]: 'en-proceso',
      [EstadoReserva.COMPLETADA]: 'completada',
      [EstadoReserva.CANCELADA]: 'cancelada'
    };
    return classes[estado] || '';
  }

  async cancelarReserva(reserva: Reserva) {
    const alert = await this.alertController.create({
      header: 'Cancelar Reserva',
      message: '¿Estás seguro de que deseas cancelar esta reserva?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí, Cancelar',
          handler: () => {
            this.reservasService.cancelarReserva(reserva.id).subscribe({
              next: (success) => {
                if (success) {
                  this.loadReservas();
                  this.presentAlert('Reserva cancelada', 'Tu reserva ha sido cancelada exitosamente.');
                }
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  abrirNuevaReserva() {
    this.router.navigate(['/home']);
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}
