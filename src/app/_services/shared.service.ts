import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private filterSource = new BehaviorSubject<string>('');
  currentFilter = this.filterSource.asObservable();

  constructor(  ) {

  }

  updateFilter(filter: string) {
    this.filterSource.next(filter);
  }
}

