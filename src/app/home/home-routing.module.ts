import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { superHerosResolver } from '../super-heros/super-heros.resolver';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'super-heros',
        loadChildren: () =>
          import('src/app/super-heros/super-heros.module').then((file) => file.SuperHerosModule),
        title: 'SuperHéroes',
        resolve: { superHerosApi: superHerosResolver },
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
