import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatOptionModule, MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../../shared/shared.module';
import {PartnershipRouting} from './partnership.routing';
import { PartnershipComponent } from './partnership.component';
import { PartnershipFormComponent } from './components/partnership-form/partnership-form.component';
import { PartnershipViewComponent } from './components/partnership-view/partnership-view.component';

@NgModule({
  imports: [
    CommonModule,
    PartnershipRouting,
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
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatPaginatorModule
  ],
  declarations: [PartnershipComponent, PartnershipFormComponent, PartnershipViewComponent],
  entryComponents: [PartnershipFormComponent]
})
export class PartnershipModule { }
