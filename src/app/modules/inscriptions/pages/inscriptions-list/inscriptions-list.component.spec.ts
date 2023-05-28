import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { InscriptionsRoutingModule } from '../../inscriptions-routing.module';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InscriptionsListComponent } from './inscriptions-list.component';

describe('InscriptionsListComponent', () => {
  let component: InscriptionsListComponent;
  let fixture: ComponentFixture<InscriptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        CommonModule,
        InscriptionsRoutingModule,
        PipesModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InscriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
