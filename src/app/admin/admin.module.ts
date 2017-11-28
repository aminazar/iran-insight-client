import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {adminRouting} from './admin.routing';
import {AuthGuard} from "./auth.guard";
import {LoginModule} from "./login/login.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    adminRouting,
    LoginModule,
  ],
  providers: [AuthGuard],
  exports: []
})
export class AdminModule {
}
