import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-rounds',
  template: `

  <mat-expansion-panel
      [expanded]="!hide"
      (opened)="hide=false"
      (closed)="hide=true">

      <mat-expansion-panel-header>
        <mat-panel-title>
          <h1>Preview</h1>
        </mat-panel-title>
      </mat-expansion-panel-header>

      <div *ngFor="let perm of permutations; let i = index">

        <h2>Round {{i+1}}</h2>
        <span>{{ letters[i].join(', ') }}</span>
        <ul *ngFor="let tables of perm">
          <ng-container *ngFor="let name of tables; let j = index">
            <li [style.display]="name?'':'none'">
              <small>{{j+1}}:</small> {{name}}
            </li>
          </ng-container>
        </ul>

      </div>

    </mat-expansion-panel>

  `,
  styles: [`

    div {
      display: inline-block;
      vertical-align: top;
      margin: 10px 10px;
    }

    div:not(:last-child) {
      padding-right: 20px;
      border-right: 1px solid black;
    }

    span {
      font-style: italic;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    ul:not(:last-child) {
      padding-bottom: 10px;
      border-bottom: 1px solid black;
    }

    small {
      opacity: 0.5;
    }

  `]
})
export class RoundsComponent implements OnInit {

  @LocalStorage("hideRounds") hide = false;

  permutations: any[];
  letters: any[];

  constructor() {}
  ngOnInit() {}

  updateTable(permutations: any[], letters: any[]) {
    if (!permutations || !letters) return;

    this.letters = letters.map( (g) => g.map((l)=> l.join('')) );
    let flattend = permutations.map((round) => {
      return round.map((table) => {
        return table.reduce((prev, curr) => {
          return prev.concat(curr);
        });
      });
    });
    this.permutations = flattend;
  }
}
