import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output, Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { IconsService } from '../../core/services';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PlaceholderDirective } from '../../core/directives/placeholder.directive';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('slideAway', [
      state('gone', style({ transform: 'translateY(500%)' })),
      transition('* => gone', animate('0.5s'))
    ]),
  ]
})
export class ModalComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: true }) contentHost!: PlaceholderDirective;
  @ViewChild('overlay', { static: true }) overlayEl!: ElementRef;
  @ViewChild('modal', { static: true }) modalEl!: ElementRef;
  @Input() title!: string;
  @Input() contentRef!: TemplateRef<any>;
  @Output() close = new EventEmitter<void>();
  public isGone = false;

  constructor(public iconsService: IconsService,
              private _scrollManager: ViewportScroller,
              private _renderer: Renderer2) { }

  @HostListener('window:scroll') onScroll() {
    this.overlayEl.nativeElement.style.top = window.scrollY + 'px';
  }

  ngOnInit(): void {
    this._renderer.addClass(this.overlayEl.nativeElement, 'active');
    this.overlayEl.nativeElement.style.top = window.scrollY + 'px';
    this.contentHost.viewContainerRef.clear();
    this.contentHost.viewContainerRef.createEmbeddedView<any>(this.contentRef);
    if (innerWidth > 600) {
      this.modalEl.nativeElement.style.top = this._renderer.selectRootElement('#puzzles', true).getBoundingClientRect().top + window.scrollY + 'px';
      this.modalEl.nativeElement.style.left = (innerWidth - this.modalEl.nativeElement.offsetWidth) / 2 + 'px';
    } else {
      this._renderer.setStyle(this.modalEl.nativeElement, 'top', '100%');
      setTimeout(() => {
        this._scrollManager.setOffset([0, -300]);
        this._scrollManager.scrollToAnchor('modalContent');
      }, 500);
    }
   }

  public onClose(): void {
    this.isGone = true;
    this._renderer.removeClass(this.overlayEl.nativeElement, 'active');
    setTimeout(() => {
      this.close.emit();
      this._scrollManager.scrollToAnchor('puzzles');
    }, 500);
  }
}
