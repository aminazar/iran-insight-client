import {Routes, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './home/home.component';


const Admin_ROUTES: Routes = [
  {path: 'admin', redirectTo: 'admin/home', pathMatch: 'full'},
  {path: 'admin/home', component: AdminHomeComponent},
];

export const adminRouting = RouterModule.forChild(Admin_ROUTES);
