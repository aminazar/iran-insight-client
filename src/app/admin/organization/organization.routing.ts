import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {OrganizationComponent} from './organization.component';
import {OrganizationViewComponent} from './components/organization-view/organization-view.component';
import {OrganizationFormComponent} from './components/organization-form/organization-form.component';

const ORGANIZATION_ROUTES: Routes = [
  {path: '', component: OrganizationComponent, pathMatch: 'full'},
  {path: 'form/:formId', component: OrganizationFormComponent},
  {path: 'view/:oid', component: OrganizationViewComponent},
  {path: 'lce/:id/:companyName', loadChildren: 'app/admin/lce/lce.module#LCEModule', canActivate: [AuthGuard]},
  {path: 'tag/:id/:name', loadChildren: 'app/admin/tag/tag.module#TagModule', canActivate: [AuthGuard]},
  {path: 'investment', loadChildren: 'app/admin/investment/investment.module#InvestmentModule', canActivate: [AuthGuard]},
  {path: 'consultancy', loadChildren: 'app/admin/consultancy/consultancy.module#ConsultancyModule', canActivate: [AuthGuard]},
];

export const organizationRouting = RouterModule.forChild(ORGANIZATION_ROUTES);
