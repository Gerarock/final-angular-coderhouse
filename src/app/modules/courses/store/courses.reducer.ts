import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './courses.actions';
import { IInscriptionWhitAll } from 'src/app/core/models/inscription';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  loading: boolean,
  inscriptions: IInscriptionWhitAll[],
  error: unknown
}

export const initialState: State = {
  loading: false,
  inscriptions: [],
  error: null
};

export const reducer = createReducer<State>(
  initialState,

  //************** CARGA DATA ************//
  /** Cuando cargan las inscripciones cambiar el valor de loading a TRUE */
  on(InscriptionsActions.loadInscriptions, state => {
    return {
      ...state,
      loading: true
    }
  }),

  /** Cuando las inscripciones se cargan de forma correcta */
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      inscriptions: action.data
    }
  }),

  /** Cuando las inscripciones se cargan de forma incorrecta */
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  //**************** CREA REGISTRO ****************//
  on(InscriptionsActions.createInscriptions, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),

  on(InscriptionsActions.createInscriptionsSuccess, (state, action) => {
    const newInscription = action.data;
    return {
      ...state,
      loading: false,
      inscriptions: [...state.inscriptions, newInscription]
    }
  }),

  on(InscriptionsActions.createInscriptionsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  }),

  //*************** ELIMINA REGISTRO POR ID *****************//
  on(InscriptionsActions.deleteInscriptions, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(InscriptionsActions.deleteInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      inscriptions: state.inscriptions.filter((i) => i.id !== action.data),
      loading: false
    };
  }),

  on(InscriptionsActions.deleteInscriptionsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })

);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer
});

