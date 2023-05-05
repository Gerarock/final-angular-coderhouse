import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IStudent } from '../../../core/models/student';
import { MOCK_DATA } from '../../../mock/students-mock';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    private alumns$ = new BehaviorSubject<IStudent[]>(MOCK_DATA)

    constructor() { }

    getAlumns(): Observable<IStudent[]> {
        return this.alumns$.asObservable();
    }

    getAlumnsById(id: number): Observable<IStudent> {
        return this.alumns$.asObservable()
            .pipe(
                map((alumnsMap) => alumnsMap.find((a) => a.id === id))
            )
    }
}
