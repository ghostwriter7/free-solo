import { Injectable } from '@angular/core';
import { faBars, faSun, faTimes } from '@fortawesome/free-solid-svg-icons';
@Injectable({
  providedIn: 'root'
})
export class IconsService {
  public bars = faBars;
  public times = faTimes;
  public sun = faSun;
}
