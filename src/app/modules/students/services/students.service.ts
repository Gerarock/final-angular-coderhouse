import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IStudent } from '../../../core/models/student';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    private alumns$ = new BehaviorSubject<IStudent[]>([])

    constructor(
        private httpClient: HttpClient
    ) { }

    getAlumns(): Observable<IStudent[]> {
        return this.alumns$.asObservable();
    }

    getAlumnsById(id: number): Observable<IStudent> {
        return this.alumns$.asObservable()
            .pipe(
                map((alumnsMap) => alumnsMap.find((a) => a.id === id))
            )
    }

    getApiAlumns(): void {
        this.httpClient.get<IStudent[]>(`${environment.apiBaseUrl}/alumnos`)
            .subscribe({
                next: (alumns) => {
                    this.alumns$.next(alumns);
                }
            })
    }
}
