import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';

import { MaterialModule } from '../../material.module';

import { LoginModule } from '../../parts/login/login.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    LoginModule,
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
