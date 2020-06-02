import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { MatSlider } from '@angular/material';

@Component({
  selector: 'app-rounds',
  template: `

  <mat-expansion-panel
      [expanded]="!hide"
      (opened)="hide=false"
      (closed)="hide=true"
      [style.minWidth]="minwidth +'px'"
      >

      <mat-expansion-panel-header>
        <mat-panel-title>
          <h1>Preview</h1>
        </mat-panel-title>
      </mat-expansion-panel-header>

      <div class="hideform">
        <span>Show number of rounds: </span>
        <mat-slider #roundsSlider thumbLabel color="primary" min="2" [max]="permutations?.length || 5" [value]="permutations?.length || 5" tickInterval="1"></mat-slider>
      </div>

      <div *ngFor="let perm of permutations; let i = index" class="round">
        <ng-container *ngIf="i < shownRoundsCount">

          <h2>Round {{i+1}}</h2>
          <span *ngIf="letters[i][0]">{{ letters[i].join(', ') }}</span>
          <ul *ngFor="let tables of perm">
            <ng-container *ngFor="let person of tables; let j = index">
              <li *ngIf="person?.name">
                <small>{{j+1}}:</small> <span [style.color]="person.data.color">{{person.name}} <span *ngIf="person.data.letter">({{person.data.letter}})</span></span>
              </li>
            </ng-container>
          </ul>

        </ng-container>
      </div>

    </mat-expansion-panel>

  `,
  styles: [`

    .round {
      display: inline-block;
      vertical-align: top;
      margin: 10px 10px;
      padding-right: 20px;
      border-right: 1px solid black;
    }

    span {
      font-style: italic;
    }

    ul {
      list-style: none;
      padding: 0;
      min-width: 141px;
    }

    ul:not(:last-child) {
      padding-bottom: 10px;
      border-bottom: 1px solid black;
    }

    .hideform {
      display: block;
      clear: both;
    }

    small {
      opacity: 0.5;
    }

    ::ng-deep .hideform .mat-slider-thumb-label {
      margin-top: 50px;
    }

  `]
})
export class RoundsComponent implements OnInit {

  @LocalStorage("hideRounds") hide = false;
  @ViewChild("roundsSlider") roundsSlider: MatSlider

  permutations: any[];
  letters: any[];
  minwidth: number;
  shownRoundsCount: number = 5;

  constructor() {}

  ngOnInit() {
    this.roundsSlider.change.subscribe(v => this.shownRoundsCount = v.value);
  }

  updateTable(permutations: any[], letters: any[]) {
    if (!permutations || !letters) return;
    this.letters = letters.map( (g) => g.map((l)=> l.sort().join('')) );
    let flattend = permutations.map((round) => {
      return round.map((table) => {
        return table.reduce((prev, curr) => {
          return prev.concat(curr);
        });
      });
    });

    if (flattend.length <= 3)
      this.minwidth = flattend.length*200;
    else if (flattend.length%2 != 0)
      this.minwidth = (flattend.length-1)*200 - flattend.length*30;
    else
      this.minwidth = flattend.length/2*200 + flattend.length*15;

    this.permutations = flattend;
    this.shownRoundsCount = flattend.length;
  }
}
