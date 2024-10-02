import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // si estás en un subdirectorio


import { Router } from '@angular/router';

@Component({

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   selector: 'app-login'
})
export class LoginComponent {
  public titulo: string;
  public pulsaciones: number;
 
  pulsar(): void {
    this.pulsaciones++;
  }
  reset(): void {
    this.pulsaciones=0;
  }


  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
    this.pulsaciones = 0;
    this.titulo = "hogar de ancianos";
  }

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/inicio']); // Redirige después de iniciar sesión
    } else {
      alert('Credenciales incorrectas');
    }
  }

}




