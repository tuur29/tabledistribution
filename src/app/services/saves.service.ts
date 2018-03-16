import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable()
export class SavesService {

  list: Map<string, any> = new Map();
  ready;
  private loadsubject = new Subject<any>();

  constructor(
    public localStorageService: LocalStorageService,
    public dialogs: DialogsService
  ) {

    this.ready = new Promise((resolve) => {
      this.localStorageService.keys.forEach((key) => {
        if (key.indexOf("ngx_save_") == 0) {
          let save = this.localStorageService.get(key.replace("ngx_",""));
          this.list.set(key.replace("ngx_save_",""), save);
        }
      });
      resolve(this.list);
    });

  }

  newSave(data: any) {
    this.dialogs.savename().subscribe((name) => {
      if (name)
        this.save(name, data);
    });
  }

  getAll() {
    return this.ready;
  }

  load(name: string) {
    this.loadsubject.next(this.list.get(name));
  }

  onLoad(): Observable<any> {
     return this.loadsubject.asObservable();
  }

  delete(name: string) {
    this.dialogs.confirm().subscribe((result) => {
      if (result) {
        this.list.delete(name);
        this.localStorageService.remove('save_'+name);
      }
    });
  }

  private save(name: string, data: any) {
    this.list.set(name, data);
    this.localStorageService.set("save_"+name, data);
  }

}
