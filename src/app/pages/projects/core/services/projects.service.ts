import { Injectable } from '@angular/core';
import { IProject } from '../interfaces';
import PROJECTS_DATA from '../data/projectsData';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private selectedProject: IProject = PROJECTS_DATA[0];
  public selectedProject$ = new BehaviorSubject<IProject>(this.selectedProject);
  public sliderHeight$ = new Subject<string>();

  public selectProject(project: IProject): void {
    this.selectedProject = { ...project };
    this.selectedProject$.next(this.selectedProject);
  }

  public updateSliderHeight(height: number): void {
    this.sliderHeight$.next(height + 'px');
  }
}
