import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { IInscription, IInscriptionWhitAll } from 'src/app/core/models/inscription';
import { InscriptionsService } from '../../services/inscriptions.service';
import { InscriptionsCreateComponent } from '../inscriptions-create/inscriptions-create.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { InscriptionsDetailComponent } from '../inscriptions-detail/inscriptions-detail.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { State } from '../../store/inscriptions.reducer';
import { selectInscriptionsState } from '../../store/inscriptions.selectors';
import { InscriptionsUpdateComponent } from '../inscriptions-update/inscriptions-update.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscriptions-list',
  templateUrl: './inscriptions-list.component.html',
  styleUrls: ['./inscriptions-list.component.scss']
})

export class InscriptionsListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  state$: Observable<State>;
  destroyed$ = new Subject<void>();
  dataSource = new MatTableDataSource<IInscriptionWhitAll>();
  displayedColumns: string[] = ['id', 'curso', 'inicioCurso', 'finCurso', 'alumno', 'ver_detalle', 'eliminar', 'editar'];

  constructor(
    private matDialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private store: Store
  ) {
    this.store.dispatch(InscriptionsActions.loadInscriptions());
    this.state$ = this.store.select(selectInscriptionsState);
  }

  ngOnInit(): void {
    this.store.select(selectInscriptionsState)
      .subscribe(({ inscriptions }) => {
        this.dataSource.data = inscriptions;
        this.dataSource.paginator = this.paginator;
      });
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  createInscription(): void {
    this.matDialog.open(InscriptionsCreateComponent, {
      data: {
        value: '',
        action: 'Agregar'
      }
    });
  }

  updateInscription(dataToEdit: IInscription): void {
    this.matDialog.open(InscriptionsUpdateComponent, {
      data: {
        value: dataToEdit,
        action: 'Actualizar'
      }
    });
    /*     dialog.afterClosed().subscribe((formValue) => {
          if (formValue) {
            this.dataSource.data = this.dataSource.data.map(
              (selectedInscription) => selectedInscription.id === dataToEdit.id
                ? ({ ...selectedInscription, ...formValue })
                : selectedInscription
            );
          }
        }) */
  }

  deleteInscription(id: number): void {
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

        this.store.dispatch(InscriptionsActions.deleteInscriptions({ id }));

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La Inscripción ' + ' fue eliminado',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1800,
        })
      }
    });
  }

  detailInscription(inscriptionId: number): void {
    this._bottomSheet.open(InscriptionsDetailComponent, {
      data: inscriptionId
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
