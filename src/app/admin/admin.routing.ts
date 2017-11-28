import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';


const Admin_ROUTES: Routes = [
  {path: 'admin', redirectTo: 'admin/home', pathMatch: 'full'},
  {path: 'admin/home', component: HomeComponent},
  {path: 'admin/type', loadChildren: 'app/admin/type/type.module#TypeModule'},

];

export const adminRouting = RouterModule.forChild(Admin_ROUTES);
