import { DialogsService } from './dialogs.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { SaveNameDialog } from './savename.component';
import { ConfirmDialog } from './confirm.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    SaveNameDialog,
    ConfirmDialog
  ],
  declarations: [
    SaveNameDialog,
    ConfirmDialog
  ],
  providers: [
    DialogsService,
  ],
  entryComponents: [
    SaveNameDialog,
    ConfirmDialog
  ],
})
export class DialogsModule { }
