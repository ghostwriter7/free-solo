import { Component, OnInit } from '@angular/core';
import { IconsService } from '../../core/services/icons.service';
import { ThemeService } from '../../core/services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public menuItems: { title: string; path: string; }[] = [
    { title: 'Home', path: '/home' },
    { title: 'Projects', path: '/projects' }
  ];
  public isMenuActive = false;

  constructor(
    public iconsService: IconsService,
    private _themeService: ThemeService
    ) { }

  ngOnInit(): void {
  }

  public onToggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  public onToggleTheme(): void {
    this._themeService.toggleTheme();
  }

}
