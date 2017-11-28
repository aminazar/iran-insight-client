import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from "./auth.guard";
import {AdminHomeComponent} from "./home/home.component";

const Admin_ROUTES: Routes = [
  {path: 'admin', redirectTo: 'admin/home', pathMatch: 'full'},
  {path: 'admin/home', component: AdminHomeComponent, canActivate: [AuthGuard]},
  {path: 'admin/type', loadChildren: 'app/admin/type/type.module#TypeModule', canActivate: [AuthGuard]},
  {path: 'admin/login', loadChildren: 'app/admin/login/login.module#LoginModule'},
];

export const adminRouting = RouterModule.forChild(Admin_ROUTES);
