import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsUpdateComponent } from './inscriptions-update.component';

describe('InscriptionsUpdateComponent', () => {
  let component: InscriptionsUpdateComponent;
  let fixture: ComponentFixture<InscriptionsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
