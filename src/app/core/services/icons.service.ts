import { Injectable } from '@angular/core';
import {
  faBars, faBinoculars, faBook, faBookOpen,
  faEllipsisV, faFilm,
  faFistRaised,
  faGhost,
  faLaptop,
  faPaw, faQuestion,
  faSun,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faAngular, faCss3, faGithub, faHtml5, faJs, faLinkedin, faReact } from '@fortawesome/free-brands-svg-icons';

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
    book: faBookOpen,
    question: faQuestion,
    react: faReact,
    angular: faAngular,
    js: faJs,
    html: faHtml5,
    css: faCss3,
    github: faGithub,
    seeIt: faBinoculars,
    linkedin: faLinkedin,
    movie: faFilm
  }

  public getIcon(icon: string): any {
    return this.icons[icon];
  }
}
