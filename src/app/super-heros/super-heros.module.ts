import { NgModule } from '@angular/core';
import { SuperherosComponent } from './super-heros/super-heros.component';
import { SharedModule } from '../shared/shared.module';
import { SuperHerosRouting } from './super-heros-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SuperHeroComponent } from './super-hero/super-hero.component';
import { ConfirmDialogComponent } from './super-heros/confirm-dialog.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { DeleteHeroComponent } from './delete-hero/delete-hero.component';



@NgModule({
  declarations: [
    SuperherosComponent,
    SuperHeroComponent,
    ConfirmDialogComponent,
    EditHeroComponent,
    DeleteHeroComponent
  ],
  imports: [
    SharedModule,
    SuperHerosRouting,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [SuperherosComponent]
})
export class SuperHerosModule { }
