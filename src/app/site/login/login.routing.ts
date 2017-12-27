import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ChoosePasswordComponent} from './components/choose-password/choose-password.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';

const Login_ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'activate/:link', component: ChoosePasswordComponent},
  {path: 'signup', component: SignUpComponent},
];

export const loginRouting = RouterModule.forChild(Login_ROUTES);
