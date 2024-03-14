import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'delete-hero',
  templateUrl: './delete-hero.component.html',
  styleUrls: ['./delete-hero.component.sass']
})
export class DeleteHeroComponent {
  @Input()
  hero !: Hero;

  @Output()
  deleteHeroEvent: EventEmitter<Hero> = new EventEmitter<Hero>()

  constructor(
  ) {}

  deleteHero(hero: Hero) {
    this.deleteHeroEvent.emit(hero);
  }
}
