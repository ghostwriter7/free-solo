import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input('tooltipText') text!: string;
  private _tooltipEl!: HTMLElement;
  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
    ) {}

  @HostListener('mouseenter') onEnter() {
    this._renderer.setStyle(this._tooltipEl, 'display', 'inline');
  }

  @HostListener('mouseleave') onLeave() {
    this._renderer.setStyle(this._tooltipEl, 'display', 'none');
  }

  ngOnInit() {
    this._renderer.setStyle(this._elementRef.nativeElement, 'position', 'relative');
    this._tooltipEl = this._renderer.createElement('span');
    const text = this._renderer.createText(this.text);
    this._renderer.appendChild(this._tooltipEl, text);
    this._renderer.addClass(this._tooltipEl, 'tooltip')
    this._renderer.appendChild(this._elementRef.nativeElement, this._tooltipEl);
  }
}
