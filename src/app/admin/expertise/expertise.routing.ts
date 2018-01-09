import {RouterModule, Routes} from '@angular/router';
import {ExpertiseComponent} from './expertise.component';
import {ExpertiseFormComponent} from './expertise-form/expertise-form.component';
import {ExpertiseViewComponent} from './expertise-view/expertise-view.component';
import {LeavingGuard} from '../leavingGuard';

const Expertise_ROUTES: Routes = [
  {path: '', component: ExpertiseComponent, pathMatch: 'full'},
  {path: ':id', component: ExpertiseViewComponent},
  {path: 'form/:id', component: ExpertiseFormComponent, canDeactivate: [LeavingGuard]},
];

export const expertiseRouting = RouterModule.forChild(Expertise_ROUTES);
