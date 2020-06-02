import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'app/services/globals.service';

@Component({
  selector: 'app-savename',
  template: `
    
    <h3>{{text}}</h3>
    <button mat-button (click)="dialogRef.close(false)">No</button>
    <button mat-raised-button color="primary" (click)="dialogRef.close(true)" class="float-right">Yes</button>

  `,
  styles: [`

    h3 {
      margin: 0 0 20px 0;
    }

    button {
      margin: 0 5px;
    }

  `]
})
export class ConfirmDialog implements OnInit {

  public text: string = "Are you sure?";

  constructor(
    public globals: GlobalsService,
    public dialogRef: MatDialogRef<ConfirmDialog>
  ) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
