import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionsDetailComponent } from './inscriptions-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('InscriptionsDetailComponent', () => {
  let component: InscriptionsDetailComponent;
  let fixture: ComponentFixture<InscriptionsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [InscriptionsDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InscriptionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
