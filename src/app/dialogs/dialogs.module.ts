import { DialogsService } from './dialogs.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterDialog } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    RegisterDialog
  ],
  declarations: [
    RegisterDialog
  ],
  providers: [
    DialogsService,
  ],
  entryComponents: [
    RegisterDialog
  ],
})
export class DialogsModule { }
