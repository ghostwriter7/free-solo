import { Injectable } from '@angular/core';
import {
  faBars, faBook, faBookOpen,
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
  private icons: {[key: string]: any} = {
    bars: faBars,
    times: faTimes,
    sun: faSun,
    paw: faPaw,
    laptop: faLaptop,
    hand: faFistRaised,
    ghost: faGhost,
    balls: faEllipsisV,
    book: faBookOpen
  }

  public getIcon(icon: string): any {
    return this.icons[icon];
  }
}
