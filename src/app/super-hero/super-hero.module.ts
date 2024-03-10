import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SuperHeroComponent } from './super-hero/super-hero.component';



@NgModule({
  declarations: [SuperHeroComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [SuperHeroComponent]
})
export class SuperHeroModule { }
