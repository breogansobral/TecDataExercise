import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {
  private jsonUrl = environment.jsonUrl;

  constructor(private http: HttpClient) { }

  getSuperheroes(): Observable<Hero[]> {
    return this.http.get<{ superheroes: Hero[] }>(this.jsonUrl).pipe(
      map(response => response.superheroes)
    );
  }

  getSuperheroById(id: number): Observable<Hero | undefined>{
    return this.getSuperheroes().pipe(
      map(heroes => heroes.find(hero => hero.id === id))
    );
  }
}
