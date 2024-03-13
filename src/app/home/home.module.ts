import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewButtonComponent } from './add-new-button/add-new-button.component';
import { FilterComponent } from './filter/filter.component';
@NgModule({
 declarations: [HomeComponent, AddNewButtonComponent, FilterComponent],
 imports: [
  ReactiveFormsModule,
  SharedModule,
  HomeRoutingModule
 ]
})
export class HomeModule {}
