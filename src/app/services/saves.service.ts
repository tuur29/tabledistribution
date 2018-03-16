import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { Observable } from 'rxjs/Observable';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable()
export class SavesService {

  current;

  constructor(
    public localStorageService: LocalStorageService,
    public dialogs: DialogsService
  ) {
    
  }

  newSave() {
    this.dialogs.savename().subscribe((name) => {
      console.log(name);
      if (name)
        this.save(name);
    });
  }

  load(key: string) {
    // get save by key
  }

  getAll() {

  }

  private save(name: string) {

  }

}
