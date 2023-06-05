import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map } from 'rxjs';
import { ICreateInscriptionData, IInscription, IInscriptionWhitAll } from 'src/app/core/models/inscription';
import { environment } from 'src/environments/environment';
import { State } from '../store/inscriptions.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private inscriptions$ = new BehaviorSubject<IInscription[]>([])

  constructor(
    private httpClient: HttpClient,
    private store: Store<State>
  ) { }

  getInscriptions(): Observable<IInscription[]> {
    return this.inscriptions$.asObservable();
  }

  getInscriptionsById(id: number): Observable<IInscription> {
    return this.inscriptions$.asObservable()
      .pipe(
        map((inscriptionsMap) => inscriptionsMap.find((a) => a.id === id))
      )
  }

  getApiInscriptions(): void {
    this.httpClient.get<IInscription[]>(`${environment.apiBaseUrl}/inscriptions`)
      .subscribe({
        next: (inscription) => {
          this.inscriptions$.next(inscription);
        }
      })
  }

  getAllInscription(): Observable<IInscriptionWhitAll[]> {
    return this.httpClient.get<IInscriptionWhitAll[]>(`${environment.apiBaseUrl}/inscriptions?_expand=course&_expand=student&_expand=subject`)
  }

  createInscription(data: ICreateInscriptionData): Observable<IInscriptionWhitAll> {
    return this.httpClient
      .post<IInscription>(`${environment.apiBaseUrl}/inscriptions`, data)
      .pipe(
        concatMap((createResponse) =>
          this.getInscriptionWithAllById(createResponse.id)
        )
      );
  }

  getInscriptionWithAllById(id: number): Observable<IInscriptionWhitAll> {
    return this.httpClient.get<IInscriptionWhitAll>(
      `${environment.apiBaseUrl}/inscriptions/${id}?_expand=student&_expand=subject&_expand=course`
    )
  }

  deleteInscriptionById(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `${environment.apiBaseUrl}/inscriptions/${id}`
    );
  }

  filterInscriptionByCourse(courseId: number, subjectId: number) {
    return this.httpClient.get<IInscriptionWhitAll>(
      `${environment.apiBaseUrl}/students/?_embed=inscriptions&inscriptions.courseId=${courseId}&inscriptions.subjectId=${subjectId}`
    )
  }

}
