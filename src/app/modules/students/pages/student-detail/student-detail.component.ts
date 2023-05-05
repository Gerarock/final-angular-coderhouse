import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IStudent } from 'src/app/core/models/student';
import { StudentsService } from 'src/app/modules/students/services/students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnDestroy {

  public student: IStudent | undefined;
  private destroyed$ = new Subject()

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentsService
  ) {
    this.studentService.getAlumnsById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((student) => this.student = student);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
