import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { loginAdmin, loginresp } from '../../models/admin.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  _loginForm: FormGroup; // Declaración del formulario
  _response!: loginresp;
  hidePassword: boolean = true;

  constructor(
    private builder: FormBuilder,
    private service: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this._loginForm = this.builder.group({
      admin_code: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword; // Cambia el estado de visibilidad
  }

  proceedlogin() {
    if (this._loginForm.valid) {
      let _obj: loginAdmin = {
        admin_code: this._loginForm.value.admin_code as string,
        password: this._loginForm.value.password as string
      };

      this.service.Proceedlogin(_obj).subscribe({
        next: (item) => {
          this._response = item;
          localStorage.setItem('token', this._response.token);
          localStorage.setItem('admin_code', _obj.admin_code);
          
          // Redirige después del login
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.error('Error en login:', error);
          
          // ✅ Evita errores si `error.error.title` no existe
          let errorMessage = 'Error desconocido';
          if (error.error && typeof error.error === 'object' && error.error.title) {
            errorMessage = error.error.title;
          } else if (typeof error.message === 'string') {
            errorMessage = error.message;
          }

          // Muestra el error con Toastr
          this.toastr.error(errorMessage, 'Error de autenticación');
        }
      });
    }
  }
}
