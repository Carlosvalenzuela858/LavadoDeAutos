import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'reservas',
        loadComponent: () => import('./pages/reservas/reservas.page').then(m => m.ReservasPage)
      },
      {
        path: 'promociones',
        loadComponent: () => import('./pages/promociones/promociones.page').then(m => m.PromocionesPage)
      },
      {
        path: 'notificaciones',
        loadComponent: () => import('./pages/notificaciones/notificaciones.page').then(m => m.NotificacionesPage)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  // Páginas adicionales
  {
    path: 'chat/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/chat/chat.page').then(m => m.ChatPage)
  },
  {
    path: 'chat-lista',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/chat-lista/chat-lista.page').then(m => m.ChatListaPage)
  },
  {
    path: 'vehiculos',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/vehiculos/vehiculos.page').then(m => m.VehiculosPage)
  },
  {
    path: 'estadisticas',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/estadisticas/estadisticas.page').then(m => m.EstadisticasPage)
  },
  {
    path: 'calendario',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/calendario/calendario.page').then(m => m.CalendarioPage)
  },
  {
    path: 'configuracion',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/configuracion/configuracion.page').then(m => m.ConfiguracionPage)
  },
  {
    path: 'metodos-pago',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/metodos-pago/metodos-pago.page').then(m => m.MetodosPagoPage)
  },
  {
    path: 'lealtad',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/lealtad/lealtad.page').then(m => m.LealtadPage)
  },
  {
    path: 'galeria/:reservaId',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/galeria/galeria.page').then(m => m.GaleriaPage)
  },
  {
    path: 'reseña/:reservaId',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/resena/resena.page').then(m => m.ResenaPage)
  }
];
