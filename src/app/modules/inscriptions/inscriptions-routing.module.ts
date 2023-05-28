import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsDetailComponent } from './pages/inscriptions-detail/inscriptions-detail.component';
import { InscriptionsListComponent } from './pages/inscriptions-list/inscriptions-list.component';

const routes: Routes = [
  {
    path: 'inscriptionsList',
    component: InscriptionsListComponent
  },
  {
    path: ':id',
    component: InscriptionsDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionsRoutingModule { }
