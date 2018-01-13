import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatDialogModule, MatIconModule, MatSnackBarModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule,
  MatAutocompleteModule, MatGridListModule, MatPaginatorModule, MatTabsModule, MatCardModule, MatInputModule,
  MatButtonModule, MatStepperModule, MatExpansionModule, MatAccordion
} from '@angular/material';
import {organizationRouting} from './organization.routing';
import {AgmCoreModule} from '@agm/core';
import { OrganizationComponent } from './organization.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { OrganizationViewComponent } from './components/organization-view/organization-view.component';

@NgModule({
  imports: [
    organizationRouting,
    CommonModule,
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
    MatStepperModule,
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtglbLDTFZFa1rE-glHm7bFxnp9iANHro'
    }),
  ],
  declarations: [OrganizationComponent, OrganizationFormComponent, OrganizationViewComponent],
})
export class OrganizationModule {
}
