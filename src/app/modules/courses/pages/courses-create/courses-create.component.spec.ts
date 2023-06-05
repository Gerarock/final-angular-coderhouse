import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesCreateComponent } from './courses-create.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

describe('CoursesCreateComponent', () => {
  let component: CoursesCreateComponent;
  let fixture: ComponentFixture<CoursesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CoursesCreateComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia cerrar el dialog si el formulario es valido', () => {
    const dialogRefSpy = spyOn(
      (component as any).dialogRef,
      'close'
    ).and.callThrough();

    component.courseForm.setValue({
      nombre: 'Test Course',
      codigo: 'C001',
      horario: 'Monday, 9 AM',
      profesor: 'test'
    });

    component.editCourse();

    expect(dialogRefSpy).toHaveBeenCalledWith({
      nombre: 'Test Course',
      codigo: 'C001',
      horario: 'Monday, 9 AM',
      profesor: 'test'
    });
  });
});
