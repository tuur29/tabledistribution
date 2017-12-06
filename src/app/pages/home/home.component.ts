import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-home',
  template: `

    <mat-expansion-panel class="card"
      [expanded]="!hideExplanation"
      (opened)="hideExplanation=false"
      (closed)="hideExplanation=true">

      <mat-expansion-panel-header>
        <mat-panel-title>
          
          <ng-container *ngIf="!globals.auth.token;else loggedin">
            <h1>Login</h1>
          </ng-container>
          <ng-template #loggedin>
            <h1>Explanation</h1>
          </ng-template>

        </mat-panel-title>
      </mat-expansion-panel-header>

      <p>Participants with letters under each other (same column) will never sit at the same table.</p>
      <p>More coming soon...</p>
      <!-- <app-login></app-login> -->

    </mat-expansion-panel>

    <div class="cardsgrid"
      [style.max-width]="!generated ? '600px' : ''"
      [style.margin]="!generated ? '0 auto' : ''">

      <mat-card *ngIf="globals.auth.token">
        <app-inputtable (onGenerateTable)="onGenerateTable($event)"></app-inputtable>
      </mat-card>

      <mat-card *ngIf="globals.auth.token" [style.display]="generated ? 'block' : 'none'">
        <app-rounds #rounds></app-rounds>
      </mat-card>

      <mat-card *ngIf="globals.auth.token" [style.display]="generated ? 'block' : 'none'">
        <app-nameslist #nameslist></app-nameslist>
      </mat-card>

    </div>

  `,
  styles: [`

    mat-card, .card {
      margin: 10px;
    }

    @media (min-width: 650px) {
      .cardsgrid {
        display: flex;
        flex-flow: row wrap;
        align-items: start;
      }

      .cardsgrid > * {
        flex: 1 1 300px;
      }
    }

    .mat-expansion-panel {
      max-width: 600px;
      margin: 10px auto;
    }
    
    .mat-expansion-panel-header-title h1 {
      margin: 0;
    }

    mat-expansion-panel-header {
      min-height: 64px !important;
    }

    :host ::ng-deep .mat-expansion-indicator::after {
      margin-top: -5px !important;
    }

  `]
})
export class HomeComponent implements OnInit {

  title: string;
  generated = false;
  @ViewChild('rounds') rounds;
  @ViewChild('nameslist') nameslist;

  @LocalStorage() hideExplanation = false;

  constructor(
    public globals: GlobalsService
  ) {}

  ngOnInit() {
    this.title = window.document.title;
  }

  onGenerateTable(table: any) {
    this.generated = true;
    table = table
      .map((g, i) => g
        .filter((name) => name!=null && name!='')
        .map((name) => name + ' ('+this.globals.letters[i]+')')
      );

    this.nameslist.updateTable(table);
    this.rounds.updateTable(
      this.getCombinations(table),
      this.getCombinations(this.globals.letters.slice(0, table.length))
    );
  }

  // TODO: replace hardcoded with programatic solution
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

    }

  }

  // Calculate more:
  // function alphabetPosition(text) {
  //   return text.toLowerCase().split('')
  //     .filter( c => c >= 'a' & c <= 'z' )
  //     .map( c => c.charCodeAt(0) - 'a'.charCodeAt(0))
  //     .join(' ');
  // }
  // console.log(alphabetPosition(`
  //   {{A,B,C},{D,E,F},{G,H,I}}, 
  //   {{A,E,I},{B,F,G},{C,D,H}}, 
  //   {{A,F,H},{B,D,I},{C,E,G}}, 
  //   {{A,D,G},{B,E,H},{C,F,I}}.
  // `));

}
