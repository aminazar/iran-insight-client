
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BidiModule} from '@angular/cdk/bidi';
import {BreadcrumbModule} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';


// Shared Services and components
import {AuthService} from '../shared/services/auth.service';
import {BreadcrumbService} from '../shared/services/breadcrumb.service';
import {RestService} from '../shared/services/rest.service';
import {SearchService} from '../shared/services/search.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from '../site/home/home.component';
import {AdminHomeComponent} from '../admin/home/home.component';
import {ProgressService} from '../shared/services/progress.service';
import {UnderConstructionComponent} from '../shared/components/underConstruction/under-construction.component';

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
    material.MatNativeDateModule,
    material.MatAutocompleteModule,
    material.MatProgressBarModule,
    material.MatDialogModule,
    material.MatPaginatorModule,
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
    UnderConstructionComponent,
  ],
  providers: [
    BreadcrumbService, AuthService, RestService, SearchService, ProgressService],
  exports: [
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
    material.MatNativeDateModule,
    material.MatAutocompleteModule,
    material.MatProgressBarModule,
    material.MatDialogModule,
    material.MatPaginatorModule,
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

