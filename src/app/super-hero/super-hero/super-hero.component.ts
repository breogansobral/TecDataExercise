import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-super-hero',
  templateUrl: './super-hero.component.html',
  styleUrls: ['./super-hero.component.sass']
})
export class SuperHeroComponent {
  @Input()
  hero!: Hero;
}
