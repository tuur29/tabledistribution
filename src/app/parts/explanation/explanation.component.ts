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

      <p>Participants with letters under each other (same column) will never sit at the same table.</p>
      <p>More coming soon...</p>
      <!-- <app-login></app-login> -->

    </mat-expansion-panel>

  `,
  styles: [`

    mat-expansion-panel {
      max-width: 600px;
      margin: 10px auto;
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
