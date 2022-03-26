import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding, HostListener,
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
    trigger('turnOffBlur', [
      state('blurOff', style({ 'backdrop-filter': 'blur(0px)'})),
      transition('* => blurOff', animate('0.5s'))
    ])
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
    this.overlayEl.nativeElement.style.top = window.scrollY + 'px';
    this.contentHost.viewContainerRef.clear();
    this.contentHost.viewContainerRef.createEmbeddedView<any>(this.contentRef);
    this.modalEl.nativeElement.style.top = this._renderer.selectRootElement('#puzzles', true).getBoundingClientRect().top + window.scrollY + 'px';
    this.modalEl.nativeElement.style.left = (innerWidth - this.modalEl.nativeElement.offsetWidth) / 2 + 'px';
  }

  public onClose(): void {
    this.isGone = true;
    setTimeout(() => {
      this.close.emit();
      this._scrollManager.scrollToAnchor('puzzles');
    }, 500);
  }
}
