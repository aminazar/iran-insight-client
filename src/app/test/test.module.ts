import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BidiModule} from '@angular/cdk/bidi';
import {BreadcrumbModule} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';


// Admin

// Shared Services and components
import {AuthService} from '../shared/services/auth.service';
import {BreadcrumbService} from '../shared/services/breadcrumb.service';
import {RestService} from '../shared/services/rest.service';
import {SearchService} from '../shared/services/search.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from '../site/home/home.component';
import {AdminHomeComponent} from '../admin/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    material.MatFormFieldModule,
    material.MatInputModule,
    material.MatToolbarModule,
    material.MatCardModule,
    material.MatButtonModule,
    material.MatIconModule,
    material.MatOptionModule,
    material.MatCheckboxModule,
    material.MatSelectModule,
    material.MatDialogModule,
    material.MatMenuModule,
    material.MatDatepickerModule,
    material.MatSnackBarModule,
    material.MatTabsModule,
    material.MatAutocompleteModule,
    material.MatNativeDateModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BidiModule,
    BreadcrumbModule,
    HttpClientModule,
    HttpClientTestingModule,
  ],
  declarations: [
    HomeComponent,
    AdminHomeComponent,
  ],
  providers: [
    BreadcrumbService, AuthService, RestService, SearchService],
  exports: [
    CommonModule,
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
    material.MatDatepickerModule,
    material.MatMenuModule,
    material.MatSnackBarModule,
    material.MatTabsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BidiModule,
    BreadcrumbModule,
    HttpClientModule,
    HttpClientTestingModule,
  ],
})
export class TestModule { }
