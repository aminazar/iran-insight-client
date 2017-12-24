import {RouterModule, Routes} from '@angular/router';
import {BusinessComponent} from './business.component';
import {BusinessMembersComponent} from './components/business-members/business-members.component';
import {BusinessInfoComponent} from './components/business-info/business-info.component';
import {BusinessProductsComponent} from './components/business-products/business-products.component';

const BUSINESS_ROUTES: Routes = [
  {path: '', component: BusinessComponent, pathMatch: 'full'},
  {path: 'members/:bid', component: BusinessMembersComponent},
  {path: 'product/:bid', component: BusinessProductsComponent},
  {path: 'upsert/:bid', component: BusinessInfoComponent},
];

export const businessRouting = RouterModule.forChild(BUSINESS_ROUTES);
