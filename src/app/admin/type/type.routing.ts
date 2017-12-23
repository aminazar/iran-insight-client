import { Routes, RouterModule } from '@angular/router';
import {TypeComponent} from './type.component';


const TYPE_ROUTES: Routes = [
    { path: '', component: TypeComponent, pathMatch: 'full'},
];

export const typeRouting = RouterModule.forChild(TYPE_ROUTES);
