import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    component: LoginComponent,
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
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
