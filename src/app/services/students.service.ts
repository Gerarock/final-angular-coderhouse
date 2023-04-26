import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStudent } from '../interfaces/student';
import { MOCK_DATA } from '../mock/students-mock';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    private estudiantes$ = new BehaviorSubject<IStudent[]>(MOCK_DATA)

    constructor() { }


}
