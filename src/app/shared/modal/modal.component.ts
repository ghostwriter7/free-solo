import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { IconsService } from '../../core/services';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PlaceholderDirective } from '../../core/directives/placeholder.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('slideAway', [
      state('gone', style({ transform: 'translateY(500%)' })),
      transition('* => gone', animate('0.5s'))
    ])
  ]
})
export class ModalComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: true }) contentHost!: PlaceholderDirective;
  @Input() title!: string;
  @Input() contentRef!: TemplateRef<any>;
  @Output() close = new EventEmitter<void>();
  public isGone = false;

  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
    this.contentHost.viewContainerRef.clear();
    this.contentHost.viewContainerRef.createEmbeddedView<any>(this.contentRef);
  }

  public onClose(): void {
    this.isGone = true;
    setTimeout(() => this.close.emit(), 500);
  }
}
