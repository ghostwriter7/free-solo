import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { PlaceholderDirective } from '../../../core/directives/placeholder.directive';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { take } from 'rxjs';
import { IPuzzle } from '../core/interfaces';
import { QuizItemComponent } from '../quiz-item/quiz-item.component';
import QUIZ_DATA from '../core/data/quizData';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: true }) host!: PlaceholderDirective;
  @ViewChild('answer', { read: TemplateRef }) answer!: TemplateRef<any>;

  @HostListener('click') centerPuzzleBoard() {
    if (!this.isBoardActive) {
      return;
    }
    this._scrollManager.scrollToAnchor('puzzles');
  }

  public quizItems = [...QUIZ_DATA.map((obj, i) => ({ ...obj, id: i })), ...QUIZ_DATA.map((obj, i) => ({ ...obj, id: i + 6}))];
  public isBoardActive = true;
  public isSuccess = false;
  public isWrong = false;
  public firstSelectedPuzzle: { puzzle: IPuzzle, element: QuizItemComponent } | null = null;
  public secondSelectedPuzzle: { puzzle: IPuzzle, element: QuizItemComponent } | null = null;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _scrollManager: ViewportScroller) { }

  ngOnInit(): void {
    this.shufflePuzzles();
  }

  public onClick(puzzle: IPuzzle, element: QuizItemComponent): void {
      if (!this.firstSelectedPuzzle) {
        this.firstSelectedPuzzle = { puzzle, element };
        this.firstSelectedPuzzle.element.toggle();
        return;
      } else {
        this.secondSelectedPuzzle = { puzzle, element };
        this.secondSelectedPuzzle.element.toggle();
        this.isBoardActive = false;
      }

      setTimeout(() => {
        if (this.firstSelectedPuzzle!.puzzle.icon === this.secondSelectedPuzzle!.puzzle.icon) {
          this.isSuccess = true;
          setTimeout(() => {
            this.createModal(this.firstSelectedPuzzle!.puzzle.title, this.answer).then(() => {
              this.isSuccess = false;
              this.isBoardActive = true;
              this.firstSelectedPuzzle!.puzzle.isActive = false;
              this.secondSelectedPuzzle!.puzzle.isActive = false;
              this.firstSelectedPuzzle = null;
              this.secondSelectedPuzzle = null;
            });
          }, 800);
        } else {
          this.isWrong = true;
          setTimeout(() => {
            this.isWrong = false;
            this.firstSelectedPuzzle!.element.toggle();
            this.secondSelectedPuzzle!.element.toggle();
            this.firstSelectedPuzzle = null;
            this.secondSelectedPuzzle = null;
            this.isBoardActive = true;
          }, 1200);
        }
      }, 300);
  }

  private shufflePuzzles(): void {
    this.quizItems.sort((a, b) => 0.5 - Math.random());
  }

  private createModal(title: string, content: TemplateRef<any>): Promise<void> {
    const modalFactory = this._componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.host.viewContainerRef.clear();
    const component = this.host.viewContainerRef.createComponent(modalFactory);
    component.instance.title = title;
    component.instance.contentRef = content;

    return new Promise<void>((resolve, reject) => {
      component.instance.close.pipe(take(1)).subscribe({
        next: () => {
          this.host.viewContainerRef.clear();
          resolve();
        }
      });
    });
  }
}
