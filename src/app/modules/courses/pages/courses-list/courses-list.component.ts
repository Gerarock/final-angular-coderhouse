import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ICourse } from 'src/app/core/models/course';
import { CoursesService } from '../../services/courses.service';
import { CoursesCreateComponent } from '../courses-create/courses-create.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })

  sort: MatSort = new MatSort;

  destroyed$ = new Subject<void>();
  dataSource = new MatTableDataSource<ICourse>();
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'fechaFin', 'fechaInicio', 'ver_detalle', 'eliminar', 'editar'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.coursesService.getCourses()
      .subscribe((courses) => {
        this.dataSource.data = courses;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.coursesService.getApiCoursesWhitSubject();
  }

  createCourses(): void {
    const dialog = this.matDialog.open(CoursesCreateComponent, {
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

  editCourse(dataToEdit: ICourse): void {
    const dialog = this.matDialog.open(CoursesCreateComponent, {
      data: {
        value: dataToEdit,
        action: 'Editar'
      }
    });
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.dataSource.data = this.dataSource.data.map(
          (selectedCourse) => selectedCourse.id === dataToEdit.id
            ? ({ ...selectedCourse, ...formValue })
            : selectedCourse
        );
      }
    })
  }

  deleteCourse(dataToDelete: ICourse): void {
    Swal.fire({
      title: 'Vas a eliminar el curso ',
      text: "¿Realmente deseas continuar?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Si, eliminar curso',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.dataSource.data = this.dataSource.data.filter(
          (selectedCourse) => selectedCourse.id !== dataToDelete.id
        );

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Curso ' + ' fue eliminado',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1800,
        })
      }
    })
  }

  detailCourse(courseId: number): void {
    this.router.navigate([courseId], {
      relativeTo: this.activatedRoute
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
