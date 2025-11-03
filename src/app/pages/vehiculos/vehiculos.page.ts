import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
  IonButtons, IonButton, IonIcon, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonModal, IonInput, IonItem,
  IonLabel, IonSelect, IonSelectOption, IonTextarea, IonFab,
  IonFabButton, IonChip, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { carSportOutline, addOutline, createOutline, trashOutline, starOutline, star } from 'ionicons/icons';
import { VehiculosService } from '../../services/vehiculos.service';
import { Vehiculo } from '../../models/extended.models';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
    IonButtons, IonButton, IonIcon, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonModal, IonInput, IonItem,
    IonLabel, IonSelect, IonSelectOption, IonTextarea, IonFab,
    IonFabButton, IonChip, IonBadge
  ]
})
export class VehiculosPage implements OnInit {
  vehiculos: Vehiculo[] = [];
  usuarioId = 1;
  modalAbierto = false;
  vehiculoEditando?: Vehiculo;
  
  nuevoVehiculo = {
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    color: '',
    placa: '',
    tipo: 'auto' as 'auto' | 'suv' | 'camioneta' | 'moto',
    notas: ''
  };

  constructor(private vehiculosService: VehiculosService) {
    addIcons({ carSportOutline, addOutline, createOutline, trashOutline, starOutline, star });
  }

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculosService.getVehiculosByUsuario(this.usuarioId)
      .subscribe(vehiculos => this.vehiculos = vehiculos);
  }

  abrirModal(vehiculo?: Vehiculo) {
    if (vehiculo) {
      this.vehiculoEditando = vehiculo;
      this.nuevoVehiculo = { ...vehiculo };
    } else {
      this.vehiculoEditando = undefined;
      this.resetFormulario();
    }
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.resetFormulario();
  }

  guardarVehiculo() {
    if (this.vehiculoEditando) {
      this.vehiculosService.actualizarVehiculo(this.vehiculoEditando.id, this.nuevoVehiculo)
        .subscribe(() => {
          this.cargarVehiculos();
          this.cerrarModal();
        });
    } else {
      this.vehiculosService.agregarVehiculo({
        ...this.nuevoVehiculo,
        usuarioId: this.usuarioId,
        esPredeterminado: this.vehiculos.length === 0
      }).subscribe(() => {
        this.cargarVehiculos();
        this.cerrarModal();
      });
    }
  }

  eliminarVehiculo(id: number) {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      this.vehiculosService.eliminarVehiculo(id)
        .subscribe(() => this.cargarVehiculos());
    }
  }

  setPredeterminado(id: number) {
    this.vehiculosService.setPredeterminado(id)
      .subscribe(() => this.cargarVehiculos());
  }

  resetFormulario() {
    this.nuevoVehiculo = {
      marca: '',
      modelo: '',
      año: new Date().getFullYear(),
      color: '',
      placa: '',
      tipo: 'auto',
      notas: ''
    };
  }

  getTipoIcono(tipo: string): string {
    const iconos: Record<string, string> = {
      auto: '🚗',
      suv: '🚙',
      camioneta: '🚐',
      moto: '🏍️'
    };
    return iconos[tipo] || '🚗';
  }
}
