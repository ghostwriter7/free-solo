import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public saveItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    return localStorage.getItem(key) ? localStorage.getItem(key) : null;
  }

  public deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
}
