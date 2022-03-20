import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  public quizItems: { icon: string }[] = [
    { icon: 'laptop' },
    { icon: 'balls' },
    { icon: 'book' },
    { icon: 'hand' },
    { icon: 'ghost' },
    { icon: 'paw' },
    { icon: 'laptop' },
    { icon: 'balls' },
    { icon: 'book' },
    { icon: 'hand' },
    { icon: 'ghost' },
    { icon: 'paw' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
