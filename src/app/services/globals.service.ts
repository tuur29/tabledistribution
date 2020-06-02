import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';

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
    public localStorageService: LocalStorageService,
  ) {
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

}
