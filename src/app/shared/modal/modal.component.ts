import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from '../../core/services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  public isVisible = true;

  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
  }

}
