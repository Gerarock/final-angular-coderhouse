import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './pages/student-list/students-list.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent
  },
  {
    path: ':id',
    component: StudentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
