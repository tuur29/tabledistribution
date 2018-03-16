import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from 'ngx-store';
import { MessagesService } from '../messages/messages.service';

import { environment } from 'environments/environment';

@Injectable()
export class GlobalsService {

  public letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A’','B’','C’','D’','E’','F’','G’','H’','I’','J’','K’','L’','M’','N’','O’','P’','Q’','R’','S’','T’','U’','V’','W’','X’','Y’','Z’'];
  
  public loading = false;
  public failed = false;
  public drawer: any = null;

  constructor(
    private http: Http,
    public messagesService: MessagesService
  ) {
    // check if current token expired
    if (this.auth.exp > Date.now())
      this.logout();
  }

  // Authentication
  private url = environment.backendurl+'/users/';
  private readonly defaultAuth = {
    email: 'address@domain.tld',
    token: 'derp',
    admin: false
  };

  @LocalStorage()
  private _authtoken = '';

  get auth() {
    if (this._authtoken) {
      let ob = this.parseJwt(this._authtoken);
      ob.token = this._authtoken;
      return ob;
    }
    return this.defaultAuth;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.url+'login', {
      email: email,
      password: password
    }).map(res => res.json()).map(res => {

      if (res.token) {
        this._authtoken = res.token;
        return true;
      }
      return false;

    }).catch((err: Response) => Observable.throw(err.json()) );
  }

  register(email: string, name: string, password: string): Observable<boolean> {
    return this.http.post(this.url+'register', {
      email: email,
      name: name,
      password: password
      }).map((res) => {
        this.messagesService.send("Je account moet eerst goedgekeurd worden").subscribe();
        return res.json();
      }).catch((err: Response) => {
        return Observable.throw(err.text());
      });
  }

  logout() {
    this._authtoken = '';
  }

  private parseJwt(token) {
    if (!token) return;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
