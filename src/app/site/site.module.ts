import {NgModule} from '@angular/core';
import {siteRouting} from './site.routing';
import { HomeComponent } from './home/home.component';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    siteRouting,
    MatInputModule
  ],
  exports: []
})
export class SiteModule {
}
