import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HeaderComponent} from '../shared/components/header/header.component';
import {BreadcrumbComponent} from '../shared/components/breadcrumb/breadcrumb.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreadcrumbService} from '../shared/services/breadcrumb.service';
import {AuthService} from '../shared/services/auth.service';
import {BidiModule} from '@angular/cdk/bidi';
import {BreadcrumbModule} from 'primeng/primeng';
import {HomeComponent} from '../site/home/home.component';
import {ProfileComponent} from '../site/profile/profile.component';
import {AppComponent} from '../app.component';
import {AdminHomeComponent} from '../admin/home/home.component';
import {LoginComponent} from '../admin/login/login.component';
import {RestService} from '../shared/services/rest.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SearchService} from '../shared/services/search.service';
import {SearchFieldsComponent} from '../site/search/search-fields/search-fields.component';
import {SearchMainComponent} from '../site/search/search-main/search-main.component';
import {SearchResultComponent} from '../site/search/search-result/search-result.component';
import {TypeFormComponent} from '../admin/type/type-form/type-form.component';
import {TypeComponent} from '../admin/type/type.component';


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
    SearchResultComponent,
    SearchMainComponent,
    TypeFormComponent,
    TypeComponent,
  ],
  providers: [BreadcrumbService, AuthService, RestService, SearchService],
})
export class TestModule { }
