import { Injectable } from '@angular/core';
import { Theme } from '../interfaces';
import { dark, light } from '../themes';
import { StorageService } from './storage.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = dark;
  public canvasBackground$ = new BehaviorSubject<string>(this.active.properties['--bg-body']);

  constructor(private _storageService: StorageService) { }

  public toggleTheme(): void {
    this.active = this.active === dark ? light : dark;
    this.saveTheme();
    this.setActiveTheme();
  }

  public loadFavoriteTheme(): void {
    const favoriteTheme = this._storageService.getItem('theme');

    if (favoriteTheme) {
      this.active = JSON.parse(favoriteTheme) === 'light' ? light : dark;
      this.setActiveTheme();
    }
  }

  private saveTheme(): void {
    this._storageService.saveItem('theme', this.active.name);
  }

  private setActiveTheme(): void {
    Object.keys(this.active.properties).forEach(prop => {
      document.documentElement.style.setProperty(prop, this.active.properties[prop]);
    });
    this.canvasBackground$.next(this.active.properties['--bg-body']);
  }
}
