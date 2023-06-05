import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";
import { EliminarUsuarioAutenticado, EstablecerUsuarioAutenticado } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
    authUser: User | null;
    token: string | null;
}

const initialState: AuthState = {
    authUser: null,
    token: localStorage.getItem('token') || null
}

export const authReducer = createReducer(
    initialState,

    on(EstablecerUsuarioAutenticado, (currentState, { payload }) => {
        return {
            authUser: payload,
            token: payload.token
        }
    }),

    on(EliminarUsuarioAutenticado, (currentState) => {
        return {
            authUser: null,
            token: null
        }
    })
);