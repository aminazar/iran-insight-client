import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './auth.guard';
import {AdminHomeComponent} from './home/home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UndercontructionComponent} from "../shared/components/undercontruction/undercontruction.component";

const Admin_ROUTES: Routes = [
  {
    path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], children:
    [
      {path: 'type', loadChildren: 'app/admin/type/type.module#TypeModule', canActivate: [AuthGuard]},
      {path: 'person', loadChildren: 'app/admin/person/person.module#PersonModule', canActivate: [AuthGuard]},
      {path: 'product', loadChildren: 'app/admin/product/product.module#ProductModule', canActivate: [AuthGuard]},
      {path: 'business', component: UndercontructionComponent},
      {path: 'organization', component: UndercontructionComponent},
      {path: 'expertise', component: UndercontructionComponent},
      {path: 'investment', component: UndercontructionComponent},
      {path: 'consultancy', component: UndercontructionComponent},
      {path: 'lce', component: UndercontructionComponent},
      {path: 'event', component: UndercontructionComponent},
    ],
  },
  {path: 'admin/login', loadChildren: 'app/admin/login/login.module#LoginModule'},
];

export const AdminRouting = RouterModule.forChild(Admin_ROUTES);
export const AdminTestRouting = RouterTestingModule.withRoutes(Admin_ROUTES);
