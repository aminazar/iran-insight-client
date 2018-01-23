import { Routes, RouterModule } from '@angular/router';
import {TypeComponent} from './type.component';
import {TypeFormComponent} from './components/type-form/type-form.component';
import {LeavingGuard} from '../leavingGuard';


const TYPE_ROUTES: Routes = [
    { path: '', component: TypeComponent, pathMatch: 'full'},
  // {path: 'view/:id', component: PersonViewComponent},
  {path: 'form/:typeName/:formId', component: TypeFormComponent, canDeactivate: [LeavingGuard]},

];

export const typeRouting = RouterModule.forChild(TYPE_ROUTES);
