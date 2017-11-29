import {NgModule} from '@angular/core';
import { AdminHomeComponent } from './home/home.component';
import {adminRouting} from './admin.routing';
import {AuthGuard} from "./auth.guard";
import {MatTabsModule} from '@angular/material';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [AdminHomeComponent],

  imports: [
    adminRouting,
    CommonModule,
    MatTabsModule
  ],
  providers: [AuthGuard],
  exports: []
})
export class AdminModule {
}
