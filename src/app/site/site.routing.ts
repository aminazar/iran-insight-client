import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthGuard} from './auth.guard';

const Site_ROUTES: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', loadChildren: 'app/site/login/login.module#LoginModule'},
  {path: 'profile', loadChildren: 'app/site/profile/profile.module#ProfileModule', canActivate: [AuthGuard]},
];

export const SiteRouting = RouterModule.forChild(Site_ROUTES);
export const SiteTestRouting = RouterTestingModule.withRoutes(Site_ROUTES);
