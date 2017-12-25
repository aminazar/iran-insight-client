import {NgModule} from '@angular/core';
import {MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {loginRouting} from './login.routing';
import {LoginComponent} from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    loginRouting,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: []
})
export class LoginModule {
}
