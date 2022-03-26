import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ThemeService, IconsService } from '../../core/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public menuItems: { title: string; path: string; }[] = [
    {title: 'Home', path: '/home'},
    {title: 'Projects', path: '/projects'}
  ];
  public isMenuActive = false;
  public toggleMenu$ = new Subject<boolean>();

  @HostListener('window:resize', ['$event']) onWindowResize(e: Event) {
    if ((e.target as Window).innerWidth > 600) {
      this._renderer2.removeStyle(document.body, 'overflow-y');
    }
  }

  constructor(
    public iconsService: IconsService,
    public _themeService: ThemeService,
    private _renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.toggleMenu$.subscribe({
      next: (state) => {
        if (window.innerWidth < 600) {
          state ? this._renderer2.setStyle(document.body, 'overflow-y', 'hidden') :
            this._renderer2.removeStyle(document.body, 'overflow-y');
        }
      }
    });
  }

  public onToggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.toggleMenu$.next(this.isMenuActive);
  }

  public onToggleTheme(): void {
    this._themeService.toggleTheme();
  }
}
