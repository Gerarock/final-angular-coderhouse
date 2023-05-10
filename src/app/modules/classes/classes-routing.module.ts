import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesListComponent } from './pages/classes-list/classes-list.component';
import { ClassesDetailComponent } from './pages/classes-detail/classes-detail.component';

const routes: Routes = [
  {
    path: 'classesList',
    component: ClassesListComponent
  },
  {
    path: ':id',
    component: ClassesDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
