import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {loginRouting} from './login.routing';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import {LoginComponent} from './login.component';
import {SharedModule} from '../../shared/shared.module';
import { ChoosePasswordComponent } from './components/choose-password/choose-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OAuthHandlerComponent } from './components/o-auth-handler/o-auth-handler.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    loginRouting,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  declarations: [LoginComponent, ChoosePasswordComponent, ForgotPasswordComponent, SignUpComponent, OAuthHandlerComponent],
})
export class LoginModule {

}
