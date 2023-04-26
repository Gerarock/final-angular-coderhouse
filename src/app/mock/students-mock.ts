import { IStudent } from "../interfaces/student";

export const MOCK_DATA: IStudent[] = [
    { id: 1, nombre: 'Juan', apellido: 'Sosa', fecha_registro: new Date() },
    { id: 2, nombre: 'Miriam', apellido: 'Paez', fecha_registro: new Date() },
    { id: 3, nombre: 'Cynthia', apellido: 'Coronel', fecha_registro: new Date() }
];