import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { SuperHerosService } from 'src/app/super-heros/super-heros.service';
import { Hero } from 'src/app/models/hero';

export const superHerosResolver: ResolveFn<Observable<Hero[]>> = (route, state) => {
  const superheroesService = inject(SuperHerosService);
  return superheroesService.getSuperheros();
};
