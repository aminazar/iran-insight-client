import {RouterModule, Routes} from '@angular/router';
import {BusinessComponent} from './business.component';
import {BusinessMembersComponent} from './components/business-members/business-members.component';
import {BusinessInfoComponent} from './components/business-info/business-info.component';
import {BusinessProductsComponent} from './components/business-products/business-products.component';
import {BusinessViewComponent} from './components/business-view/business-view.component';
import {AuthGuard} from '../auth.guard';
import {BizMemberFormComponent} from './components/biz-member-form/biz-member-form.component';
import {BizMemberViewComponent} from './components/biz-member-view/biz-member-view.component';

const BUSINESS_ROUTES: Routes = [
  {path: '', component: BusinessComponent, pathMatch: 'full'},
  {path: 'members/:bid', component: BusinessMembersComponent},
  {path: 'member/form/:bid/:mid', component: BizMemberFormComponent},
  {path: 'member/:bid/:mid', component: BizMemberViewComponent},
  {path: 'product/:bid', component: BusinessProductsComponent},
  {path: 'upsert/:bid', component: BusinessInfoComponent},
  {path: 'view/:bid', component: BusinessViewComponent },
  {path: 'lce/:id/:companyName', loadChildren: 'app/admin/lce/lce.module#LCEModule', canActivate: [AuthGuard]},
];

export const businessRouting = RouterModule.forChild(BUSINESS_ROUTES);
