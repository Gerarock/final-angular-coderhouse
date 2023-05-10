import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-classes-create',
  templateUrl: './classes-create.component.html',
  styleUrls: ['./classes-create.component.scss']
})
export class ClassesCreateComponent {

  public titleActionForm: string;
  classeControl = new FormControl('', [Validators.required]);
  teacherControl = new FormControl('', [Validators.required]);
  studentControl = new FormControl('', [Validators.required]);
  scheduleControl = new FormControl('', [Validators.required]);

  classeForm = new FormGroup({
    clase: this.classeControl,
    profesor: this.teacherControl,
    alumno: this.studentControl,
    horario: this.scheduleControl
  });

  constructor(
    private dialogRef: MatDialogRef<ClassesCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    if (data) {
      this.classeControl.setValue(data.value.clase);
      this.teacherControl.setValue(data.value.profesor);
      this.studentControl.setValue(data.value.alumno);
      this.scheduleControl.setValue(data.value.horario);
    }
    this.titleActionForm = data.action;
  }

  editClasse(): void {
    if (this.classeForm.valid) {
      this.dialogRef.close(this.classeForm.value)
    } else {
      this.classeForm.markAllAsTouched();
    }
  }

}
