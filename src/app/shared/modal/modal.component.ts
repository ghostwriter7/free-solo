import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IconsService } from '../../core/services';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  @ViewChild('content', { static: true }) content!: ElementRef;
  @Input() title!: string;
  @Output() close = new EventEmitter<void>();
  public isGone = false;

  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
  }

  public onClose(): void {
    this.isGone = true;
    setTimeout(() => this.close.emit(), 500);
  }
}
