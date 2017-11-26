import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BreadcrumbService} from './services/breadcrumb.service';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,

  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule

  ],
  providers: [BreadcrumbService],
  exports: [HeaderComponent]
})
export class SharedModule {
}
