import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page/error-page.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/home/home.module').then((file) => file.HomeModule),
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
];
@NgModule({
 imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
 exports: [RouterModule],
})
export class AppRoutingModule {}
