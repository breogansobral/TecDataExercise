import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperHerosService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getSuperheros(): Observable<Hero[]> {
    return this.http.get< Hero[]>(`${this.API_URL}superheros`);
  }

  getSuperheroById(id: number): Observable<Hero | undefined>{
    return this.getSuperheros().pipe(
      map(heros => heros.find(hero => hero.id === id))
    );
  }

  addSuperhero(superhero: Hero): Observable<Object> {
    return this.http.post(`${this.API_URL}superheros`, superhero);
  }

  deleteSuperhero(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}superheros/${id}`);
  }

  updateSuperhero(id: number, superhero: Hero): Observable<Hero> {
    return this.http.patch<Hero>(`${this.API_URL}superheros/${id}`, superhero);
  }
}
