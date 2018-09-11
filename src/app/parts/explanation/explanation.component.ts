import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-explanation',
  template: `

    <mat-expansion-panel
      [expanded]="!hide"
      (opened)="hide=false"
      (closed)="hide=true">

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

      <p>This tool was made to easily spread participants across a number of tables during a number of rounds so that everybody only meets eachother the least possible times.</p>
      <ol>
        <li>Start by selecting the size of the grid. If you have a larger amount of tables than rounds select the amount of tables and ignore the other rounds.<br>If you have more tables than rounds you will have to assign the letters of the extra tables to the rounds yourself.</li>
        <li>Spread the names of all participants across all letters as much as possible.
          <br>Participants with the same letter will always be seated together.
          <br>Participants with letters in the same column will never sit at the same table.</li>
        <li>At the start of the event you announce everyone's letter.</li>
        <li>Each round you tell everyone which letters are seated at which physical table.</li>
      </ol>
      <!-- <app-login></app-login> -->

    </mat-expansion-panel>

  `,
  styles: [`

    mat-expansion-panel {
      max-width: 600px;
      margin: 10px auto;
    }

    ol {
      padding-left: 15px;
    }

    li {
      margin: 10px 0;
    }

  `]
})
export class ExplanationComponent implements OnInit {

  @LocalStorage("hideExplanation") hide = false;

  constructor(public globals: GlobalsService) {
  }

  ngOnInit() {
  }

}
