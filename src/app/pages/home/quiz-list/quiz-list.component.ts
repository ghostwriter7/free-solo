import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { PlaceholderDirective } from '../../../core/directives/placeholder.directive';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit, AfterViewInit {
  @ViewChild(PlaceholderDirective, { static: true }) host!: PlaceholderDirective;

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

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.shufflePuzzles();
  }

  ngAfterViewInit() {}

  private shufflePuzzles(): void {
    this.quizItems.sort((a, b) => 0.5 - Math.random());
  }

  private createModal(title: string, text: string): void {
    const modalFactory = this._componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.host.viewContainerRef.clear();
    const component = this.host.viewContainerRef.createComponent(modalFactory);
    component.instance.title = title;
    component.instance.content.nativeElement.innerText = text;
    component.instance.close.pipe(take(1)).subscribe({
      next: () => this.host.viewContainerRef.clear()
    });
  }
}
