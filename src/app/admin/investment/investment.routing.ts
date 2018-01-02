import {RouterModule, Routes} from '@angular/router';
import {InvestmentComponent} from './investment.component';

const INVESTMENT_ROUTES: Routes = [
  {path: '', component: InvestmentComponent},
];

export const investmentRouting = RouterModule.forChild(INVESTMENT_ROUTES);
