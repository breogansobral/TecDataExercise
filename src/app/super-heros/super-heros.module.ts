import { NgModule } from '@angular/core';
import { SuperHerosComponent } from './super-heros/super-heros.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from '../home/home-routing.module';
import { SuperHerosRouting } from './super-heros-routing.module';



@NgModule({
  declarations: [
    SuperHerosComponent
  ],
  imports: [
    SharedModule,
    SuperHerosRouting
  ]
})
export class SuperHerosModule { }
