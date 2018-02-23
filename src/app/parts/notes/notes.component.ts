import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalStorage } from 'ngx-store';


@Component({
  selector: 'app-notes',
  template: `

    <mat-expansion-panel
      [expanded]="!hide"
      (opened)="hide=false"
      (closed)="hide=true">

      <mat-expansion-panel-header>
        <mat-panel-title>
          <h1>Notes</h1>
        </mat-panel-title>
      </mat-expansion-panel-header>

      <mat-form-field>
        <textarea [(ngModel)]="notes" matInput matTextareaAutosize matAutosizeMinRows="4" matAutosizeMaxRows="27"></textarea>
      </mat-form-field>

      </mat-expansion-panel>

  `,
  styles: [`

    mat-form-field {
      width: 100%;
    }

  `]
})
export class NotesComponent implements OnInit {

  @LocalStorage("hideNotes") hide = true;
  @LocalStorage("notes") notes = "";

  constructor() {}

  ngOnInit() {}

}
