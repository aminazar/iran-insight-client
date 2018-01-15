import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {ExternalDataComponent} from './external-data.component';

const externalData_ROUTES: Routes = [
  {path: '', component: ExternalDataComponent, pathMatch: 'full', canActivate: [AuthGuard]},
];

export const externalDataRouting = RouterModule.forChild(externalData_ROUTES);
