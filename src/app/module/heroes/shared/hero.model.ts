import {Deserializable} from '../../../shared/interfaces/deserializable.interface';
import { isNull } from '@angular/compiler/src/output/output_ast';

export class Hero implements Deserializable {
  id: string;
  name: string;
  alterEgo: string;
  likes: number;
  default: boolean;
  avatarUrl: string;
  avatarBlurredUrl: string;
  avatarThumbnailUrl: string;
  personalHero: boolean;

  constructor(hero: any = {}) {
    this.id = hero.id;
    this.name = hero.name || '';
    this.alterEgo = hero.alterEgo || '';
    this.likes = hero.likes || 0;
    this.default = hero.default || false;
    this.avatarUrl = hero.avatarUrl || '';
    this.avatarBlurredUrl = hero.avatarBlurredUrl || '';
    this.avatarThumbnailUrl = hero.avatarThumbnailUrl || '';
    this.personalHero = (localStorage.getItem(this.id) != null) ? true : false;
  }

  like() {
    this.likes += 1;
    this.personalHero = true;
    // TODO: change to an array of ids
    localStorage.setItem(this.id, this.name);
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
