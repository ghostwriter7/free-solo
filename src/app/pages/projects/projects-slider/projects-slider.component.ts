import {
  AfterViewInit,
  Component,
  ElementRef, HostListener, OnDestroy,
  ViewChild,
} from '@angular/core';
import PROJECTS_DATA from '../core/data/projectsData';
import { IProject } from '../core/interfaces';
import { animationFrameScheduler, interval, scan, startWith, Subject, Subscription, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-projects-slider',
  templateUrl: './projects-slider.component.html',
  styleUrls: ['./projects-slider.component.scss']
})
export class ProjectsSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('slider', {static: true}) slider!: ElementRef;
  @ViewChild('slide') slide!: ElementRef;
  public projects: IProject[] = PROJECTS_DATA;
  public slide$!: Subscription;

  private slideDimension!: number;
  private translationAxis!: string;
  private resize$ = new Subject<void>();

  @HostListener('window:resize') onResize() {
    this.configureSlider();
    this.resize$.next();
  }

  ngAfterViewInit() {
    this.configureSlider();
    this.resize$.pipe(
      startWith('init'),
      tap(this.resetOffset.bind(this)),
      switchMap(() => {
      return interval(0, animationFrameScheduler).pipe(
        scan<number, { data: IProject[], current: number}>((state, val) => {
        state.data = state.data.map((item) => ({...item, offset: item.offset - 1, transform: `translate${this.translationAxis}(${item.offset}px)` }));

        if (val && val % this.slideDimension === 0) {
          state.data[state.current].offset += this.slideDimension * this.projects.length;
          state.current = state.current === this.projects.length - 1 ? 0 : state.current += 1;
        }

        this.projects = state.data;

        return state;
      }, { data: this.projects, current: 0}))
    })).subscribe()
  }

  private configureSlider(): void {
    const { marginBlock, marginInline } = getComputedStyle(this.slide.nativeElement)
    const { offsetWidth, offsetHeight } = this.slide.nativeElement
    this.slideDimension = Math.trunc(innerWidth < 600
      ? offsetWidth + 2 * parseInt(marginInline)
      : offsetHeight + 2 * parseInt(marginBlock));
    this.translationAxis = innerWidth < 600 ? 'X' : 'Y';
  }

  private resetOffset(): void {
    this.projects.forEach(project => {
    project.offset = 0;
    project.transform = '';
  });
}
  ngOnDestroy() {
    this.slide$.unsubscribe();
  }

}
