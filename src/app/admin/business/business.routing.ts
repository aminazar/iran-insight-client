import {RouterModule, Routes} from '@angular/router';
import {BusinessComponent} from './business.component';
import {BusinessMembersComponent} from './components/business-members/business-members.component';
import {BusinessInfoComponent} from './components/business-info/business-info.component';
import {BusinessProductsComponent} from './components/business-products/business-products.component';
import {BusinessViewComponent} from './components/business-view/business-view.component';
import {AuthGuard} from '../auth.guard';

const BUSINESS_ROUTES: Routes = [
  {path: '', component: BusinessComponent, pathMatch: 'full'},
  {path: 'members/:bid', component: BusinessMembersComponent},
  {path: 'product/:bid', component: BusinessProductsComponent},
  {path: 'upsert/:bid', component: BusinessInfoComponent},
  {path: 'view/:bid', component: BusinessViewComponent },
  {path: 'lce/:id/:companyName', loadChildren: 'app/admin/lce/lce.module#LCEModule', canActivate: [AuthGuard]},
  {path: 'investment/:bid', loadChildren: 'app/admin/investment/investment.module#InvestmentModule'},
];

export const businessRouting = RouterModule.forChild(BUSINESS_ROUTES);
