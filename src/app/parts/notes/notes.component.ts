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
          <button mat-icon-button (click)="clearNotes($event)">
            <mat-icon>delete</mat-icon>
          </button>
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

    .mat-icon-button {
      margin-top: -3px;
    }

  `]
})
export class NotesComponent implements OnInit {

  @LocalStorage("hideNotes") hide = true;
  @LocalStorage() notes = "";

  constructor() {}

  ngOnInit() {}

  clearNotes(event) {
    event.stopPropagation();
    this.notes = "";
  }

  getNotes() : string {
    return this.notes;
  }

  setNotes(notes: string) {
    this.notes = notes;
  }

}
