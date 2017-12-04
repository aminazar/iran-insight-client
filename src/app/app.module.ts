import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {SiteModule} from './site/site.module';
import {AdminModule} from './admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RestService} from './shared/services/rest.service';
import {SearchService} from './shared/services/search.service';
import {AuthService} from './shared/services/auth.service';
import {BreadcrumbService} from './shared/services/breadcrumb.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    SiteModule,
    AdminModule,
    RouterModule.forRoot([])
  ],
  providers: [RestService, SearchService, AuthService, BreadcrumbService],

  bootstrap: [AppComponent]
})
export class AppModule {
}
