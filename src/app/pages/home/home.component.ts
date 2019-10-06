import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { SavesService } from 'app/services/saves.service';
import { getCombinations } from './combinations';

@Component({
  selector: 'app-home',
  template: `

    <mat-drawer-container>

      <mat-drawer #drawer mode="over" position="end">
        <h2>
          Saved
          <button mat-icon-button (click)="save()" class="float-right">
            <mat-icon>save</mat-icon>
          </button>
        </h2>
        <app-saveslist></app-saveslist>
      </mat-drawer>

      <div class="container">
        <app-explanation></app-explanation>

        <div class="cardsgrid">

          <div *ngIf="globals.auth.token">
            <app-inputtable #inputtable (onGenerateTable)="onGenerateTable($event)"></app-inputtable>
          </div>

          <div *ngIf="globals.auth.token" [style.display]="(generated ? 'block' : 'none')">
            <app-rounds #rounds></app-rounds>
            <app-customrounds #customrounds></app-customrounds>
          </div>

          <mat-accordion *ngIf="globals.auth.token" class="small" [style.display]="(generated ? 'block' : 'none')">

            <app-nameslist #nameslist></app-nameslist>
            &nbsp;
            <app-notes #notes></app-notes>

          </mat-accordion>

        </div>
      </div>

    </mat-drawer-container>

  `,
  styles: [`

    @media (min-width: 650px) {
      .cardsgrid {
        display: flex;
        flex-flow: row wrap;
        align-items: start;
        justify-content: center;
      }

      .cardsgrid > * {
        flex: 0 1 400px;
        padding: 10px;
      }

      .small {
        max-width: 450px;
      }
    }

    mat-drawer-container {
      min-height: calc( 100vh - 64px);
    }

    @media (max-width: 600px) {
      mat-drawer-container {
        min-height: calc( 100vh - 56px);
      }
    }

    mat-drawer {
      width: 300px;
    }

    mat-drawer h2 {
      padding: 10px 10px 0 10px;
      margin-bottom: 0;
    }

    mat-drawer h2 button {
      margin-top: -5px;
    }

    .cardsgrid > *, .accordion > * {
      margin: 10px 0;
    }
     
    :host ::ng-deep mat-expansion-panel-header {
      min-height: 64px !important;
    }

    :host ::ng-deep mat-panel-title h1 {
      margin: 0;
    }

    :host ::ng-deep .mat-drawer-backdrop.mat-drawer-shown {
      background-color: rgba(0, 0, 0, 0.4);
    }

    :host ::ng-deep .mat-expansion-indicator {
      margin-top: -5px !important;
    }

  `]
})
export class HomeComponent implements OnInit {

  generated = false;
  currenttable;
  @ViewChild('inputtable') inputtable;
  @ViewChild('rounds') rounds;
  @ViewChild('nameslist') nameslist;
  @ViewChild('drawer') drawer;
  @ViewChild('notes') notes;
  @ViewChild('customrounds') customrounds;

  constructor(
    public globals: GlobalsService,
    public saves: SavesService
  ) { }

  ngOnInit() {
    this.globals.drawer = this.drawer;

    this.saves.onLoad().subscribe((data) => {
      this.inputtable.loadTable(data[0]);
      this.notes.setNotes(data[1]);
    });
  }

  onGenerateTable(table: any) {
    this.currenttable = table;
    this.generated = true;

    let newtable = table
      .map((g, i) => g
        .filter((person) => person!=null && person.name!='')
        .map((person) => {
          person.data.letter = this.globals.letters[i];
          return person;
        })
      );

    if (this.nameslist)
      this.nameslist.updateTable(newtable);
    if (this.customrounds)
      this.customrounds.updateTable(newtable);
    if (this.rounds) {
      this.rounds.updateTable(
        getCombinations(newtable),
        getCombinations(this.globals.letters.slice(0, newtable.length))
      );
    }
  }

  save() {
    this.saves.newSave(this.currenttable, this.notes.getNotes());
  }

}
