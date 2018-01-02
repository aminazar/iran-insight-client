import {NgModule} from '@angular/core';
import {investmentRouting} from './investment.routing';
import {InvestmentComponent} from './investment.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import {MatButtonModule, MatCardModule, MatDialogModule, MatIconModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';

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
  ],
  declarations: [InvestmentComponent, InvestmentFormComponent],
})
export class InvestmentModule { }
