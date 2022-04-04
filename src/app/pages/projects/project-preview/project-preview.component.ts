import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ProjectsService } from '../core/services/projects.service';
import { IProject } from '../core/interfaces';
import { IconsService } from '../../../core/services';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectPreviewComponent implements OnInit, AfterViewInit {
  @ViewChild('project') projectEl!: ElementRef;
  public tooltipMap: {[key: string]: string} = {
    'angular': 'Angular',
    'js': 'JavaScript',
    'html': 'HTML5',
    'css': 'CSS3',
    'react': 'React'
  };
  public selectedProject!: IProject;
  private _sliderHeight!: number;
  private _subscription!: Subscription;

  constructor(
    public iconsService: IconsService,
    private _projectsService: ProjectsService,
    private _cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._projectsService.selectedProject$.subscribe((project) => {
      this.selectedProject = project;
      this._cdRef.detectChanges();
    });
  }

  ngAfterViewInit() {
    this._sliderHeight = this.projectEl.nativeElement.getBoundingClientRect().height;
    this._projectsService.updateSliderHeight(this._sliderHeight);
    this._subscription = fromEvent(window, 'resize').subscribe(() => {
      this._sliderHeight = this.projectEl.nativeElement.getBoundingClientRect().height;
      this._projectsService.updateSliderHeight(this._sliderHeight);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
