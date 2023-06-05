import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateInscriptionData, IInscriptionWhitAll } from 'src/app/core/models/inscription';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: IInscriptionWhitAll[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),
    'Create Inscriptions': props<{ data: ICreateInscriptionData }>(),
    'Create Inscriptions Success': props<{ data: IInscriptionWhitAll }>(),
    'Create Inscriptions Failure': props<{ error: unknown }>(),
    'Delete Inscriptions': props<{ id: number }>(),
    'Delete Inscriptions Success': props<{ data: number }>(),
    'Delete Inscriptions Failure': props<{ error: unknown }>()
  }
});
