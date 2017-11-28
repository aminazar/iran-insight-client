import {NgModule} from '@angular/core';
import { AdminHomeComponent } from './home/home.component';
import {adminRouting} from './admin.routing';
import {AuthGuard} from "./auth.guard";
import {LoginModule} from "./login/login.module";

@NgModule({
  declarations: [AdminHomeComponent],

  imports: [
    adminRouting,
    LoginModule,
  ],
  providers: [AuthGuard],
  exports: []
})
export class AdminModule {
}
