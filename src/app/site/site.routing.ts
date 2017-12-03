import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RouterTestingModule} from '@angular/router/testing';

const Site_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'profile', loadChildren: 'app/site/profile/profile.module#ProfileModule'},
];

export const SiteRouting = RouterModule.forChild(Site_ROUTES);
export const SiteTestRouting = RouterTestingModule.withRoutes(Site_ROUTES);
