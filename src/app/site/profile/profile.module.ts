import { NgModule } from '@angular/core';
import {loginRouting} from './profile.routing';
import {ProfileComponent} from './profile.component';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    loginRouting,
  ],
  exports: []
})
export class ProfileModule {}
