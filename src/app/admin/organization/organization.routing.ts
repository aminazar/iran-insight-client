import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {OrganizationComponent} from './organization.component';

const ORGANIZATION_ROUTES: Routes = [
  {path: '', component: OrganizationComponent, pathMatch: 'full'},
  {path: 'lce/:id/:companyName', loadChildren: 'app/admin/lce/lce.module#LCEModule', canActivate: [AuthGuard]},
  {path: 'tag/:id/:name', loadChildren: 'app/admin/tag/tag.module#TagModule', canActivate: [AuthGuard]},
  {path: 'investment', loadChildren: 'app/admin/investment/investment.module#InvestmentModule', canActivate: [AuthGuard]},
  {path: 'consultancy', loadChildren: 'app/admin/consultancy/consultancy.module#ConsultancyModule', canActivate: [AuthGuard]},
];

export const organizationRouting = RouterModule.forChild(ORGANIZATION_ROUTES);
