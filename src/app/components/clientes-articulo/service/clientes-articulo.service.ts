import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientesArticulo } from '../interfaces/cliente-articulo';

@Injectable({
  providedIn: 'root'
})
export class ClientesArticuloService {

  private apiUrl = 'https://localhost:44322/api/ClientesArticulo';

  private http = inject(HttpClient)

  getClientesArticulo(): Observable<ClientesArticulo[]> {
    return this.http.get<ClientesArticulo[]>(this.apiUrl);
  }

  addClientesArticulo(articuloTienda: ClientesArticulo): Observable<ClientesArticulo> {
    return this.http.post<ClientesArticulo>(this.apiUrl, articuloTienda);
  }

  deleteClientesArticulo(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
