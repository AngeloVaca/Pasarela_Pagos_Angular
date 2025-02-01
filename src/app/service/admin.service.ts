import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { admin, loginAdmin, loginresp } from '../models/admin.model';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {  

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  _username=signal('');


  Proceedlogin(_data: loginAdmin) {
    return this.http.post(this.baseUrl + '/auth/login/admin', _data, { responseType: 'text' })
      .pipe(
        map((response: string) => {
          return { token: response }; // Convierte la respuesta en un objeto JSON
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error en autenticación:', error);

          let errorMessage = 'Error en la autenticación. Intenta nuevamente.';
          
          // ✅ Maneja errores 400 y 401 con mensajes personalizados
          if (error.status === 400) {
            errorMessage = 'Solicitud incorrecta. Verifica los datos ingresados.';
          } else if (error.status === 401) {
            errorMessage = 'Credenciales incorrectas. No autorizado.';
          }

          return throwError(() => new Error(errorMessage));
        })
      );
  }
  
  


}
