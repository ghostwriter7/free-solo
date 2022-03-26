import {
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import PROJECTS_DATA from '../core/data/projectsData';
import { IProject } from '../core/interfaces';
import { animationFrameScheduler, interval, scan, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-slider',
  templateUrl: './projects-slider.component.html',
  styleUrls: ['./projects-slider.component.scss']
})
export class ProjectsSliderComponent implements OnInit, OnDestroy {
  @ViewChild('slider', {static: true}) slider!: ElementRef;
  public projects: IProject[] = PROJECTS_DATA;
  public slide$!: Subscription;

  ngOnInit() {
    interval(0, animationFrameScheduler)
    .pipe(scan((state, val) => {
        state.data = state.data.map((item) => ({...item, offset: item.offset - 1, transform: `translateY(${item.offset}px)` }));

        if (val && val % 210 === 0) {
          state.data[state.current].offset += 210 * this.projects.length - 1;
          state.current = state.current === this.projects.length - 1 ? 0 : state.current += 1;
        }

        this.projects = state.data;

        return state;
      }, { data: this.projects, current: 0}),).subscribe()
  }

  ngOnDestroy() {
    this.slide$.unsubscribe();
  }

}
