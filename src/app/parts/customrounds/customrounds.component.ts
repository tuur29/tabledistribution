import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { LocalStorage } from 'ngx-store';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customrounds',
  template: `

  <mat-expansion-panel
      [expanded]="!hide"
      (opened)="hide=false"
      (closed)="hide=true"
      [style.minWidth]="minwidth +'px'"
      >

      <mat-expansion-panel-header>
        <mat-panel-title>
          <h1>Custom round</h1>
        </mat-panel-title>
      </mat-expansion-panel-header>

      <form>
        <mat-form-field class="full-width">
          <input matInput placeholder="Letters (ABC,DEF,GHI)" aria-label="Letters" [formControl]="customcontrol">
          <button *ngIf="customcontrol.value" matSuffix mat-icon-button aria-label="Reset" (click)="customcontrol.reset()">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>
      </form>

      <ul *ngFor="let tableInRound of customround">
        <ng-container *ngFor="let person of tableInRound; let i = index">
          <li [style.display]="(person.name ? '' : 'none')">
            <small>{{i+1}}:</small> <span [style.color]="person.data?.color">{{person.name}} ({{person.data?.letter}})</span>
          </li>
        </ng-container>
      </ul>

    </mat-expansion-panel>

  `,
  styles: [`

    
    ul {
      display: inline-block;
      vertical-align: top;
      margin: 10px 10px;
    }

    ul:not(:last-child) {
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

    small {
      opacity: 0.5;
    }

  `]
})
export class CustomRoundsComponent implements OnInit {

  @LocalStorage("hideCustomRounds") hide = true;
  customcontrol: FormControl = new FormControl();

  table: any[];
  customround: any[] = [];

  constructor(public g: GlobalsService) {}

  ngOnInit() {
    this.customcontrol.valueChanges.subscribe(input => {
      this.updateView();
    });
  }

  updateView() {
    this.customround.splice(0, this.customround.length);

    let input = this.customcontrol.value;
    if (!input) return;

    input.trim().split(",").forEach(letters => {
      let round = [];

      for (let letter of letters.trim().split("")) {
        // find persons of each letter and add to round

        let index = this.g.letters.indexOf(letter.toUpperCase());
        if (index < 0) continue;
        
        let personsWithLetter = this.table[index];
        round = round.concat(personsWithLetter);
      }

      this.customround.push(round);
    });
  }

  updateTable(table) {
    this.table = table;
    this.updateView();
  }
}
