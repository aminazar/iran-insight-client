import {NgModule} from '@angular/core';
import {siteRouting} from './site.routing';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [HomeComponent],

  imports: [
    siteRouting
  ],

  exports: []
})
export class SiteModule {
}
