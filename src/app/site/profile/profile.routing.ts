import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';


const PROFILE_ROUTES: Routes = [
    { path: '', component: ProfileComponent}
];

export const loginRouting = RouterModule.forChild(PROFILE_ROUTES);
