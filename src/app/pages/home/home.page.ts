// Commit por María - Componente de Home con búsqueda y mapa
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSpinner,
  ModalController
} from '@ionic/angular/standalone';
import { Lavadero } from '../../models/lavadero.model';
import { LavaderosService } from '../../services/lavaderos.service';
import { addIcons } from 'ionicons';
import { 
  star, 
  locationOutline, 
  timeOutline, 
  chevronForwardOutline,
  searchOutline 
} from 'ionicons/icons';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonCard,
    IonCardContent,
    IonIcon,
    IonSpinner
  ]
})
export class HomePage implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  
  lavaderos: Lavadero[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  showMap: boolean = false;
  map: any;
  markers: any[] = [];

  constructor(
    private lavaderosService: LavaderosService,
    private router: Router
  ) {
    addIcons({ 
      star, 
      locationOutline, 
      timeOutline, 
      chevronForwardOutline,
      searchOutline 
    });
  }

  ngOnInit() {
    this.loadLavaderos();
    this.loadGoogleMaps();
  }

  loadLavaderos() {
    this.loading = true;
    this.lavaderosService.getLavaderos().subscribe({
      next: (data) => {
        this.lavaderos = data;
        this.loading = false;
        if (this.map) {
          this.addMarkersToMap();
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadGoogleMaps() {
    // Verificar si Google Maps ya está cargado
    if (typeof google !== 'undefined') {
      this.initializeMap();
      return;
    }

    // Cargar Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeMap();
    };
    document.head.appendChild(script);
  }

  initializeMap() {
    setTimeout(() => {
      if (this.mapElement) {
        const mapOptions = {
          center: { lat: -25.2637, lng: -57.5759 }, // Centro de Asunción
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        };
        
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.showMap = true;
        this.addMarkersToMap();
      }
    }, 500);
  }

  addMarkersToMap() {
    if (!this.map || typeof google === 'undefined') return;

    // Limpiar marcadores existentes
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    // Agregar nuevos marcadores
    this.lavaderos.forEach(lavadero => {
      const marker = new google.maps.Marker({
        position: { lat: lavadero.coordenadas.lat, lng: lavadero.coordenadas.lng },
        map: this.map,
        title: lavadero.nombre,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#2D3142',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; color: #2D3142;">${lavadero.nombre}</h3>
            <p style="margin: 0; font-size: 14px;">${lavadero.direccion}</p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">★ ${lavadero.rating}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.markers.push(marker);
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.loadLavaderos();
      return;
    }

    this.loading = true;
    this.lavaderosService.buscarLavaderos(this.searchTerm).subscribe({
      next: (data) => {
        this.lavaderos = data;
        this.loading = false;
        if (this.map) {
          this.addMarkersToMap();
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  verDetalle(lavadero: Lavadero) {
    // Guardar lavadero seleccionado y navegar
    localStorage.setItem('lavaderoSeleccionado', JSON.stringify(lavadero));
    this.router.navigate(['/reservas'], { 
      queryParams: { lavaderoId: lavadero.id } 
    });
  }

  getprecioMinimo(lavadero: Lavadero): number {
    if (lavadero.servicios.length === 0) return 0;
    return Math.min(...lavadero.servicios.map(s => s.precio));
  }
}
