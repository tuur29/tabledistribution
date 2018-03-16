import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';

@Component({
  selector: 'app-header',
  template: `

    <mat-toolbar color="accent">

      <a routerLink="/">
        <mat-icon>dashboard</mat-icon>
        <span class="title">{{title}}</span>
      </a>

      <span class="spacer"></span>
      
      <button type="button" mat-icon-button (click)="globals.drawer.toggle()">
        <mat-icon>star</mat-icon>
      </button>
    </mat-toolbar>

  `,
  styles: [`

    /* @media (max-width: 400px) {
      a .title {
        display: none;
      }
    } */

    mat-toolbar {
      max-width: 100%;
      overflow-x: auto;
    }

    img {
      vertical-align: middle;
    }

    mat-toolbar a {
      margin: 0 5px;
      color: black;
      text-decoration: none;
    }

    mat-toolbar a:hover, mat-toolbar a:active, mat-toolbar a:focus {
      text-decoration: underline;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .spacer ~ * {
      font-size: 16px;
    }

`]
})
export class HeaderComponent implements OnInit {

  title: string;

  constructor(public globals: GlobalsService) {
    this.title = window.document.title;
  }

  ngOnInit() {}

}
