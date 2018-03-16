import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-savename',
  template: `
    
    <form (ngSubmit)="onSubmit()">
      <mat-form-field class="full-width">
        <input matInput placeholder="Name" name="name" [(ngModel)]="name">
      </mat-form-field>

      <button type="submit" mat-raised-button color="primary">Save</button>
    </form>

  `,
  styles: [`

  `]
})
export class SaveNameDialog implements OnInit {

  name: string;

  constructor(
    public globals: GlobalsService,
    public messagesService: MessagesService,
    public dialogRef: MatDialogRef<SaveNameDialog>
  ) {}

  ngOnInit() {
    
  }

  setName(oldname: string) {
    this.name = oldname;
  }

  onSubmit() {
    this.dialogRef.close(this.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
