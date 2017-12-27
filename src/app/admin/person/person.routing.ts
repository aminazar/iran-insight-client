import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person.component';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {PersonViewComponent} from './components/person-view/person-view.component';
import {LeavingGuard} from '../leavingGuard';
import {AuthGuard} from '../auth.guard';

const Person_ROUTES: Routes = [
  {path: '', component: PersonComponent, pathMatch: 'full'},
  {path: 'view/:id', component: PersonViewComponent},
  {path: 'form/:formId', component: PersonFormComponent, canDeactivate: [LeavingGuard]},
  {path: 'partnership/:id/:personName', loadChildren: 'app/admin/partnership/partnership.module#PartnershipModule'},

];

export const personRouting = RouterModule.forChild(Person_ROUTES);
