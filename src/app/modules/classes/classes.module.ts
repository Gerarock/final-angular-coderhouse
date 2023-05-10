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
import { ClassesCreateComponent } from './pages/classes-create/classes-create.component';
import { ClassesDetailComponent } from './pages/classes-detail/classes-detail.component';
import { ClassesListComponent } from './pages/classes-list/classes-list.component';
import { ClassesRoutingModule } from './classes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ClassesCreateComponent,
    ClassesDetailComponent,
    ClassesListComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule
  ],
  exports: [
    ClassesCreateComponent,
    ClassesDetailComponent,
    ClassesListComponent
  ]
})
export class ClassesModule { }
