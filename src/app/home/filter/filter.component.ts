import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, of, withLatestFrom } from 'rxjs';
import { Hero } from 'src/app/models/hero';
import { SharedService } from 'src/app/shared/shared.service';
import { SuperHerosService } from 'src/app/super-heros/super-heros.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Output() filterEvent: EventEmitter<string> = new EventEmitter<string>();
  superheros$ !: Observable<Hero[]>;

  searchControl: FormControl;
  suggestedSuperheros$ : Observable<Hero[]> = of([]);

  constructor(
    private sharedService: SharedService,
    private superherosService: SuperHerosService
  ) {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.initSuggestions();
    this.subscribeSuggestionsSharedService();
    this.subscribeFilterChanges();
  }

  private initSuggestions() {
    this.superheros$ = this.superherosService.getSuperheros();
    this.suggestedSuperheros$ = this.superheros$
      .pipe(
        withLatestFrom(this.suggestedSuperheros$),
        map(([newHeros, lastHeros]) => this.deleteDuplicatedByName(newHeros))
      );
  }

  private subscribeSuggestionsSharedService() {
    this.sharedService.superheros$
      .subscribe({
        next: heros$ => {
          this.suggestedSuperheros$ = heros$.pipe(
            withLatestFrom(this.suggestedSuperheros$),
            map(([newHeros, lastHeros]) =>  this.deleteDuplicatedByName(newHeros))
          );

        }
      });
  }

  private subscribeFilterChanges() {
    this.searchControl.valueChanges
      .subscribe({
        next: (filter) => {
          this.filterEvent.emit(filter);
          this.suggestedSuperheros$ = this.superheros$.pipe(
            map( heros => heros.filter( hero => hero.name.indexOf(filter) !== -1))
          )
        }
      });
  }

  private deleteDuplicatedByName(heros : Hero[]) {
    const unique = heros.filter((hero, index, self) =>
      index === self.findIndex((t) => (
        t.name === hero.name
      ))
    );
    return unique;
  }
}
