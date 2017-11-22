import { NgModule } from '@angular/core';
import {loginRouting} from './login.routing';
import { LoginComponent } from './login.component';
@NgModule({
    declarations: [LoginComponent],
  imports: [
    loginRouting,
  ],
  exports: []
})
export class LoginModule {}
