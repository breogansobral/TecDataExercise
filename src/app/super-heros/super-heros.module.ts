import { NgModule } from '@angular/core';
import { SuperherosComponent } from './super-heros/super-heros.component';
import { SharedModule } from '../shared/shared.module';
import { SuperHerosRouting } from './super-heros-routing.module';
import { SuperHeroModule } from '../super-hero/super-hero.module';



@NgModule({
  declarations: [
    SuperherosComponent
  ],
  imports: [
    SharedModule,
    SuperHeroModule,
    SuperHerosRouting
  ],
  exports: [SuperherosComponent]
})
export class SuperHerosModule { }
