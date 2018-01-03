import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule, MatTableModule, MatTabsModule
} from '@angular/material';
import {ImageUploadModule} from 'angular2-image-upload';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {SharedModule} from '../../shared/shared.module';
import { PersonExpertiseComponent } from './components/person-expertise/person-expertise.component';
import { PersonPartnershipComponent } from './components/person-partnership/person-partnership.component';
import {personRouting} from './person.routing';
import {PersonComponent} from './person.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonViewComponent } from './components/person-view/person-view.component';

@NgModule({
  imports: [
    personRouting,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatPaginatorModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    PersonComponent,
    PersonFormComponent,
    PersonExpertiseComponent,
    PersonPartnershipComponent,
    PersonDetailsComponent,
    PersonViewComponent,
  ],
  entryComponents: [PersonDetailsComponent, PersonViewComponent, PersonFormComponent]
})
export class PersonModule {
}
