import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'https://www.restcarrito.somee.com/api/Articulo';

  private http = inject(HttpClient)

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  getArticulo(id: number): Observable<Articulo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Articulo>(url);
  }

  addArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }

  updateArticulo(id: number, changes: Partial<Articulo>): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, changes);
  }

  deleteArticulo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
