import { Component, NgZone, OnInit, Renderer2 } from '@angular/core';
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

  constructor(
    public iconsService: IconsService,
    public themeService: ThemeService,
    private _renderer: Renderer2,
    private _zone: NgZone
  ) {}

  ngOnInit(): void {
    this.toggleMenu$.subscribe({
      next: (state) => {
        if (window.innerWidth < 600) {
          state ? this._renderer.setStyle(document.body, 'overflow-y', 'hidden') :
            this._renderer.setStyle(document.body, 'overflow-y', 'initial');
        }
      }
    });

    this._zone.runOutsideAngular(() => {
      this._renderer.listen(window, 'resize', () => {
        if (innerWidth > 600) {
          this._renderer.removeStyle(document.body, 'overflow-y');
        }
      });
    });
  }

  public onToggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.toggleMenu$.next(this.isMenuActive);
  }

  public onToggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
