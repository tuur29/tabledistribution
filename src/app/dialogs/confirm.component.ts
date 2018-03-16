import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-savename',
  template: `
    
    <p>Are you sure?</p>
    <button mat-button (click)="dialogRef.close(false)">No</button>
    <button mat-raised-button color="primary" (click)="dialogRef.close(true)">Yes</button>

  `,
  styles: [`

  `]
})
export class ConfirmDialog implements OnInit {

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
