import { ICourse } from "./course";
import { IStudent } from "./student";
import { ISubject } from "./subject";

export interface IInscription {
    id: number;
    subjectId: number;
    studentId: number;
    courseId: number;
}

export interface IInscriptionWhitStudent extends IInscription {
    student?: IStudent;
}

export interface IInscriptionWhitSubject extends IInscription {
    subject?: ISubject;
}

export interface IInscriptionWhitCourse extends IInscription {
    course?: ICourse;
}

export interface ICreateInscriptionData {
    subjectId: number;
    studentId: number;
    courseId: number;
}

export type IInscriptionWhitAll = IInscriptionWhitStudent & IInscriptionWhitSubject & IInscriptionWhitCourse;