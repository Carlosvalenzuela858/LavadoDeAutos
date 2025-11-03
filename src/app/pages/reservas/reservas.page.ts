import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Servicio } from '../../models/interfaces';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ReservasPage implements OnInit {
  servicios: Servicio[] = [];
  servicioSeleccionado?: Servicio;
  vehiculoId: string = '1';
  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';
  usuarioId: string = '';

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Cargar servicios disponibles
    this.servicios = this.dataService.getServicios();

    // Obtener usuario logueado
    const user = this.authService.currentUserValue;
    if (user) {
      this.usuarioId = user.id.toString();
    }
  }

  async confirmarReserva() {
    if (!this.servicioSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada) {
      const alerta = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor completa todos los campos antes de continuar.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }

    // Crear la reserva
    this.dataService.crearReserva({
      usuarioId: this.usuarioId,
      lavaderoId: '1',
      servicioId: this.servicioSeleccionado.id,
      vehiculoId: this.vehiculoId,
      fecha: this.fechaSeleccionada,
      hora: this.horaSeleccionada,
      precioTotal: this.servicioSeleccionado.precio
    });

    // ✅ Mostrar alerta de confirmación con AlertController
    const alert = await this.alertController.create({
      header: '¡Reserva confirmada!',
      message: 'Tu reserva fue creada exitosamente 🎉',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/tabs/reservas']);
          }
        }
      ]
    });

    await alert.present();
  }
}
