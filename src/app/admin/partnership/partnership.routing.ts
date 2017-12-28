import {Routes, RouterModule} from '@angular/router';
import {PartnershipComponent} from './partnership.component';
import {PartnershipViewComponent} from './components/partnership-view/partnership-view.component';
import {PartnershipFormComponent} from './components/partnership-form/partnership-form.component';


const PARTNERSHIP_ROUTES: Routes = [
  {path: '', component: PartnershipComponent, pathMatch: 'full'},
  {path: 'form/:formId', component: PartnershipFormComponent, pathMatch: 'full'},
  {path: 'view/:formId', component: PartnershipViewComponent, pathMatch: 'full'},

];

export const PartnershipRouting = RouterModule.forChild(PARTNERSHIP_ROUTES);
