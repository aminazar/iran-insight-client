import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule, MatTabsModule
} from '@angular/material';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {SharedModule} from '../../shared/shared.module';
import { PersonExpertiseComponent } from './components/person-expertise/person-expertise.component';
import { PersonPartnershipComponent } from './components/person-partnership/person-partnership.component';
import {personRouting} from './person.routing';
import {PersonComponent} from './person.component';

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
  ],
  declarations: [
    PersonComponent,
    PersonFormComponent,
    PersonExpertiseComponent,
    PersonPartnershipComponent,
  ],
})
export class PersonModule {
}
