import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddHeroRouting } from './add-hero-routing.module';



@NgModule({
  declarations: [
    AddHeroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AddHeroRouting
  ]
})
export class AddHeroModule { }
