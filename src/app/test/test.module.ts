import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {HeaderComponent} from '../shared/components/header/header.component';
import {BreadcrumbComponent} from '../shared/components/breadcrumb/breadcrumb.component';
import {FormsModule} from '@angular/forms';
import {BreadcrumbService} from '../shared/services/breadcrumb.service';
import {BidiModule} from '@angular/cdk/bidi';
import {BreadcrumbModule} from 'primeng/primeng';
import {HomeComponent} from '../site/home/home.component';
import {ProfileComponent} from '../site/profile/profile.component';
import {AppComponent} from "../app.component";
import {AdminHomeComponent} from '../admin/home/home.component';


@NgModule({
  imports: [
    CommonModule,
    RouterTestingModule,
    material.MatFormFieldModule,
    material.MatInputModule,
    material.MatToolbarModule,
    material.MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    BidiModule,
    BreadcrumbModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminHomeComponent,
    BreadcrumbComponent,
    ProfileComponent,
    HomeComponent,
  ],
  providers: [BreadcrumbService],
})
export class TestModule { }
