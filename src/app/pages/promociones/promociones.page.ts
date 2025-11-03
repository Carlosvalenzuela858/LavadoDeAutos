import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment,
  IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonChip,
  IonInput, IonItem, IonBadge, IonGrid, IonRow, IonCol, IonToast
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { giftOutline, ticketOutline, timeOutline, checkmarkCircle } from 'ionicons/icons';
import { CuponesService } from '../../services/cupones.service';
import { Cupon, Promocion } from '../../models/extended.models';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSegment,
    IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonChip,
    IonInput, IonItem, IonBadge, IonGrid, IonRow, IonCol, IonToast
  ]
})
export class PromocionesPage implements OnInit {
  segmento: 'promociones' | 'cupones' = 'promociones';
  promociones: Promocion[] = [];
  cupones: Cupon[] = [];
  codigoCupon = '';
  mostrarToast = false;
  mensajeToast = '';
  colorToast = 'success';

  constructor(
    private cuponesService: CuponesService,
    private router: Router
  ) {
    addIcons({ giftOutline, ticketOutline, timeOutline, checkmarkCircle });
  }

  ngOnInit() {
    this.cargarPromociones();
    this.cargarCupones();
  }

  cargarPromociones() {
    this.cuponesService.getPromocionesActivas().subscribe(promos => {
      this.promociones = promos;
    });
  }

  cargarCupones() {
    this.cuponesService.getCuponesActivos().subscribe(cupones => {
      this.cupones = cupones;
    });
  }

  cambiarSegmento(evento: any) {
    this.segmento = evento.detail.value;
  }

  aplicarPromocion(promocion: Promocion) {
    this.mostrarMensaje('Promoción aplicada', 'success');
    this.router.navigate(['/tabs/home']);
  }

  copiarCodigo(codigo: string) {
    navigator.clipboard.writeText(codigo);
    this.mostrarMensaje('Código copiado al portapapeles', 'success');
  }

  validarCupon() {
    if (!this.codigoCupon.trim()) {
      this.mostrarMensaje('Ingresa un código de cupón', 'warning');
      return;
    }

    this.cuponesService.getCuponByCodigo(this.codigoCupon).subscribe(cupon => {
      if (cupon) {
        this.mostrarMensaje(`¡Cupón válido! ${cupon.descripcion}`, 'success');
        this.codigoCupon = '';
      } else {
        this.mostrarMensaje('Cupón no válido o expirado', 'danger');
      }
    });
  }

  getDiasRestantes(fechaFin: string): number {
    const hoy = new Date();
    const fin = new Date(fechaFin);
    const diff = fin.getTime() - hoy.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  mostrarMensaje(mensaje: string, color: string) {
    this.mensajeToast = mensaje;
    this.colorToast = color;
    this.mostrarToast = true;
  }
}
