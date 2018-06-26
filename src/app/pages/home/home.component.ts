import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { SavesService } from 'app/services/saves.service';

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

  constructor(
    public globals: GlobalsService,
    public saves: SavesService
  ) { }

  ngOnInit() {
    this.globals.drawer = this.drawer;

    this.saves.onLoad().subscribe((data) => {
      this.inputtable.loadTable(data[0]);
      this.notes.setNotes(data[1])
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
    if (this.rounds)
      this.rounds.updateTable(
        this.getCombinations(newtable),
        this.getCombinations(this.globals.letters.slice(0, newtable.length))
      );
  }

  save() {
    this.saves.newSave(this.currenttable, this.notes.getNotes());
  }

  private getCombinations(arr: any[]): any[] {

    switch (Math.sqrt(arr.length)) {

      case 2: 
        return [
          [
            [arr[0], arr[1]],
            [arr[2], arr[3]]
          ],
          [
            [arr[0], arr[3]],
            [arr[2], arr[1]]
          ]
        ];

      case 3: 
        return [
          [
            [arr[0], arr[1], arr[2]],
            [arr[3], arr[4], arr[5]],
            [arr[6], arr[7], arr[8]]
          ],
          [
            [arr[0], arr[4], arr[8]],
            [arr[1], arr[5], arr[6]],
            [arr[2], arr[3], arr[7]]
          ],
          [
            [arr[0], arr[5], arr[7]],
            [arr[1], arr[3], arr[8]],
            [arr[2], arr[4], arr[6]]
          ]
        ];

      case 4: 
        return [
          [
            [arr[0], arr[1], arr[2], arr[3]],
            [arr[4], arr[5], arr[6], arr[7]],
            [arr[8], arr[9], arr[10], arr[11]],
            [arr[12], arr[13], arr[14], arr[15]]
          ],
          [
            [arr[0], arr[5], arr[10], arr[15]],
            [arr[1], arr[4], arr[11], arr[14]],
            [arr[2], arr[7], arr[8], arr[13]],
            [arr[3], arr[9], arr[6], arr[12]]
          ],
          [
            [arr[0], arr[7], arr[9], arr[14]],
            [arr[1], arr[6], arr[8], arr[15]],
            [arr[2], arr[5], arr[12], arr[11]],
            [arr[3], arr[4], arr[10], arr[13]]
          ],
          [
            [arr[0], arr[6], arr[11], arr[13]],
            [arr[1], arr[7], arr[10], arr[12]],
            [arr[2], arr[4], arr[9], arr[15]],
            [arr[3], arr[5], arr[8], arr[14]]
          ]
        ];

      case 5: 
      return [
        [
          [arr[0], arr[1], arr[2], arr[3], arr[4]],
          [arr[5], arr[6], arr[7], arr[8], arr[9]],
          [arr[10], arr[11], arr[12], arr[13], arr[14]],
          [arr[15], arr[16], arr[17], arr[18], arr[19]],
          [arr[20], arr[21], arr[22], arr[23], arr[24]]
        ],
        [
          [arr[0], arr[6], arr[12], arr[18], arr[24]],
          [arr[1], arr[7], arr[13], arr[19], arr[20]],
          [arr[2], arr[8], arr[14], arr[15], arr[21]],
          [arr[3], arr[9], arr[10], arr[16], arr[22]],
          [arr[4], arr[5], arr[11], arr[17], arr[23]]
        ],
        [
          [arr[0], arr[11], arr[22], arr[8], arr[19]],
          [arr[5], arr[16], arr[2], arr[13], arr[24]],
          [arr[10], arr[21], arr[7], arr[18], arr[4]],
          [arr[15], arr[1], arr[12], arr[23], arr[9]],
          [arr[20], arr[6], arr[17], arr[3], arr[14]]
        ],
        [
          [arr[0], arr[16], arr[7], arr[23], arr[14]],
          [arr[5], arr[21], arr[12], arr[3], arr[19]],
          [arr[10], arr[1], arr[17], arr[8], arr[24]],
          [arr[15], arr[6], arr[22], arr[13], arr[4]],
          [arr[20], arr[11], arr[2], arr[18], arr[9]]
        ],
        [
          [arr[0], arr[21], arr[17], arr[13], arr[9]],
          [arr[5], arr[1], arr[22], arr[18], arr[14]],
          [arr[10], arr[6], arr[2], arr[23], arr[19]],
          [arr[15], arr[11], arr[7], arr[3], arr[24]],
          [arr[20], arr[16], arr[12], arr[8], arr[4]]
        ]
      ];

    }

  }

}
