import {Routes, RouterModule} from '@angular/router';
import {LCEComponent} from './lce.component';
import {LceFormComponent} from './components/lce-form/lce-form.component';
import {LceViewComponent} from './components/lce-view/lce-view.component';


const LCE_ROUTES: Routes = [
  {path: '', component: LCEComponent, pathMatch: 'full'},
  {path: 'form/:formId', component: LceFormComponent, pathMatch: 'full'},
  {path: 'view/:formId', component: LceViewComponent, pathMatch: 'full'},

];

export const LCERouting = RouterModule.forChild(LCE_ROUTES);
