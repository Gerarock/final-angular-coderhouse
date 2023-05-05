import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./modules/auth/login.module').then((m) => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
