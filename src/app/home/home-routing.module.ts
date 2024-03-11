import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'super-heros',
        loadChildren: () =>
          import('src/app/super-heros/super-heros.module').then((file) => file.SuperHerosModule),
      },
      {
        path: 'add-hero',
        loadChildren: () => import('src/app/add-hero/add-hero.module').then(m => m.AddHeroModule)
      },
      {
        path: '',
        redirectTo: 'super-heros',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class HomeRoutingModule {}