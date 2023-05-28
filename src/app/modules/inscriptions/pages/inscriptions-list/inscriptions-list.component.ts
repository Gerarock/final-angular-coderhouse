import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { IInscription } from 'src/app/core/models/inscription';
import { InscriptionsService } from '../../services/inscriptions.service';
import { InscriptionsCreateComponent } from '../inscriptions-create/inscriptions-create.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { InscriptionsDetailComponent } from '../inscriptions-detail/inscriptions-detail.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-inscriptions-list',
  templateUrl: './inscriptions-list.component.html',
  styleUrls: ['./inscriptions-list.component.scss']
})

export class InscriptionsListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })

  sort: MatSort = new MatSort;

  destroyed$ = new Subject<void>();
  dataSource = new MatTableDataSource<IInscription>();
  displayedColumns: string[] = ['id', 'curso', 'inicioCurso', 'finCurso', 'alumno', 'edad', 'direccion', 'email', 'fechaRegistro', 'ver_detalle', 'eliminar', 'editar'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private inscriptionsService: InscriptionsService,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.inscriptionsService.getInscriptions()
      .subscribe((inscriptions) => {
        this.dataSource.data = inscriptions;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.inscriptionsService.getApiInscriptionsWhitAll();
  }

  createInscription(): void {
    const dialog = this.matDialog.open(InscriptionsCreateComponent, {
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

  editInscription(dataToEdit: IInscription): void {
    const dialog = this.matDialog.open(InscriptionsCreateComponent, {
      data: {
        value: dataToEdit,
        action: 'Editar'
      }
    });
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.dataSource.data = this.dataSource.data.map(
          (selectedInscription) => selectedInscription.id === dataToEdit.id
            ? ({ ...selectedInscription, ...formValue })
            : selectedInscription
        );
      }
    })
  }

  deleteInscription(dataToDelete: IInscription): void {
    Swal.fire({
      title: 'Vas a eliminar la inscripción ',
      text: "¿Realmente deseas continuar?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Si, eliminar inscripción',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.dataSource.data = this.dataSource.data.filter(
          (selectedInscription) => selectedInscription.id !== dataToDelete.id
        );

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La Inscripción ' + ' fue eliminado',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1800,
        })
      }
    })
  }

  detailInscription(inscriptionId: number): void {
    this._bottomSheet.open(InscriptionsDetailComponent);
    /*     this.router.navigate([inscriptionId], {
          relativeTo: this.activatedRoute
        }); */
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
