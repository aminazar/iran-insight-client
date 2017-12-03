import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import * as material from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BidiModule} from '@angular/cdk/bidi';
import {BreadcrumbModule} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// App
import {AppComponent} from '../app.component';

// Admin
import {AdminHomeComponent} from '../admin/home/home.component';
import {LoginComponent} from '../admin/login/login.component';
import {TypeFormComponent} from '../admin/type/type-form/type-form.component';
import {TypeComponent} from '../admin/type/type.component';
import {ActiveDirective} from '../admin/type/active/active.directive';

// Shared Components
import {BreadcrumbComponent} from '../shared/components/breadcrumb/breadcrumb.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {SearchFieldsComponent} from '../shared/components/search-fields/search-fields.component';

// Shared Services
import {AuthService} from '../shared/services/auth.service';
import {BreadcrumbService} from '../shared/services/breadcrumb.service';
import {RestService} from '../shared/services/rest.service';
import {SearchService} from '../shared/services/search.service';

// Site
import {HomeComponent} from '../site/home/home.component';
import {ProfileComponent} from '../site/profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterTestingModule,
    BrowserAnimationsModule,
    material.MatFormFieldModule,
    material.MatInputModule,
    material.MatToolbarModule,
    material.MatButtonModule,
    material.MatCardModule,
    material.MatButtonModule,
    material.MatInputModule,
    material.MatIconModule,
    material.MatOptionModule,
    material.MatCheckboxModule,
    material.MatSelectModule,
    material.MatDialogModule,
    material.MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BidiModule,
    BreadcrumbModule,
    HttpClientModule,
    HttpClientTestingModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminHomeComponent,
    BreadcrumbComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    SearchFieldsComponent,
    TypeFormComponent,
    TypeComponent,
    ActiveDirective,
  ],
  providers: [BreadcrumbService, AuthService, RestService, SearchService],
})
export class TestModule { }
