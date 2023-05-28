import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { IInscriptionWhitAll } from 'src/app/core/models/inscription';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  loading: boolean,
  inscripciones: IInscriptionWhitAll[],
  error: unknown
}

export const initialState: State = {
  loading: false,
  inscripciones: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, state => state),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => state),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => state),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

