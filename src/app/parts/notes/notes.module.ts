import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotesComponent } from './notes.component';

import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule,
    FormsModule
  ],
  exports: [NotesComponent],
  declarations: [NotesComponent]
})
export class NotesModule { }
