import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ChoosePasswordComponent} from './components/choose-password/choose-password.component';

const Login_ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'activate/:link', component: ChoosePasswordComponent},
];

export const loginRouting = RouterModule.forChild(Login_ROUTES);
