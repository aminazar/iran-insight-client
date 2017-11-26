import { NgModule } from '@angular/core';
import {loginRouting} from './profile.routing';
import {ProfileComponent} from './profile.component';
@NgModule({
    declarations: [ProfileComponent],
  imports: [
    loginRouting,
  ],
  exports: []
})
export class ProfileModule {}
