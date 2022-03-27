import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../core/services/projects.service';
import { IProject } from '../core/interfaces';
import { IconsService } from '../../../core/services';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss']
})
export class ProjectPreviewComponent implements OnInit {
  public selectedProject!: IProject;

  constructor(
    public iconsService: IconsService,
    private _projectsService: ProjectsService) { }

  ngOnInit(): void {
    this._projectsService.selectedProject$.subscribe((project) => {
      this.selectedProject = project;
    });
  }

}
