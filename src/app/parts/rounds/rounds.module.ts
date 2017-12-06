import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoundsComponent } from './rounds.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule
  ],
  exports: [RoundsComponent],
  declarations: [RoundsComponent]
})
export class RoundsModule { }
