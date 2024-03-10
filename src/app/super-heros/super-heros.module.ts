import { NgModule } from '@angular/core';
import { SuperheroesComponent } from './super-heros/super-heros.component';
import { SharedModule } from '../shared/shared.module';
import { SuperHerosRouting } from './super-heros-routing.module';
import { SuperHeroModule } from '../super-hero/super-hero.module';



@NgModule({
  declarations: [
    SuperheroesComponent
  ],
  imports: [
    SharedModule,
    SuperHeroModule,
    SuperHerosRouting
  ]
})
export class SuperHerosModule { }
