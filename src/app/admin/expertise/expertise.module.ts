import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {expertiseRouting} from './expertise.routing';
import {SharedModule} from '../../shared/shared.module';
import {ExpertiseComponent} from './expertise.component';
import {ExpertiseFormComponent} from './expertise-form/expertise-form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MatGridListModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatInputModule
} from "@angular/material";

@NgModule({
  imports: [
    expertiseRouting,
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
  ],
  declarations: [
    ExpertiseComponent,
    ExpertiseFormComponent,
  ],
})
export class ExpertiseModule{

}
