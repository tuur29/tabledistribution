import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { removeDiacritics } from 'removeDiacritics';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-nameslist',
  template: `

  <mat-expansion-panel
      [expanded]="!hide"
      (opened)="hide=false"
      (closed)="hide=true">

      <mat-expansion-panel-header>
        <mat-panel-title>
          <h1>Participants</h1>
        </mat-panel-title>
      </mat-expansion-panel-header>

      <!-- Form -->

      <form>
        <mat-form-field class="full-width">

          <button mat-icon-button matPrefix>
            <mat-icon>search</mat-icon>
          </button>

          <input matInput placeholder="Search names" aria-label="Search names" [formControl]="namesCtrl">

          <button *ngIf="namesCtrl.value" matSuffix mat-icon-button aria-label="Reset" (click)="namesCtrl.reset()">
          <mat-icon>close</mat-icon>
        </button>

        </mat-form-field>
      </form>

      <mat-list>
        <mat-list-item *ngFor="let name of filteredList | async">{{name}}</mat-list-item>
      </mat-list>

    </mat-expansion-panel>

  `,
  styles: [`

    div {
      display: inline-block;
      margin: 10px;
    }

    div:not(:last-child) {
      padding-right: 20px;
      border-right: 1px solid black;
    }

    ul:not(:last-child) {
      padding-bottom: 10px;
      border-bottom: 1px solid black;
    }

    mat-list {
      max-height: 400px;
      overflow-y: auto;
    }

    :host ::ng-deep .mat-list .mat-list-item .mat-list-item-content {
      height: 32px;
    }

  `]
})
export class NamesListComponent implements OnInit {

  list = [];
  @LocalStorage("hideNamesList") hide = false;

  // variables
  namesCtrl: FormControl = new FormControl();
  filteredList: Observable<any[]>;

  constructor() {}

  ngOnInit() {
    this.filteredList = this.namesCtrl.valueChanges
      .startWith(null)
      .map(name => name ? this.filter(name) : this.list.slice());
  }

  filter(query: string) {
    return this.list.filter(name =>
      this.normalize(name).indexOf(this.normalize(query)) > -1
    );
  }

  updateTable(groups: any[]) {
    this.list = [];
    for (let i=0; i<groups.length;i++)
      this.list = this.list.concat(groups[i]);
    
    this.namesCtrl.setValue('');
  }

  private normalize(s: string) {
    return removeDiacritics(s.toLowerCase());
  }
}
