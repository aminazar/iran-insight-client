import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person.component';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {PersonDetailsComponent} from "./components/person-details/person-details.component";
import {PersonViewComponent} from "./components/person-view/person-view.component";

const Person_ROUTES: Routes = [
  {path: '', component: PersonComponent, pathMatch: 'full'},
  {path: ':id', component: PersonViewComponent},
  {path: 'form/:id', component: PersonFormComponent},
];

export const personRouting = RouterModule.forChild(Person_ROUTES);
