import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tienda } from '../interfaces/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = 'https://www.restcarrito.somee.com/api/Tienda';

  private http = inject(HttpClient)

  getTiendas(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(this.apiUrl);
  }

  addTienda(Tienda: Tienda): Observable<Tienda> {
    return this.http.post<Tienda>(this.apiUrl, Tienda);
  }

  updateTienda(id: number, changes: Partial<Tienda>): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, changes);
  }

  deleteTienda(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
