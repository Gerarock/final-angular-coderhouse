import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";

export const EstablecerUsuarioAutenticado = createAction(
    '[auth] Establecer usuario',
    props<{ payload: User & { token: string } }>()
);

export const EliminarUsuarioAutenticado = createAction(
    '[auth] Eliminar usuario'
);