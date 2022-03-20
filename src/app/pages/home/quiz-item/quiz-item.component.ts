import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from '../../../core/services';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss']
})
export class QuizItemComponent implements OnInit {
  @Input() icon!: string;

  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
  }

}
