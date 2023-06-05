import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InscriptionsCreateComponent } from './pages/inscriptions-create/inscriptions-create.component';
import { InscriptionsDetailComponent } from './pages/inscriptions-detail/inscriptions-detail.component';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { InscriptionsListComponent } from './pages/inscriptions-list/inscriptions-list.component';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { MatSelectModule } from '@angular/material/select';
import { InscriptionsUpdateComponent } from './pages/inscriptions-update/inscriptions-update.component';

@NgModule({
  declarations: [
    InscriptionsCreateComponent,
    InscriptionsDetailComponent,
    InscriptionsListComponent,
    InscriptionsUpdateComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatListModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects])
  ],
  exports: [
    InscriptionsCreateComponent,
    InscriptionsDetailComponent,
    InscriptionsListComponent
  ]
})
export class InscriptionsModule { }
