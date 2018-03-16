import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { SaveNameDialog } from './savename.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public savename(oldname?: string): Observable<string> {

    let dialogRef: MatDialogRef<SaveNameDialog>;

    dialogRef = this.dialog.open(SaveNameDialog);
    dialogRef.componentInstance.setName(oldname);

    return dialogRef.afterClosed();
  }

}
