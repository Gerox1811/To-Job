import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string = '';  // Inicializa con un valor vacío
  password: string = '';  // Inicializa con un valor vacío

  constructor(private router: Router) {}

  login() {
    if (this.username === 'usuario' && this.password === 'contraseña') {
      // Redirigir al usuario a la página principal después de iniciar sesión.
      this.router.navigate(['/home']);
    } else {
      console.error('Credenciales incorrectas');
    }
  }
  navigateToSignUpPage() {
    this.router.navigate(['/register']); // Asegúrate de que '/register' sea la ruta de tu página de registro.
  }
  
}
