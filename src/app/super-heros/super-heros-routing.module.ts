import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHerosComponent } from './super-heros/super-heros.component';

const routes: Routes = [
  {
    path: '',
    component: SuperHerosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperHerosRouting {}
