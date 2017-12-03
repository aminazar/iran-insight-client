import { Routes, RouterModule } from '@angular/router';
import {PersonComponent} from './person.component';
import {PersonFormComponent} from './components/person-form/person-form.component';


const PERSON_ROUTES: Routes = [
    { path: '', component: PersonComponent},
    { path: ':id', component: PersonFormComponent}
];

export const personRouting = RouterModule.forChild(PERSON_ROUTES);
