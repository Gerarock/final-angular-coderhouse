import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassesDetailComponent } from './classes-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClassesDetailComponent', () => {
  let component: ClassesDetailComponent;
  let fixture: ComponentFixture<ClassesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ClassesDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
