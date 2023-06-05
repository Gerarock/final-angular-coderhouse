import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscriptionsActions } from './courses.actions';
import { InscriptionsService } from '../services/inscriptions.service';

@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionsService.getAllInscription().pipe(
          map(data => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscriptions),
      concatMap(
        (action) =>
          this.inscriptionsService.createInscription(action.data)
            .pipe(
              map((res) => InscriptionsActions.createInscriptionsSuccess({ data: res })),
              catchError((error) => of(InscriptionsActions.createInscriptionsFailure({ error })))
            )
      )
    )
  });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscriptions),
      concatMap((action) =>
        this.inscriptionsService.deleteInscriptionById(action.id).pipe(
          map(data => InscriptionsActions.deleteInscriptionsSuccess({ data: action.id })),
          catchError(error => of(InscriptionsActions.deleteInscriptionsFailure({ error })))
        )
      )
    )
  })

  constructor(private actions$: Actions, private inscriptionsService: InscriptionsService) { }
}
