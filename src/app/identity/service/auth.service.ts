import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationRequest, AuthenticationResponse, ResponseService } from '../interfaces/authentication-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://www.restcarrito.somee.com/api/Account/authenticate';
  private http = inject(HttpClient)

  authenticate(request: AuthenticationRequest): Observable<ResponseService<AuthenticationResponse>> {
    return this.http.post<ResponseService<AuthenticationResponse>>(this.apiUrl, request);
  }

  isloggedIn() {
    return sessionStorage.getItem('username') != null;
  }

}
