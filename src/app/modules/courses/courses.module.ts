import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CoursesCreateComponent } from './pages/courses-create/courses-create.component';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CoursesCreateComponent,
    CoursesDetailComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    CoursesCreateComponent,
    CoursesDetailComponent,
    CoursesListComponent
  ]
})
export class CoursesModule { }
