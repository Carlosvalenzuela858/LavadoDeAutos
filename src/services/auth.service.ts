// Commit por Carlos - Servicio de autenticación
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { USUARIOS_MOCK } from '../data/usuarios.data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;
  private usuarios = USUARIOS_MOCK;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<Usuario | null> {
    return new Observable(observer => {
      setTimeout(() => {
        const usuario = this.usuarios.find(u => 
          u.email === email && u.password === password
        );
        
        if (usuario) {
          localStorage.setItem('currentUser', JSON.stringify(usuario));
          this.currentUserSubject.next(usuario);
          observer.next(usuario);
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  getUsuarioById(id: number): Usuario | undefined {
    return this.usuarios.find(u => u.id === id);
  }
}
