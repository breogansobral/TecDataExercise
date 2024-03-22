import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, of, switchMap, withLatestFrom } from 'rxjs';
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
    const superheros$ = this.superherosService.getSuperheros();
    this.fillSuggestedSuperheros(superheros$);
  }

  private subscribeSuggestionsSharedService() {
    this.sharedService.superheros$
      .subscribe({
        next: superheros$ => {
          this.fillSuggestedSuperheros(superheros$)
        }
      });
  }

  private fillSuggestedSuperheros(superheros$: Observable<Hero[]>) {
    superheros$.
      subscribe(heros => {
        this.superheros$ = of(heros);
        this.suggestedSuperheros$ = of(heros);
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
