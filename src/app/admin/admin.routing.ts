import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';


const Admin_ROUTES: Routes = [
  {path: 'admin', redirectTo: 'admin/home', pathMatch: 'full'},
  {path: 'admin/home', component: HomeComponent},
];

export const adminRouting = RouterModule.forChild(Admin_ROUTES);
