import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable()
export class SavesService {

  list: Map<string, any> = new Map();
  notes: Map<string, string> = new Map();
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
        } else if (key.indexOf("ngx_savenote_") == 0) {
          let save = this.localStorageService.get(key.replace("ngx_",""));
          this.notes.set(key.replace("ngx_savenote_",""), save);
        }
      });
      resolve([this.list, this.notes]);
    });

  }

  newSave(data: any, notes: string) {
    this.dialogs.savename().subscribe((name) => {
      if (name) {
        if (this.list.get(name)) {
          this.dialogs.confirm("This will overwrite another save, continue?").subscribe(resp => {
            if (resp) 
              this.save(name, data, notes);
          });
        } else {
          this.save(name, data, notes);
        }
      }
    });
  }

  getAll() {
    return this.ready;
  }

  load(name: string) {
    this.loadsubject.next([this.list.get(name), this.notes.get(name)]);
  }

  onLoad(): Observable<any> {
     return this.loadsubject.asObservable();
  }

  delete(name: string) {
    this.dialogs.confirm().subscribe((result) => {
      if (result) {
        this.list.delete(name);
        this.localStorageService.remove('save_'+name);
        this.localStorageService.remove('savenote_'+name);
      }
    });
  }

  private save(name: string, data: any, notes: string) {
    this.list.set(name, data);
    this.localStorageService.set("save_"+name, data);
    this.localStorageService.set("savenote_"+name, notes);
  }

}
