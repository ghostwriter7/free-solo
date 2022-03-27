import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsContainerComponent } from './projects-container/projects-container.component';
import { ProjectsSliderComponent } from './projects-slider/projects-slider.component';
import { ProjectPreviewComponent } from './project-preview/project-preview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsContainerComponent,
    ProjectsSliderComponent,
    ProjectPreviewComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class ProjectsModule { }
