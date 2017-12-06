import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-rounds',
  template: `

    <h1>Table division per round</h1>

    <div *ngFor="let perm of permutations; let i = index">

      <h2>Round {{i+1}}</h2>
      <span>{{ letters[i].join(', ') }}</span>
      <ul *ngFor="let tables of perm">
        <ng-container *ngFor="let names of tables">
          <li *ngFor="let name of names" [style.display]="name?'':'none'">{{name}}</li>
        </ng-container>
      </ul>

    </div>

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

  `]
})
export class RoundsComponent implements OnInit {

  permutations: any[];
  letters: any[];

  constructor() {}
  ngOnInit() {}

  updateTable(permutations: any[], letters: any[]) {
    this.letters = letters.map( (g) => g.map((l)=> l.join('')) );
    this.permutations = permutations;
  }
}
