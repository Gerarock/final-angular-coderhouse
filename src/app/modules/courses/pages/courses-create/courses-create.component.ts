import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-create',
  templateUrl: './courses-create.component.html',
  styleUrls: ['./courses-create.component.scss']
})
export class CoursesCreateComponent {

  public titleActionForm: string;
  nameControl = new FormControl('', [Validators.required]);
  codeControl = new FormControl('', [Validators.required]);
  scheduleControl = new FormControl('', [Validators.required]);
  teacherControl = new FormControl('', [Validators.required]);

  courseForm = new FormGroup({
    nombre: this.nameControl,
    codigo: this.codeControl,
    horario: this.scheduleControl,
    profesor: this.teacherControl
  });

  constructor(
    private dialogRef: MatDialogRef<CoursesCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    if (data) {
      this.nameControl.setValue(data.value.nombre);
      this.codeControl.setValue(data.value.codigo);
      this.scheduleControl.setValue(data.value.horario);
      this.teacherControl.setValue(data.value.profesor);
    }
    this.titleActionForm = data.action;
  }

  editCourse(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value)
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

}
