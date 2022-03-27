import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
} from '@angular/core';
import PROJECTS_DATA from '../core/data/projectsData';
import { IProject } from '../core/interfaces';
import {
  animationFrameScheduler, delay,
  fromEvent,
  interval, Observable,
  scan,
  startWith,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ProjectsService } from '../core/services/projects.service';

@Component({
  selector: 'app-projects-slider',
  templateUrl: './projects-slider.component.html',
  styleUrls: ['./projects-slider.component.scss']
})
export class ProjectsSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('slider', {static: true}) slider!: ElementRef;
  @ViewChild('slide') slide!: ElementRef;
  @Output() selected = new EventEmitter<IProject>();
  public projects: IProject[] = PROJECTS_DATA;
  public slider$!: Subscription;
  public maxHeight$!: Observable<string>
  private slideDimension!: number;
  private translationAxis!: string;

  constructor(private _projectsService: ProjectsService) {}

  ngOnInit() {
    this.maxHeight$ = this._projectsService.sliderHeight$;
  }

  ngAfterViewInit() {
    this.slider$ = fromEvent(window, 'resize').pipe(
      startWith('init'),
      tap(() => {
        this.resetOffset();
        this.configureSlider();
      }),
      switchMap(() => {
        return interval(0, animationFrameScheduler).pipe(
          delay(1500),
          scan<number, { data: IProject[], current: number }>((state, val) => {
            state.data = state.data.map((item) => ({
              ...item,
              offset: item.offset - 1,
              transform: `translate${this.translationAxis}(${item.offset}px)`
            }));

            if (val && val % this.slideDimension === 0) {
              state.data[state.current].offset += this.slideDimension * this.projects.length;
              state.current = state.current === this.projects.length - 1 ? 0 : state.current += 1;
            }

            this.projects = state.data;

            return state;
          }, {data: this.projects, current: 0}))
      })).subscribe()
  }

  public onSelect(project: IProject): void {
    this._projectsService.selectedProject$.next(project);
  }

  private configureSlider(): void {
    const {marginBlock, marginInline} = getComputedStyle(this.slide.nativeElement)
    const {offsetWidth, offsetHeight} = this.slide.nativeElement
    this.slideDimension = Math.trunc(innerWidth < 800
      ? offsetWidth + 2 * parseInt(marginInline)
      : offsetHeight + 2 * parseInt(marginBlock));
    this.translationAxis = innerWidth < 800 ? 'X' : 'Y';
  }

  private resetOffset(): void {
    this.projects.forEach(project => {
      project.offset = 0;
      project.transform = '';
    });
  }

  ngOnDestroy() {
    this.slider$.unsubscribe();
  }

}
