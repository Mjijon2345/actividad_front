import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // si estás en un subdirectorio

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {
 
  constructor(public authService: AuthService) {} // El servicio se inyecta aquí

  // Puedes usar este método si necesitas lógica adicional
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
