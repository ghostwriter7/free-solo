import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { WrapperComponent } from './wrapper/wrapper.component';



@NgModule({
  declarations: [
    PageHeaderComponent,
    WrapperComponent
  ],
  exports: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
