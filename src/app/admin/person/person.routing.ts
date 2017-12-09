import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person.component';
import {PersonFormComponent} from './components/person-form/person-form.component';

const Person_ROUTES: Routes = [
  {path: '', component: PersonComponent, pathMatch: 'full'},
  {path: ':id', component: PersonFormComponent},
];

export const personRouting = RouterModule.forChild(Person_ROUTES);
