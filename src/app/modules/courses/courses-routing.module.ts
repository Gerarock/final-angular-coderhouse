import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesListComponent
  },
  {
    path: ':id',
    component: CoursesDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
