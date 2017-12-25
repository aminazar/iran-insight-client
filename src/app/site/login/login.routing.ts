import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';

const Login_ROUTES: Routes = [
  {path: '', component: LoginComponent}
];

export const loginRouting = RouterModule.forChild(Login_ROUTES);
