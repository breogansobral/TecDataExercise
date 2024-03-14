import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeRoutingModule } from '../home/home-routing.module';



@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [ErrorPageComponent]
})
export class ErrorPageModule { }
