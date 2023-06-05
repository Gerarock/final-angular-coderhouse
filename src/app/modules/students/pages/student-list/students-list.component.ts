import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/app/core/models/student';
import { StudentsService } from 'src/app/modules/students/services/students.service';
import { StudentCreateComponent } from '../student-create/student-create.component';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })

  sort: MatSort = new MatSort;

  destroyed$ = new Subject<void>();
  dataSource = new MatTableDataSource<IStudent>();
  displayedColumns: string[] = ['id', 'nombreCompleto', 'edad', 'direccion', 'email', 'fechaRegistro', 'ver_detalle', 'eliminar', 'editar'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) { }

  ngOnInit(): void {
    this.studentsService.getApiAlumns()
      .subscribe({
        next: (res) => {
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
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
    Swal.fire({
      title: 'Vas a eliminar el alumno ' + dataToDelete.nombre + ' ' + dataToDelete.apellido,
      text: "¿Realmente deseas continuar?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Si, eliminar alumno',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.dataSource.data = this.dataSource.data.filter(
          (selectedStudent) => selectedStudent.id !== dataToDelete.id
        );

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Alumno ' + dataToDelete.nombre + ' ' + dataToDelete.apellido + ' fue eliminado',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1800,
        })
      }
    })
  }

  detailStudent(studentId: number): void {
    this.router.navigate([studentId], {
      relativeTo: this.activatedRoute
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
