import {NgModule} from '@angular/core';
import {investmentRouting} from './investment.routing';
import {InvestmentComponent} from './investment.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import { InvestmentViewComponent } from './components/investment-view/investment-view.component';

@NgModule({
  imports: [
    investmentRouting,
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
  ],
  declarations: [InvestmentComponent, InvestmentFormComponent, InvestmentViewComponent],
})
export class InvestmentModule { }
