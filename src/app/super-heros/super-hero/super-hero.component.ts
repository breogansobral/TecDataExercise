import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'super-hero',
  templateUrl: './super-hero.component.html',
  styleUrls: ['./super-hero.component.sass']
})
export class SuperHeroComponent {
  @Input()
  hero!: Hero;

  @Output()
  editHeroEvent: EventEmitter<Hero> = new EventEmitter<Hero>();

  @Output()
  deleteHeroEvent: EventEmitter<Hero> = new EventEmitter<Hero>();

  constructor(
  ) {}

  editHero(hero: Hero) {
    this.editHeroEvent.emit(hero);
  }

  deleteHero(hero: Hero) {
    console.log(hero)
    this.deleteHeroEvent.emit(hero);
  }
}
