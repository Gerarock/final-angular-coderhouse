import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscriptions-create',
  templateUrl: './inscriptions-create.component.html',
  styleUrls: ['./inscriptions-create.component.scss']
})
export class InscriptionsCreateComponent {

  public titleActionForm: string;
  inscriptionControl = new FormControl('', [Validators.required]);
  teacherControl = new FormControl('', [Validators.required]);
  studentControl = new FormControl('', [Validators.required]);
  scheduleControl = new FormControl('', [Validators.required]);

  inscriptionForm = new FormGroup({
    inscripcion: this.inscriptionControl,
    profesor: this.teacherControl,
    alumno: this.studentControl,
    horario: this.scheduleControl
  });

  constructor(
    private dialogRef: MatDialogRef<InscriptionsCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    if (data) {
      this.inscriptionControl.setValue(data.value.inscripcion);
      this.teacherControl.setValue(data.value.profesor);
      this.studentControl.setValue(data.value.alumno);
      this.scheduleControl.setValue(data.value.horario);
    }
    this.titleActionForm = data.action;
  }

  editInscription(): void {
    if (this.inscriptionForm.valid) {
      this.dialogRef.close(this.inscriptionForm.value)
    } else {
      this.inscriptionForm.markAllAsTouched();
    }
  }

}
