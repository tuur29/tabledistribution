import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputTableComponent } from './inputtable.component';

import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [InputTableComponent],
  declarations: [InputTableComponent]
})
export class InputTableModule { }
