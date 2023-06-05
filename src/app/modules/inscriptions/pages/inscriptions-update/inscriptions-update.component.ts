import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ICourse, ICourseWhitSubject } from 'src/app/core/models/course';
import { IStudent } from 'src/app/core/models/student';
import { StudentsService } from 'src/app/modules/students/services/students.service';
import { InscriptionsCreateComponent } from '../inscriptions-create/inscriptions-create.component';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { Store } from '@ngrx/store';
import { ICreateInscriptionData } from 'src/app/core/models/inscription';
import { InscriptionsActions } from '../../store/inscriptions.actions';

@Component({
  selector: 'app-inscriptions-update',
  templateUrl: './inscriptions-update.component.html',
  styleUrls: ['./inscriptions-update.component.scss']
})
export class InscriptionsUpdateComponent implements OnInit, OnDestroy {

  public studentsData: IStudent[] = [];
  public coursesData: ICourseWhitSubject[] = [];
  public titleActionForm: string;

  //Emite una notificación cuando el componente se destruye
  destroyed$ = new Subject<void>()

  selectedCoursecontrol = new FormControl<ICourse | null>(null);
  studentIdControl = new FormControl<number | null>(null, [Validators.required]);
  subjectIdControl = new FormControl<number | null>(null, [Validators.required]);
  courseIdControl = new FormControl<number | null>(null, [Validators.required]);

  inscriptionForm = new FormGroup({
    studentId: this.studentIdControl,
    subjectId: this.subjectIdControl,
    courseId: this.courseIdControl
  });

  constructor(
    private dialogRef: MatDialogRef<InscriptionsCreateComponent>,
    private studentService: StudentsService,
    private courseService: CoursesService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    //Escucha los cambios del control option
    //Cuando se selecciona un Curso con 'selectedCoursecontrol' se pisa el valor de los elementos del objeto
    this.selectedCoursecontrol.valueChanges
      .pipe(takeUntil(this.destroyed$)) //Escucha valores hasta que el componente este destruido
      .subscribe({
        next: (course) => {
          if (course) {
            this.subjectIdControl.setValue(course.subjectId);
            this.courseIdControl.setValue(course.id);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(); //Avisa que se destruyo el componente
    this.destroyed$.complete(); //Completa el Observable
  }

  ngOnInit(): void {
    console.log(this.data.value)
    if (this.data.value) {
      this.titleActionForm = this.data.action;
      this.studentIdControl.setValue(this.data.value.studentId);
      this.subjectIdControl.setValue(this.data.value.subjectId);
      this.courseIdControl.setValue(this.data.value.courseId);
    } else {
      this.titleActionForm = this.data.action;

      this.studentService.getApiAlumns()
        .subscribe({
          next: (res) => {
            this.studentsData = res;
          }
        });

      this.courseService.getApiCoursesWhitSubject()
        .subscribe({
          next: (res) => {
            this.coursesData = res;
          }
        });
    }
  }

  onAccept(): void {
    if (this.inscriptionForm.valid) {
      this.store.dispatch(
        InscriptionsActions.createInscriptions({
          data: this.inscriptionForm.value as ICreateInscriptionData
        })
      );
      this.dialogRef.close();
    } else {
      this.inscriptionForm.markAllAsTouched();
    }
  }

}
