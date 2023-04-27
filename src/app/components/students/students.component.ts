import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';
import { StudentFormComponent } from './student-form/student-form.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

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
    const dialog = this.matDialog.open(StudentFormComponent, {
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
    const dialog = this.matDialog.open(StudentFormComponent, {
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
    console.log('kkk: ', studentId);
    
    this.router.navigate([studentId], {
      relativeTo: this.activatedRoute
    });
  }

}
