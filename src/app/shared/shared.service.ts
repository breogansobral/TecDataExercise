import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private filterSource = new BehaviorSubject<string>('');
  currentFilter = this.filterSource.asObservable();

  private superherosSubject = new Subject<Observable<Hero[]>>();

  updateFilter(filter: string) {
    this.filterSource.next(filter);
  }

  get superheros$() {
    return this.superherosSubject.asObservable();
  }

  sendSuperheros(superheros: Observable<Hero[]>) {
    this.superherosSubject.next(superheros);
    return superheros;
  }
}

