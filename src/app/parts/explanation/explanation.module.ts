import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExplanationComponent } from './explanation.component';

import { LoginModule } from '../login/login.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    MaterialModule
  ],
  exports: [ExplanationComponent],
  declarations: [ExplanationComponent]
})
export class ExplanationModule { }
