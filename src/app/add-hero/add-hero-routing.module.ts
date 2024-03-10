import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHeroComponent } from './add-hero/add-hero.component';

const routes: Routes = [
  {
    path: '',
    component: AddHeroComponent
  },
  {
    path: ':id',
    component: AddHeroComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHeroRouting {}
