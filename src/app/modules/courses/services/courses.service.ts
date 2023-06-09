import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ICourse, ICourseWhitSubject } from 'src/app/core/models/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses$ = new BehaviorSubject<ICourse[]>([])

  constructor(
    private httpClient: HttpClient
  ) { }

  getCourses(): Observable<ICourse[]> {
    return this.courses$.asObservable();
  }

  getCoursesById(id: number): Observable<ICourse> {
    return this.courses$.asObservable()
      .pipe(
        map((coursesMap) => coursesMap.find((a) => a.id === id))
      )
  }

  getApiCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${environment.apiBaseUrl}/courses`);
  }

  getApiCoursesWhitSubject(): Observable<ICourseWhitSubject[]> {
    return this.httpClient.get<ICourseWhitSubject[]>(`${environment.apiBaseUrl}/courses?_expand=subject`);
  }

}
