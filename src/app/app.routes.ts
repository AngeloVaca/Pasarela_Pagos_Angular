import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // ✅ Redirige a login por defecto
    { path: '**', redirectTo: 'login' } // ✅ Cualquier ruta inválida va a login
];
