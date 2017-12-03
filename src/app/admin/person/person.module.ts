import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule, MatTabsModule
} from "@angular/material";
import {PersonComponent} from "./person.component";
import {PersonFormComponent} from './person-form/person-form.component';
import {personRouting} from "./person.routing";
import {SharedModule} from "../../shared/shared.module";
import { PersonExpertiseComponent } from './person-expertise/person-expertise.component';
import { PersonPartnershipComponent } from './person-partnership/person-partnership.component';

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
