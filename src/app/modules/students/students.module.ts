import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentsRoutingModule } from './students-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentCreateComponent } from './pages/student-create/student-create.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { StudentsListComponent } from './pages/student-list/students-list.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    StudentCreateComponent,
    StudentDetailComponent,
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    StudentCreateComponent,
    StudentDetailComponent,
    StudentsListComponent
  ]
})
export class StudentsModule { }