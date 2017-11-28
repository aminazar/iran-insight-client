import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';


const Site_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', loadChildren: 'app/site/login/login.module#LoginModule'},
  {path: 'search', loadChildren: 'app/site/search/search.module#SearchModule'},
];

export const siteRouting = RouterModule.forChild(Site_ROUTES);
