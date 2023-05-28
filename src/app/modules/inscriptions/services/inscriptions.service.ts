import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IInscription, IInscriptionWhitAll } from 'src/app/core/models/inscription';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private inscriptions$ = new BehaviorSubject<IInscription[]>([])

  constructor(
    private httpClient: HttpClient
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

  getApiInscriptionsWhitAll(): void {
    this.httpClient.get<IInscriptionWhitAll[]>(`${environment.apiBaseUrl}/inscriptions?_expand=course&_expand=student&_expand=subject`)
      .subscribe({
        next: (inscription) => {
          this.inscriptions$.next(inscription);
        }
      })
  }
}
