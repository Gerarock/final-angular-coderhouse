import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/app/core/models/student';
import { StudentsService } from 'src/app/modules/students/services/students.service';
import { StudentCreateComponent } from '../student-create/student-create.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {

  dataSource = new MatTableDataSource<IStudent>();

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fecha_registro', 'ver_detalle', 'eliminar', 'editar'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
  ) {
    this.studentsService.getAlumns()
      .subscribe((alumns) => {
        this.dataSource.data = alumns;
      });
  }

  createStudent(): void {
    const dialog = this.matDialog.open(StudentCreateComponent, {
      data: {
        value: '',
        action: 'Agregar'
      }
    });
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            ...formValue,
            fecha_registro: new Date(),
            id: this.dataSource.data.length + 1
          }
        ];
      }
    })
  }

  editStudent(dataToEdit: IStudent): void {
    const dialog = this.matDialog.open(StudentCreateComponent, {
      data: {
        value: dataToEdit,
        action: 'Editar'
      }
    });
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.dataSource.data = this.dataSource.data.map(
          (selectedStudent) => selectedStudent.id === dataToEdit.id
            ? ({ ...selectedStudent, ...formValue })
            : selectedStudent
        );
      }
    })
  }

  deleteStudent(dataToDelete: IStudent): void {
    this.dataSource.data = this.dataSource.data.filter(
      (selectedStudent) => selectedStudent.id !== dataToDelete.id
    );
  }

  detailStudent(studentId: number): void {    
    this.router.navigate([studentId], {
      relativeTo: this.activatedRoute
    });
  }

}
