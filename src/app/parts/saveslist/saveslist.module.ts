import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SavesListComponent } from './saveslist.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule
  ],
  exports: [SavesListComponent],
  declarations: [SavesListComponent]
})
export class SavesListModule { }
