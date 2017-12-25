import {Routes, RouterModule} from '@angular/router';
import {LCEComponent} from './lce.component';
import {LceFormComponent} from './components/lce-form/lce-form.component';


const LCE_ROUTES: Routes = [
  {path: '', component: LCEComponent, pathMatch: 'full'},
  {path: 'form/:formId', component: LceFormComponent, pathMatch: 'full'},

];

export const LCERouting = RouterModule.forChild(LCE_ROUTES);
