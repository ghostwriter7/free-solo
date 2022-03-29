import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from '../../../core/services';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
  animations: [
    trigger('flip', [
      state('show', style({transform: 'rotateY(180deg)'})),
      state('hide', style({ transform: 'rotateY(0deg)'})),
      transition('show <=> hide', animate('0.3s ease-in-out'))
    ])
  ]
})
export class QuizItemComponent implements OnInit {
  @Input() icon!: string;
  @Input() isSuccess = false;
  @Input() isWrong = false;
  public isHidden = true;

  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.isHidden = !this.isHidden;
  }

}
