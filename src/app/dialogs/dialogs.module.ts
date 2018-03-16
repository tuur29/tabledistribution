import { DialogsService } from './dialogs.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { SaveNameDialog } from './savename.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    SaveNameDialog
  ],
  declarations: [
    SaveNameDialog
  ],
  providers: [
    DialogsService,
  ],
  entryComponents: [
    SaveNameDialog
  ],
})
export class DialogsModule { }
