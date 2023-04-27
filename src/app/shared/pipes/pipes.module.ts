import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { ErrorMessagesPipe } from './error-messages.pipe';

@NgModule({
  declarations: [
    FullNamePipe,
    ErrorMessagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    ErrorMessagesPipe
  ]
})
export class PipesModule { }
