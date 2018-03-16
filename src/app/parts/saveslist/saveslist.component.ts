import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SavesService } from 'app/services/saves.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-saveslist',
  template: `

    <mat-list *ngIf="saveslist">
      <mat-list-item *ngFor="let key of saveslist.keys()" (click)="saves.load(key)">
        
        {{ key }}
        <div class="spacer"></div>
        <button mat-icon-button (click)="saves.delete(key)">
          <mat-icon>delete</mat-icon>
        </button>

      </mat-list-item>
    </mat-list>

  `,
  styles: [`

    mat-list-item {
      cursor: pointer;
    }

  `]
})
export class SavesListComponent implements OnInit {

  saveslist: Map<string, any>;

  constructor(public saves: SavesService) {}

  ngOnInit() {
    this.saves.getAll().then((list) => {
      this.saveslist = list;
    })
  }
}
