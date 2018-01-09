import {RouterModule, Routes} from '@angular/router';
import {InvestmentComponent} from './investment.component';
import {InvestmentFormComponent} from './components/investment-form/investment-form.component';
import {InvestmentViewComponent} from './components/investment-view/investment-view.component';

const INVESTMENT_ROUTES: Routes = [
  {path: ':id/:name', component: InvestmentComponent},
  {path: 'form/:type/:is_investor/:id/:invid', component: InvestmentFormComponent},
  {path: 'form/:is_investor/:id/:invid', component: InvestmentFormComponent},
  {path: 'view/:type/:is_investor/:id/:invid', component: InvestmentViewComponent},
  {path: 'view/:is_investor/:id/:invid', component: InvestmentViewComponent},
];

export const investmentRouting = RouterModule.forChild(INVESTMENT_ROUTES);
