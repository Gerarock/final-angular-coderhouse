import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IClasse } from 'src/app/core/models/classes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private classes$ = new BehaviorSubject<IClasse[]>([])

  constructor(
    private httpClient: HttpClient
  ) { }

  getClasses(): Observable<IClasse[]> {
    return this.classes$.asObservable();
  }

  getClassesById(id: number): Observable<IClasse> {
    return this.classes$.asObservable()
      .pipe(
        map((classesMap) => classesMap.find((a) => a.id === id))
      )
  }

  getApiClasses(): void {
    this.httpClient.get<IClasse[]>(`${environment.apiBaseUrl}/clases`)
      .subscribe({
        next: (classe) => {
          this.classes$.next(classe);
        }
      })
  }
}
