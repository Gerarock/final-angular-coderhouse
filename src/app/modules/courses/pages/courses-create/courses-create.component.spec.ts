import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCreateComponent } from './courses-create.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('CoursesCreateComponent', () => {
  let component: CoursesCreateComponent;
  let fixture: ComponentFixture<CoursesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesCreateComponent],
      imports: [MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
