import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
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
        catchError((error) => {
          console.error('Error en autenticación:', error);
          return throwError(() => new Error('Falló la autenticación.'));
        })
      );
  }
  
  


}
