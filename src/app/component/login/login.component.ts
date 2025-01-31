import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent    {
  
  _loginForm: FormGroup ; // Declaración del formulario
  hidePassword: boolean = true;
  constructor( private builder: FormBuilder, private service:AdminService, private toastr: ToastrService,private router: Router) {
    this._loginForm = this.builder.group({
      admin_code: this.builder.control('',Validators.required),
      password: this.builder.control('', Validators.required)
      
    }) 

  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword; // Cambia el estado de visibilidad
  }
  

  
  proceedlogin(){

  }
}
