// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Aquí puedes agregar la lógica para validar el usuario
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false; // Cambia el estado de autenticación
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}