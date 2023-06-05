import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IInscription, IInscriptionWhitAll } from 'src/app/core/models/inscription';
import { InscriptionsService } from '../../services/inscriptions.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-inscriptions-detail',
  templateUrl: './inscriptions-detail.component.html',
  styleUrls: ['./inscriptions-detail.component.scss']
})
export class InscriptionsDetailComponent implements OnDestroy {

  public inscription: IInscription | undefined;
  public inscriptionDetail: IInscriptionWhitAll
  private destroyed$ = new Subject()
  public inscriptionId: number;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number,
    private _bottomSheetRef: MatBottomSheetRef,
    private inscriptionsService: InscriptionsService
  ) {
    this.inscriptionsService.getInscriptionWithAllById(data)
      .subscribe({
        next: (res) => {
          this.inscriptionDetail = res;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  closeBottomSheet() {
    this._bottomSheetRef.dismiss();
  }
}
