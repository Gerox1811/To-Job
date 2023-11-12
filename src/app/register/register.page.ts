import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  register() {
    // Aquí debes implementar la lógica de registro, como crear una cuenta de usuario.
    // Esto puede incluir el uso de Firebase Authentication u otro sistema de autenticación.
    // Una vez que el registro sea exitoso, puedes redirigir al usuario a la página principal.

    // Ejemplo de redirección a la página de inicio (ajusta la ruta según tu configuración):
    this.router.navigate(['/home']);
  }
}

