import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { LoginModule } from '../../parts/login/login.module';
import { ExplanationModule } from '../../parts/explanation/explanation.module';
import { InputTableModule } from '../../parts/inputtable/inputtable.module';
import { RoundsModule } from '../../parts/rounds/rounds.module';
import { NamesListModule } from '../../parts/nameslist/nameslist.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    MaterialModule,

    ExplanationModule,
    InputTableModule,
    RoundsModule,
    NamesListModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
