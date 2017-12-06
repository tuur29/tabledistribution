import { Observable } from 'rxjs/Rx';
import { RegisterDialog } from './register.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public register(): Observable<boolean> {

    let dialogRef: MatDialogRef<RegisterDialog>;

    dialogRef = this.dialog.open(RegisterDialog);

    return dialogRef.afterClosed();
  }
}
