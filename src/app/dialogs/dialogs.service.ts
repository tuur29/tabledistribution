import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

import { SaveNameDialog } from './savename.component';
import { ConfirmDialog } from './confirm.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public savename(oldname?: string): Observable<string> {

    let dialogRef: MatDialogRef<SaveNameDialog>;

    dialogRef = this.dialog.open(SaveNameDialog);
    dialogRef.componentInstance.setName(oldname);

    return dialogRef.afterClosed();
  }

  public confirm(text?: string): Observable<string> {

    let dialogRef: MatDialogRef<ConfirmDialog>;
    dialogRef = this.dialog.open(ConfirmDialog);
    if (text)
      dialogRef.componentInstance.text = text;
    return dialogRef.afterClosed();
  }

}
