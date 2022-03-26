import { Injectable } from '@angular/core';
import { Theme } from '../interfaces';
import { dark, light } from '../themes';
import { StorageService } from './storage.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _active: Theme = dark;
  public canvasBackground$ = new BehaviorSubject<string>(this._active.properties['--bg-body']);
  public themeLoaded$ = new ReplaySubject<string>(1);

  constructor(private _storageService: StorageService) { }

  public toggleTheme(): void {
    this._active = this._active === dark ? light : dark;
    this.saveTheme();
    this.setActiveTheme();
  }

  public loadFavoriteTheme(): void {
    const favoriteTheme = this._storageService.getItem('theme');

    if (favoriteTheme) {
      this._active = JSON.parse(favoriteTheme) === 'light' ? light : dark;
      this.setActiveTheme();
    }
    this.themeLoaded$.next(this._active.name);
  }

  private saveTheme(): void {
    this._storageService.saveItem('theme', this._active.name);
  }

  private setActiveTheme(): void {
    Object.keys(this._active.properties).forEach(prop => {
      document.documentElement.style.setProperty(prop, this._active.properties[prop]);
    });
    this.canvasBackground$.next(this._active.properties['--bg-body']);
  }
}
