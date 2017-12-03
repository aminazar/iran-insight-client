import { Routes, RouterModule } from '@angular/router';
import {TypeComponent} from './type.component';
import {TypeFormComponent} from './type-form/type-form.component';


const TYPE_ROUTES: Routes = [
    { path: '', component: TypeComponent, pathMatch: 'full'},
    { path: ':id', component: TypeFormComponent}
];

export const typeRouting = RouterModule.forChild(TYPE_ROUTES);
