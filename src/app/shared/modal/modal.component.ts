import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IconsService } from '../../core/services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: ElementRef;
  @Input() title!: string;
  @Output() close = new EventEmitter<void>();

  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
  }

  public onClose(): void {
    this.close.emit();
  }
}
