import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IInscription } from 'src/app/core/models/inscription';
import { InscriptionsService } from '../../services/inscriptions.service';

@Component({
  selector: 'app-inscriptions-detail',
  templateUrl: './inscriptions-detail.component.html',
  styleUrls: ['./inscriptions-detail.component.scss']
})
export class InscriptionsDetailComponent implements OnDestroy {

  public inscription: IInscription | undefined;
  private destroyed$ = new Subject()

  constructor(
    private activatedRoute: ActivatedRoute,
    private inscriptionsService: InscriptionsService
  ) {
    this.inscriptionsService.getInscriptionsById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscription) => this.inscription = inscription);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
