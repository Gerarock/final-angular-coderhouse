import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent {

  public titleActionForm: string;

  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);

  studentsForm = new FormGroup({
    nombre: this.nameControl,
    apellido: this.lastNameControl,
  });

  constructor(
    private dialogRef: MatDialogRef<StudentCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    debugger
    if (data) {
      this.nameControl.setValue(data.value.nombre);
      this.lastNameControl.setValue(data.value.apellido);
    }
    this.titleActionForm = data.action;
  }

  editStudent(): void {
    if (this.studentsForm.valid) {
      this.dialogRef.close(this.studentsForm.value)
    } else {
      this.studentsForm.markAllAsTouched();
    }
  }

}
