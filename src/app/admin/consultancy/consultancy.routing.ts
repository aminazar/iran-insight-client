import {RouterModule, Routes} from '@angular/router';
import {ConsultancyComponent} from './consultancy.component';
import {ConsultancyFormComponent} from './components/consultancy-form/consultancy-form.component';
import {ConsultancyViewComponent} from './components/consultancy-view/consultancy-view.component';

const CONSULTANCY_ROUTES: Routes = [
  {path: ':id/:name', component: ConsultancyComponent},
  {path: 'form/:type/:is_consulting/:id/:cnsid', component: ConsultancyFormComponent},
  {path: 'form/:is_consulting/:id/:cnsid', component: ConsultancyFormComponent},
  {path: 'view/:type/:is_consulting/:id/:cnsid', component: ConsultancyViewComponent},
  {path: 'view/:is_consulting/:id/:cnsid', component: ConsultancyViewComponent},
];

export const consultancyRouting = RouterModule.forChild(CONSULTANCY_ROUTES);
