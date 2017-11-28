import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {FormsModule} from '@angular/forms';
import {BreadcrumbService} from './services/breadcrumb.service';
import {BidiModule} from '@angular/cdk/bidi';
import {BreadcrumbModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {RestService} from "./services/rest.service";
import {SearchService} from "./services/search.service";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,

  ],
  imports: [
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    BidiModule,
    BreadcrumbModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [RestService, SearchService, AuthService, BreadcrumbService],
  exports: [
    HeaderComponent,

  ]
})
export class SharedModule {
}
