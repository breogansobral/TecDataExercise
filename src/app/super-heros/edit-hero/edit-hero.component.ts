import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.sass']
})
export class EditHeroComponent {
  @Input()
  hero!: Hero;
  @Output() editHeroEvent = new EventEmitter<Hero>();



  editHero(hero: Hero) {
    this.editHeroEvent.emit(hero);
  }
}
