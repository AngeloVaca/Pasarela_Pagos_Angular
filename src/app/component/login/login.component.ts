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
export class LoginComponent    {
  
  _loginForm: FormGroup ; // Declaración del formulario
  _response!: loginresp;



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
    if (this._loginForm.valid) {
      let _obj: loginAdmin = {
        admin_code: this._loginForm.value.admin_code as string,
        password: this._loginForm.value.password as string
      }
      this.service.Proceedlogin(_obj).subscribe(item => {
        this._response = item;
        localStorage.setItem('token', this._response.token);
        localStorage.setItem('username', _obj.admin_code);        
        /*this.service.Loadmenubyrole(this._response.userRole).subscribe(item=>{
          this.service._menulist.set(item);
        })*/

        this.router.navigateByUrl('/');
      }, error => {
        this.toastr.error('Failed to login', error.error.title)
      });
    }

  }
}
