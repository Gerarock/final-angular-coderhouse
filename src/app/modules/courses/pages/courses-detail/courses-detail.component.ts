import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ICourse } from 'src/app/core/models/course';
import { StudentsService } from 'src/app/modules/students/services/students.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnDestroy {

  public course: ICourse | undefined;
  private destroyed$ = new Subject()

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) {
    this.coursesService.getCoursesById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((course) => this.course = course);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
