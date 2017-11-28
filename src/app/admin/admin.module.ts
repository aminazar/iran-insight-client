import {NgModule} from '@angular/core';
import { AdminHomeComponent } from './home/home.component';
import {adminRouting} from './admin.routing';

@NgModule({
  declarations: [AdminHomeComponent],

  imports: [
    adminRouting
  ],

  exports: []
})
export class AdminModule {
}
