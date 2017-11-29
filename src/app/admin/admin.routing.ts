import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './auth.guard';
import {AdminHomeComponent} from './home/home.component';
import {RouterTestingModule} from '@angular/router/testing';

const Admin_ROUTES: Routes = [
  {
    path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], children:
    [
      {path: 'type', loadChildren: 'app/admin/type/type.module#TypeModule', canActivate: [AuthGuard]},
    ],
  },
  {path: 'admin/login', loadChildren: 'app/admin/login/login.module#LoginModule'},
];

export const AdminRouting = RouterModule.forChild(Admin_ROUTES);
export const AdminTestRouting = RouterTestingModule.withRoutes(Admin_ROUTES);
