import { Injectable } from '@angular/core';
import {
  faBars, faBook,
  faEllipsisV,
  faFistRaised,
  faGhost,
  faLaptop,
  faPaw,
  faSun,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  public bars = faBars;
  public times = faTimes;
  public sun = faSun;
  public paw = faPaw;
  public laptop = faLaptop;
  public hand = faFistRaised;
  public ghost = faGhost;
  public balls = faEllipsisV;
  public book = faBook;

  private icons: {[key: string]: any} = {
    bars: this.bars,
    times: this.times,
    sun: this.sun,
    paw: this.paw,
    laptop: this.laptop,
    hand: this.hand,
    ghost: this.ghost,
    balls: this.balls,
    book: this.book
  }

  public getIcon(icon: string): any {
    return this.icons[icon];
  }
}
