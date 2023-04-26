import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMaintainerComponent } from './student-maintainer.component';

describe('StudentMaintainerComponent', () => {
  let component: StudentMaintainerComponent;
  let fixture: ComponentFixture<StudentMaintainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMaintainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMaintainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
