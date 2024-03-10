import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SuperHeroComponent } from './super-hero/super-hero.component';
import { ConfirmDialogComponent } from './super-hero/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [SuperHeroComponent, ConfirmDialogComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [SuperHeroComponent]
})
export class SuperHeroModule { }
