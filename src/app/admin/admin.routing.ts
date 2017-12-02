import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './auth.guard';
import {AdminHomeComponent} from './home/home.component';

const Admin_ROUTES: Routes = [
  {
    path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], children:
    [
      {path: 'type', loadChildren: 'app/admin/type/type.module#TypeModule', canActivate: [AuthGuard]},
      {path: 'person', loadChildren: 'app/admin/person/person.module#PersonModule', canActivate: [AuthGuard]},
    ],
  },
  {path: 'admin/login', loadChildren: 'app/admin/login/login.module#LoginModule'},
];

export const adminRouting = RouterModule.forChild(Admin_ROUTES);
