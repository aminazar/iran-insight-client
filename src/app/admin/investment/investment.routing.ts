import {RouterModule, Routes} from '@angular/router';
import {InvestmentComponent} from './investment.component';
import {InvestmentFormComponent} from './components/investment-form/investment-form.component';
import {InvestmentViewComponent} from './components/investment-view/investment-view.component';

const INVESTMENT_ROUTES: Routes = [
  {path: ':id', component: InvestmentComponent},
  {path: 'form/:id', component: InvestmentFormComponent},
  {path: 'view/:id', component: InvestmentViewComponent},
];

export const investmentRouting = RouterModule.forChild(INVESTMENT_ROUTES);
