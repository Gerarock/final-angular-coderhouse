import { createFeatureSelector } from '@ngrx/store';
import * as fromInscriptions from './courses.reducer';

export const selectInscriptionsState = createFeatureSelector<fromInscriptions.State>(
  fromInscriptions.inscriptionsFeatureKey
);