import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from 'ngx-store';
import { MessagesService } from '../messages/messages.service';

import { environment } from 'environments/environment';

// TODO: selector for possible symbols: letters, emojis, none?
export const none = [''];
export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export const smileys = ['😀','😉','😋','😎','😍','🙄','😮','😴','🙃','🤑','😭','😦','🤯','😱','🥵','🥶','😡','😠','🤬','😷','🤢','😇','🤠','🤡','🧐','🤓','👿','💀','👻','👽','🤖','💩','😺'];
export const food = ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍈','🍒','🍑','🍍','🥭','🥥','🥝','🍅','🍆','🥑','🥦','🥒','🥬','🌶','🌽','🥕','🥔','🍠','🥐','🍞','🥖','🥨','🥯','🧀','🥚','🍳','🥞','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🥪','🥙','🌮','🌯','🥗','🥘','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🍤','🍙','🍚','🍘','🍥','🥮','🥠','🍢','🍡','🍧','🍨','🍦','🥧','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🧂','🍩','🍪','🌰','🥜','🍯','🥛','🍼','☕️','🍵','🥤','🍶','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🍾','🥄','🍴','🍽','🥣','🥡','🥢'];
export const nature = ['🐶','🐱','🐭','🐹','🐰','🦊','🦝','🐻','🐼','🦘','🦡','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦢','🦅','🦉','🦚','🦜','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐚','🐞','🐜','🦗','🕷','🕸','🦂','🦟','🦠','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🐘','🦏','🦛','🐪','🐫','🦙','🦒','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🐐','🦌','🐕','🐩','🐈','🐓','🦃','🕊','🐇','🐁','🐀','🐿','🦔','🐾','🐉','🐲','🌵','🎄','🌲','🌳','🌴','🌱','🌿','☘️','🍀','🎍','🎋','🍃','🍂','🍁','🍄','🌾','💐','🌷','🌹','🥀','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌎','🌍','🌏','💫','⭐️','🌟','✨','⚡️','☄️','💥','🔥','🌪','🌈','☀️','🌤','⛅️','🌥','☁️','🌦','🌧','⛈','🌩','🌨','❄️','☃️','⛄️','🌬','💨','💧','💦','☔️','☂️','🌊','🌫'];

const generateLetters = (count: number, values: string[]) => {
  let loop = 0;
  let result = [];
  while (count >= (loop + 1) * values.length) {
    result = result.concat(values.map(letter => letter + ((loop > 0 && letter) ? loop : '')));
    loop += 1;
  }
  return result;
};

@Injectable()
export class GlobalsService {

  public letters = generateLetters(15 * 15, letters);

  public loading = false;
  public failed = false;
  public drawer: any = null;

  constructor(
    private http: Http,
    public messagesService: MessagesService,
    public localStorageService: LocalStorageService,
  ) {
    // check if current token expired
    if (this.auth.exp > Date.now())
      this.logout();

    const identifier = this.localStorageService.get("groupIdentifier");
    if (identifier) this.setGroupIdentifier(identifier);
  }

  // Authentication
  private url = environment.backendurl + '/users/';
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
    return this.http.post(this.url + 'login', {
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
    return this.http.post(this.url + 'register', {
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

  setGroupIdentifier(type: string) {
    let items = [];
    if (type === 'none') items = none;
    else if (type === 'letters') items = letters;
    else if (type === 'smileys') items = smileys;
    else if (type === 'food') items = food;
    else if (type === 'nature') items = nature;
    else items = letters;
    this.letters = generateLetters(15 * 15, items);
    this.localStorageService.set("groupIdentifier", type);
  }

  private parseJwt(token) {
    if (!token) return;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
