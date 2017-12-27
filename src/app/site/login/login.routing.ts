import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ChoosePasswordComponent} from './components/choose-password/choose-password.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {OAuthHandlerComponent} from './components/o-auth-handler/o-auth-handler.component';

const Login_ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'activate/:link', component: ChoosePasswordComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'oauth', component: OAuthHandlerComponent},
];

export const loginRouting = RouterModule.forChild(Login_ROUTES);
