import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './auth.guard';
import {AdminHomeComponent} from './home/home.component';
import {RouterTestingModule} from '@angular/router/testing';

const Admin_ROUTES: Routes = [
  {
    path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], children:
    [
      {path: 'type', loadChildren: 'app/admin/type/type.module#TypeModule', canActivate: [AuthGuard]},
      {path: 'person', loadChildren: 'app/admin/person/person.module#PersonModule', canActivate: [AuthGuard]},
      {path: 'product', loadChildren: 'app/admin/product/product.module#ProductModule', canActivate: [AuthGuard]},
      {path: 'event', loadChildren: 'app/admin/event/event.module#EventModule', canActivate: [AuthGuard]},
      {path: 'business', loadChildren: 'app/admin/business/business.module#BusinessModule', canActivate: [AuthGuard]},
      {path: 'expertise', loadChildren: 'app/admin/expertise/expertise.module#ExpertiseModule', canActivate: [AuthGuard]},
      {path: 'attendance', loadChildren: 'app/admin/attendance/attendance.module#AttendanceModule', canActivate: [AuthGuard]},
      {path: 'profile', loadChildren: 'app/site/profile/profile.module#ProfileModule', canActivate: [AuthGuard]},
      {path: 'investment', loadChildren: 'app/admin/investment/investment.module#InvestmentModule', canActivate: [AuthGuard]},
      {path: 'consultancy', loadChildren: 'app/admin/consultancy/consultancy.module#ConsultancyModule', canActivate: [AuthGuard]},
      {path: 'organization', loadChildren: 'app/admin/organization/organization.module#OrganizationModule', canActivate: [AuthGuard]},
      {path: 'exdata', loadChildren: 'app/admin/externalData/externalData.module#ExternalDataModule', canActivate: [AuthGuard]},
      // {path: 'lce/:type/:id', loadChildren: 'app/admin/LCE/lce.module#LCEModule', canActivate: [AuthGuard]},
    ],
  },
  {path: 'admin/login', loadChildren: 'app/admin/login/login.module#LoginModule'},
];

export const AdminRouting = RouterModule.forChild(Admin_ROUTES);
export const AdminTestRouting = RouterTestingModule.withRoutes(Admin_ROUTES);
