import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperHerosService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getSuperheros(filterValue?: string): Observable<Hero[]> {
    const headers = new HttpHeaders().set('X-LOADING', 'false');
    const filter = filterValue ? `?filter=${filterValue}` : '';
    return this.http.get<Hero[]>(`${this.API_URL}superheros${filter}`, { headers });
  }

  getSuperheroById(id: number): Observable<Hero | undefined>{
    return this.getSuperheros().pipe(
      map(heros => heros.find(hero => hero.id === id))
    );
  }

  addSuperhero(superhero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.API_URL}superheros`, superhero);
  }

  deleteSuperhero(id: number): Observable<unknown> {
    return this.http.delete(`${this.API_URL}superheros/${id}`);
  }

  updateSuperhero(id: number, superhero: Hero): Observable<Hero> {
    return this.http.patch<Hero>(`${this.API_URL}superheros/${id}`, superhero);
  }
}
