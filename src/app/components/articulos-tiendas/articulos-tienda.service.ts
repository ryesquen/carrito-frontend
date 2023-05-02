import { Injectable, inject } from '@angular/core';
import { ArticulosTienda } from './interfaces/articulo-tienda';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosTiendaService {

  private apiUrl = 'https://www.restcarrito.somee.com/api/ArticulosTienda';

  private http = inject(HttpClient)

  getArticulosTienda(): Observable<ArticulosTienda[]> {
    return this.http.get<ArticulosTienda[]>(this.apiUrl);
  }

  addArticulosTienda(articuloTienda: ArticulosTienda): Observable<ArticulosTienda> {
    return this.http.post<ArticulosTienda>(this.apiUrl, articuloTienda);
  }

  deleteArticulosTienda(articuloId:number, tiendaId:number): Observable<any> {
    const url = `${this.apiUrl}/${articuloId}/${tiendaId}`;
    return this.http.delete(url);
  }
}
