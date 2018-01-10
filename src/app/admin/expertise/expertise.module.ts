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
  MatCheckboxModule,
  MatNativeDateModule,
  MatGridListModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import {ExpertiseViewComponent} from './expertise-view/expertise-view.component';

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
    MatCheckboxModule,
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
    ExpertiseViewComponent,
  ],
})
export class ExpertiseModule {

}
