import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BidiModule} from '@angular/cdk/bidi';
import {BreadcrumbModule} from 'primeng/primeng';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,
  MatMenuModule, MatNativeDateModule, MatOptionModule, MatProgressBarModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {HeaderComponent} from './components/header/header.component';
import {SearchFieldsComponent} from './components/search-fields/search-fields.component';
import {RemovingConfirmComponent} from './components/removing-confirm/removing-confirm.component';
import { UnderConstructionComponent } from './components/underConstruction/under-construction.component';
import { SuggestionComponent } from './components/suggestion/suggestion.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    SearchFieldsComponent,
    RemovingConfirmComponent,
    UnderConstructionComponent,
    SuggestionComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    BidiModule,
    BreadcrumbModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatOptionModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  entryComponents: [RemovingConfirmComponent, UnderConstructionComponent],
  exports: [
    HeaderComponent,
    SearchFieldsComponent,
    RemovingConfirmComponent,
    UnderConstructionComponent,
    SuggestionComponent,
  ]
})
export class SharedModule {
}
