import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './auth.guard';
import {AdminHomeComponent} from './home/home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UnderConstructionComponent} from "../shared/components/underConstruction/under-construction.component";

const Admin_ROUTES: Routes = [
  {
    path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], children:
    [
      {path: 'type', loadChildren: 'app/admin/type/type.module#TypeModule', canActivate: [AuthGuard]},
      {path: 'person', loadChildren: 'app/admin/person/person.module#PersonModule', canActivate: [AuthGuard]},
      {path: 'product', loadChildren: 'app/admin/product/product.module#ProductModule', canActivate: [AuthGuard]},
      {path: 'business', loadChildren: 'app/admin/business/business.module#BusinessModule', canActivate: [AuthGuard]},
      {path: 'lce/:type/:id', loadChildren: 'app/admin/LCE/lce.module#LCEModule', canActivate: [AuthGuard]},
    ],
  },
  {path: 'admin/organization', component: UnderConstructionComponent},
  {path: 'admin/expertise', component: UnderConstructionComponent},
  {path: 'admin/investment', component: UnderConstructionComponent},
  {path: 'admin/consultancy', component: UnderConstructionComponent},
  {path: 'admin/event', component: UnderConstructionComponent},
  {path: 'admin/login', loadChildren: 'app/admin/login/login.module#LoginModule'},
];

export const AdminRouting = RouterModule.forChild(Admin_ROUTES);
export const AdminTestRouting = RouterTestingModule.withRoutes(Admin_ROUTES);
