import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatRadioModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {consultancyRouting} from './consultancy.routing';
import { ConsultancyComponent } from './consultancy.component';
import { ConsultancyFormComponent } from './components/consultancy-form/consultancy-form.component';
import { ConsultancyViewComponent } from './components/consultancy-view/consultancy-view.component';

@NgModule({
  imports: [
    consultancyRouting,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  declarations: [ConsultancyComponent, ConsultancyFormComponent, ConsultancyViewComponent],
})
export class ConsultancyModule { }
