import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ModalComponent } from './modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlaceholderDirective } from '../core/directives/placeholder.directive';

@NgModule({
  declarations: [
    PageHeaderComponent,
    WrapperComponent,
    ModalComponent,
    PlaceholderDirective,
  ],
  exports: [
    PageHeaderComponent,
    WrapperComponent,
    ModalComponent,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
