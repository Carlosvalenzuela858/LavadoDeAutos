// Commit por Carlos - Componente de Login
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonIcon,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { carSport, alertCircle } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonIcon,
    IonSpinner,
    IonText
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ carSport, alertCircle });
    
    // Si ya está autenticado, redirigir a tabs
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs']);
    }
  }

  onLogin() {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    this.loading = true;
    
    this.authService.login(this.email, this.password).subscribe({
      next: (usuario) => {
        this.loading = false;
        if (usuario) {
          this.router.navigate(['/tabs']);
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Error al iniciar sesión';
      }
    });
  }
}
