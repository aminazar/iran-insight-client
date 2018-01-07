import {RouterModule, Routes} from '@angular/router';
import {ExpertiseComponent} from './expertise.component';
import {ExpertiseFormComponent} from './expertise-form/expertise-form.component';
import {ExpertiseViewComponent} from './expertise-view/expertise-view.component';
import {LeavingGuard} from '../leavingGuard';

const Expertise_ROUTES: Routes = [
  {path: '', component: ExpertiseComponent, pathMatch: 'full'},
  // this shows all the expertises
  {path: ':id', component: ExpertiseViewComponent},
  {path: 'form/:pid/:id', component: ExpertiseFormComponent, canDeactivate: [LeavingGuard]},
  // if pid == null -> we are creating new expertise by admin
  // if pid != null -> a person is trying to add new expertise
];

export const expertiseRouting = RouterModule.forChild(Expertise_ROUTES);
