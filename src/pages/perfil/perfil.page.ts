// Commit por Juan - Componente de Perfil
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardContent,
  IonButton,
  AlertController
} from '@ionic/angular/standalone';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { ReservasService } from '../../services/reservas.service';
import { addIcons } from 'ionicons';
import {
  person,
  mailOutline,
  callOutline,
  carSport,
  calendar,
  checkmarkCircle,
  cash,
  logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonCard,
    IonCardContent,
    IonButton
  ]
})
export class PerfilPage implements OnInit {
  usuario: Usuario | null = null;
  totalReservas: number = 0;
  reservasCompletadas: number = 0;
  totalGastado: number = 0;

  constructor(
    private authService: AuthService,
    private reservasService: ReservasService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      person,
      mailOutline,
      callOutline,
      carSport,
      calendar,
      checkmarkCircle,
      cash,
      logOutOutline
    });
  }

  ngOnInit() {
    this.loadUsuario();
    this.loadEstadisticas();
  }

  ionViewWillEnter() {
    this.loadUsuario();
    this.loadEstadisticas();
  }

  loadUsuario() {
    this.usuario = this.authService.currentUserValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  loadEstadisticas() {
    if (!this.usuario) return;

    this.reservasService.getReservasByUsuario(this.usuario.id).subscribe({
      next: (reservas) => {
        this.totalReservas = reservas.length;
        this.reservasCompletadas = reservas.filter(r => r.estado === 'completada').length;
        this.totalGastado = reservas
          .filter(r => r.estado === 'completada')
          .reduce((sum, r) => sum + r.precioTotal, 0);
      }
    });
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
