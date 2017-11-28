import {NgModule} from '@angular/core';
import {MatCardModule, MatButtonModule, MatInputModule, MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

import {loginRouting} from './login.routing';
import {LoginComponent} from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    loginRouting,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: []
})
export class LoginModule {
}
