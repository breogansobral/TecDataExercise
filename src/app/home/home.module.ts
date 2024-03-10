import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
 declarations: [HomeComponent],
 imports: [
  ReactiveFormsModule,
  SharedModule,
  HomeRoutingModule
 ]
})
export class HomeModule {}
