import {RouterModule, Routes} from '@angular/router';
import {BusinessComponent} from './business.component';
import {BusinessMembersComponent} from './components/business-members/business-members.component';
import {BusinessInfoComponent} from './components/business-info/business-info.component';
import {AuthGuard} from '../auth.guard';

const BUSINESS_ROUTES: Routes = [
  {path: '', component: BusinessComponent, pathMatch: 'full'},
  {path: 'members/:bid', component: BusinessMembersComponent},
  {path: 'upsert/:bid', component: BusinessInfoComponent},
  {path: 'lce/:id', loadChildren: 'app/admin/LCE/lce.module#LCEModule', canActivate: [AuthGuard]},
];

export const businessRouting = RouterModule.forChild(BUSINESS_ROUTES);
