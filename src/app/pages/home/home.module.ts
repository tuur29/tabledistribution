import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { LoginModule } from '../../parts/login/login.module';
import { ExplanationModule } from '../../parts/explanation/explanation.module';
import { InputTableModule } from '../../parts/inputtable/inputtable.module';
import { RoundsModule } from '../../parts/rounds/rounds.module';
import { NamesListModule } from '../../parts/nameslist/nameslist.module';
import { NotesModule } from '../../parts/notes/notes.module';
import { SavesListModule } from '../../parts/saveslist/saveslist.module';

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
    NamesListModule,
    NotesModule,
    SavesListModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
