import {NgModule} from '@angular/core';
import { HomeComponent } from './home/home.component';
import {adminRouting} from './admin.routing';

@NgModule({
  declarations: [HomeComponent],

  imports: [
    adminRouting
  ],

  exports: []
})
export class AdminModule {
}
