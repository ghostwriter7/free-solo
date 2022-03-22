import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ModalComponent } from './modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PageHeaderComponent,
    WrapperComponent,
    ModalComponent
  ],
  exports: [
    PageHeaderComponent,
    WrapperComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
