import {NgModule} from '@angular/core';
import { AdminHomeComponent } from './home/home.component';
import {adminRouting} from './admin.routing';
import {AuthGuard} from "./auth.guard";

@NgModule({
  declarations: [AdminHomeComponent],

  imports: [
    adminRouting,
  ],
  providers: [AuthGuard],
  exports: []
})
export class AdminModule {
}
