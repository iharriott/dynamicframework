import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorsComponent } from './field-errors.component';



@NgModule({
  declarations: [
    FieldErrorsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FieldErrorsComponent
  ]
})
export class FieldErrorsModule { }
