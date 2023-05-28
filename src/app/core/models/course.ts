import { ISubject } from "./subject";
export interface ICourse {
    id: number;
    subjectId: number;
    fecha_fin: Date;
    fecha_inicio: Date;
}
export interface ICourseWhitSubject extends ICourse {
    subject: ISubject;
}