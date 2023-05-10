import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IClasse } from 'src/app/core/models/classes';
import { ClassesService } from '../../services/classes.service';
import { ClassesCreateComponent } from '../classes-create/classes-create.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})

export class ClassesListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  destroyed$ = new Subject<void>();
  dataSource = new MatTableDataSource<IClasse>();
  displayedColumns: string[] = ['id', 'clase', 'profesor', 'alumno', 'horario'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private classesService: ClassesService
  ) { }

  ngOnInit(): void {
    this.classesService.getClasses()
      .subscribe((classes) => {
        this.dataSource.data = classes;
        this.dataSource.paginator = this.paginator;
      });
    this.classesService.getApiClasses();
  }

  createClasses(): void {
    const dialog = this.matDialog.open(ClassesCreateComponent, {
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

  editClasses(dataToEdit: IClasse): void {
    const dialog = this.matDialog.open(ClassesCreateComponent, {
      data: {
        value: dataToEdit,
        action: 'Editar'
      }
    });
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.dataSource.data = this.dataSource.data.map(
          (selectedClasse) => selectedClasse.id === dataToEdit.id
            ? ({ ...selectedClasse, ...formValue })
            : selectedClasse
        );
      }
    })
  }

  deleteClasse(dataToDelete: IClasse): void {
    this.dataSource.data = this.dataSource.data.filter(
      (selectedClasse) => selectedClasse.id !== dataToDelete.id
    );
  }

  detailClasse(classeId: number): void {
    this.router.navigate([classeId], {
      relativeTo: this.activatedRoute
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
