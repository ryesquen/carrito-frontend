import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://www.restcarrito.somee.com/api/Cliente';

  private http = inject(HttpClient)

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateCliente(id: number, changes: Partial<Cliente>): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, changes);
  }

  deleteCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
