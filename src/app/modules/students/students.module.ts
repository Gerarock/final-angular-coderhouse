import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsListComponent } from './pages/student-list/students-list.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { StudentCreateComponent } from './pages/student-create/student-create.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentCreateComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: StudentsListComponent
      },
      {
        path: ':id',
        component: StudentDetailComponent,
      },
    ]),
  ],
  exports: [
    StudentsListComponent
  ]
})
export class StudentsModule { }
