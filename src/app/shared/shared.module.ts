import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BreadcrumbService} from './services/breadcrumb.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material';
import {BidiModule} from '@angular/cdk/bidi';
import {BreadcrumbModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,

  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    BidiModule,
    BreadcrumbModule,
  ],
  providers: [BreadcrumbService],
  exports: [HeaderComponent]
})
export class SharedModule {
}
