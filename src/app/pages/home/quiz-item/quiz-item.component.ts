import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { IconsService } from '../../../core/services';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizItemComponent {
  @Input() icon!: string;
  @Input() isSuccess = false;
  @Input() isWrong = false;
  public isHidden = true;

  constructor(public iconsService: IconsService,
              private _cdRef: ChangeDetectorRef) { }

  public toggle(): void {
    this.isHidden = !this.isHidden;
    this._cdRef.detectChanges();
  }
}
